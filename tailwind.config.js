/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                vertical: "url('./bgVector828x1792.png')",
                horizontal: "url('./bgVector1920x1080.png')",
            }),
            dropShadow: {
                button: "0 5px 20px rgba(21, 191, 230, 0.3)",
                lg: "0 0px 20px rgba(21, 191, 230, 0.6)",
                xl: "0 0px 35px rgba(255, 255, 255, 0.5)",
            },
            transitionProperty: {
                width: "width",
            },
        },
        colors: {
            primary: "#15bfe6",
            primaryLowOpacity: "rgba(21, 191, 230, 0.3)",
            background: "#020829",
            backgroundLowOpacity: "rgba(2, 8, 41, 0.9)",
            black: "#000000",
            white: "rgba(255, 255, 255, 0.9)",
            gray: "#384866",
            transparent: "transparent",
        },
    },
    plugins: [],
}
