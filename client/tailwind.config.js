/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    start: '#006466', // Deep Jungle
                    mid: '#065A60',   // Tropical Teal
                    end: '#0B525B',   // Deep Sea
                },
                secondary: {
                    gold: '#FFD166',  // Sun Gold (Logo match)
                    cyan: '#4CC9F0',  // Vibrant Cyan (Logo match)
                    accent: '#F72585' // Hibiscus Pink (Pop color)
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
