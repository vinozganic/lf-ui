/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                vertical: "url('/images/bgHomeVector828x1792.png')",
                horizontal: "url('/images/bgHomeVector1920x1080.png')",
                contactVertical: "url('/images/bgContactVector828x1792.png')",
                contactHorizontal: "url('/images/bgContactVector1920x1080.png')",
                aboutVertical: "url('/images/bgAboutVector828x1792.png')",
                aboutHorizontal: "url('/images/bgAboutVector1920x1080.png')",
                privacyVertical: "url('/images/bgPrivacyVector828x1792.png')",
                privacyHorizontal: "url('/images/bgPrivacyVector1920x1080.png')",
                matchesVertical: "url('/images/bgMatchesVector828x1792.png')",
                matchesHorizontal: "url('/images/bgMatchesVector1920x1080.png')",
                formVertical: "url('/images/bgFormVector828x1792.png')",
                formHorizontal: "url('/images/bgFormVector1920x1080.png')",
            }),
            boxShadow: {
                lg: "0 0px 20px rgba(21, 191, 230, 0.6)",
                xl: "0 0px 35px rgba(255, 255, 255, 0.5)",
                button: "0 5px 20px rgba(21, 191, 230, 0.3)",
            },
            textShadow: {
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
            transparent: "transparent",
            green: "rgb(13, 199, 0)",
            yellow: "rgb(225, 240, 2)",
            red: "rgb(217, 64, 50)",
        },
        fontFamily: {
            noto: ["Noto Color Emoji", "sans-serif"],
        },
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities(
                {
                    ".bg-fixed:before": {
                        content: '""',
                        display: "block",
                        position: "fixed",
                        left: "0",
                        top: "0",
                        width: "100%",
                        height: "100%",
                        zIndex: "-10",
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                    },
                },
                ["responsive", "hover"]
            )
        },
    ],
}
