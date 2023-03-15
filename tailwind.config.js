/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                vertical: "url('./images/bgVector828x1792.png')",
                horizontal: "url('./images/bgVector1920x1080.png')",
            }),
            dropShadow: {
                button: "0 5px 20px rgba(21, 191, 230, 0.3)",
                lg: "0 0px 20px rgba(21, 191, 230, 0.6)",
                xl: "0 0px 35px rgba(255, 255, 255, 0.5)",
            },
        },
        colors: {
            primary: "#15bfe6",
            background: "#020829",
            black: "#000000",
            white: "rgba(255, 255, 255, 0.9)",
            gray: "#384866",
        },
    },
    plugins: [],
}
