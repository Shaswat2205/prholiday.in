async function test() {
    try {
        console.log("Logging in as admin...");
        const loginRes = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@prholidays.in', password: 'password123' })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log("Logged in. Uploading gallery...");
        
        const galleryRes = await fetch('http://localhost:5000/api/users/gallery', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ imageUrl: 'https://www.instagram.com/reel/DLmkRU2TVN5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' })
        });
        const galleryData = await galleryRes.json();
        console.log("Success!", galleryData);
    } catch (e) {
        console.error("FAILED:", e);
    }
}
test();
