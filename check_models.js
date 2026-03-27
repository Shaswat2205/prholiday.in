const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, 'server/.env') });

async function listModels() {
    if (!process.env.GEMINI_API_KEY) {
        console.error('Missing GEMINI_API_KEY');
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // The SDK doesn't have a direct listModels, but we can try to hit a known one
        console.log('Testing gemini-1.5-flash...');
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent('Hi');
        console.log('Success with gemini-1.5-flash:', result.response.text());
    } catch (err) {
        console.error('Error with gemini-1.5-flash:', err.message);
        
        try {
            console.log('Trying gemini-pro...');
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
            const result = await model.generateContent('Hi');
            console.log('Success with gemini-pro:', result.response.text());
        } catch (err2) {
            console.error('Error with gemini-pro:', err2.message);
        }
    }
}

listModels();
