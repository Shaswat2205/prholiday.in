const axios = require('axios');

async function testLocalVideos() {
    try {
        const res = await axios.get('http://localhost:5000/api/local-videos');
        console.log('Local Videos Response:', JSON.stringify(res.data, null, 2));
        process.exit(0);
    } catch (err) {
        console.error('Error fetching local videos:', err.message);
        process.exit(1);
    }
}

testLocalVideos();
