const Package = require('../models/Package');
const { PDFParse } = require('pdf-parse');
const mammoth = require('mammoth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
exports.getPackages = async (req, res) => {
    try {
        let query = { active: true };
        
        // Filter by destination if provided
        if (req.query.destination) {
            query.destination = req.query.destination;
        }

        const packages = await Package.find(query).populate('destination', 'name country');
        res.status(200).json({ success: true, count: packages.length, data: packages });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get single package
// @route   GET /api/packages/:id
// @access  Public
exports.getPackage = async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id);

        if (!pkg) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }

        res.status(200).json({ success: true, data: pkg });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create new package
// @route   POST /api/admin/packages
// @access  Private (Admin)
exports.createPackage = async (req, res) => {
    try {
        const pkg = await Package.create(req.body);
        res.status(201).json({ success: true, data: pkg });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update package
// @route   PUT /api/admin/packages/:id
// @access  Private (Admin)
exports.updatePackage = async (req, res) => {
    try {
        const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!pkg) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }

        res.status(200).json({ success: true, data: pkg });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete package
// @route   DELETE /api/admin/packages/:id
// @access  Private (Admin)
exports.deletePackage = async (req, res) => {
    try {
        const pkg = await Package.findByIdAndDelete(req.params.id);

        if (!pkg) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Extract package data from PDF/DOCX using AI
// @route   POST /api/packages/extract-from-document
// @access  Private (Admin)
exports.extractPackageData = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a document file.' });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ success: false, message: 'GEMINI_API_KEY is not configured on the server.' });
        }

        let extractedText = '';

        // Safely parse the buffer based on MimeType
        if (req.file.mimetype === 'application/pdf') {
            const parser = new PDFParse({ data: req.file.buffer });
            const pdfData = await parser.getText();
            extractedText = pdfData.text;
            await parser.destroy();
        } else if (
            req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            req.file.mimetype === 'application/msword'
        ) {
            const docData = await mammoth.extractRawText({ buffer: req.file.buffer });
            extractedText = docData.value;
        } else {
            return res.status(400).json({ success: false, message: 'Unsupported file type. Please upload a PDF or DOCX.' });
        }

        if (!extractedText || extractedText.trim().length === 0) {
            return res.status(400).json({ success: false, message: 'Could not extract text from document.' });
        }

        // Send to Gemini (Free)
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        
        // --- FAIL-SAFE KEY LOADER ---
        let apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.warn('GEMINI_API_KEY not in process.env, attempting manual load from .env file...');
            try {
                const fs = require('fs');
                const path = require('path');
                const dotenv = require('dotenv');
                // Try multiple paths
                const paths = [
                    path.join(__dirname, '../.env'),
                    path.join(process.cwd(), '.env'),
                    path.join(process.cwd(), 'server/.env')
                ];
                for (const p of paths) {
                    if (fs.existsSync(p)) {
                        const envConfig = dotenv.parse(fs.readFileSync(p));
                        if (envConfig.GEMINI_API_KEY) {
                            apiKey = envConfig.GEMINI_API_KEY;
                            console.log(`Success: Found GEMINI_API_KEY in ${p}`);
                            break;
                        }
                    }
                }
            } catch (err) {
                console.error('Fail-safe loader error:', err.message);
            }
        }

        if (!apiKey) {
            return res.status(500).json({ success: false, message: 'GEMINI_API_KEY is not configured on the server (Environment or .env).' });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        
        const prompt = `
You are an expert travel package structured data parser. Below is the raw text extracted from a travel package brochure or itinerary document.
Extract the details into a strict JSON payload that exactly matches the following schema structure. If any field is totally missing, guess a reasonable default or leave it empty, but DO NOT drop keys.
Important rules:
- maxPax: should be an integer (guess 2 or 4 if not specified).
- duration.days and duration.nights: must be integers.
- price: must be an integer number (strip currency symbols).
- category: must be purely one of ['Spiritual', 'Adventure', 'Nature', 'Heritage', 'Beach', 'Solo Trip', 'Family', 'Luxury', 'Honeymoon', 'Wildlife', 'Cultural'].
- itinerary, inclusions, exclusions: must be arrays of STRINGS. (For itinerary, write "Day 1: ...", "Day 2:..." directly as strings).

JSON Schema:
{
    "name": "String",
    "description": "String",
    "maxPax": Number,
    "price": Number,
    "duration": { "days": Number, "nights": Number },
    "category": "String",
    "itinerary": ["String", "String"],
    "inclusions": ["String", "String"],
    "exclusions": ["String", "String"]
}

Return ONLY raw generic valid JSON.

Document Text:
${extractedText}
`;

        const modelsToTry = ['gemini-1.5-flash', 'gemini-pro', 'gemini-1.5-pro', 'gemini-1.0-pro'];
        let result;
        let lastError;

        for (const modelId of modelsToTry) {
            try {
                console.log(`Trying Gemini model: ${modelId}`);
                const model = genAI.getGenerativeModel({ model: modelId });
                result = await model.generateContent(prompt);
                if (result) break;
            } catch (e) {
                lastError = e;
                console.warn(`Model ${modelId} failed: ${e.message}`);
                continue;
            }
        }

        if (!result) {
            throw new Error('All Gemini models failed. Last error: ' + lastError.message);
        }

        let rawResponse = result.response.text().trim();
        
        if (rawResponse.startsWith('\`\`\`json')) {
            rawResponse = rawResponse.replace(/^\`\`\`json/i, '').replace(/\`\`\`$/i, '').trim();
        }

        const parsedJson = JSON.parse(rawResponse);
        res.status(200).json({ success: true, data: parsedJson });
        
    } catch (err) {
        console.error('Extraction Error:', err);
        res.status(500).json({ success: false, message: 'Failed to process document with AI: ' + err.message });
    }
};
