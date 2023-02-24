/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                vertical: "url('./bgVector828x1792.png')",
                horizontal: "url('./bgVector1920x1080.png')",
            }),
        },
        colors: {
            primary: "#E4C1F9",
            secondary: "#FCF6BD",
            background: "#D0F4DE",
            black: "#000000",
            pink: "#FF99C8",
        },
    },
    plugins: [],
}
