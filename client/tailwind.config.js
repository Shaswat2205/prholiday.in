/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#FF6B35',    // Vibrant Orange
                    secondary: '#0A1128',  // Deep Navy
                    accent: '#FFB627',     // Warm Yellow
                    white: '#FFFFFF',
                    light: '#F8F9FA',
                    gray: {
                        100: '#F1F3F5',
                        200: '#E9ECEF',
                        500: '#6C757D',
                        800: '#343A40',
                    }
                },
                // Keeping existing names for compatibility but updating values to match new theme
                primary: {
                    start: '#FF6B35',
                    mid: '#FF8A5B',
                    end: '#FFA581',
                },
                secondary: {
                    gold: '#FFB627',
                    cyan: '#4CC9F0',
                    accent: '#F72585'
                }
            },
            fontFamily: {
                sans: ['Poppins', 'Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
