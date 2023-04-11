/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                vertical: "url('./images/bgVector828x1792.png')",
                horizontal: "url('./images/bgVector1920x1080.png')",
                contactVertical: "url('./images/bgContactVector828x1792.png')",
                contactHorizontal: "url('./images/bgContactVector1920x1080.png')",
                aboutVertical: "url('./images/bgAboutVector828x1792.png')",
                aboutHorizontal: "url('./images/bgAboutVector1920x1080.png')",
                privacyVertical: "url('./images/bgPrivacyVector828x1792.png')",
                privacyHorizontal: "url('./images/bgPrivacyVector1920x1080.png')",
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
            background: "#020829",
            black: "#000000",
            white: "rgba(255, 255, 255, 0.9)",
            gray: "#384866",
        },
        fontFamily: {
            noto: ["Noto Color Emoji", "sans-serif"],
        },
    },
    plugins: [],
}
