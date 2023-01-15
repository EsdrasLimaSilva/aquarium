/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                blue: "#151623",
                hoverBlue: "#101038",
                darkBlue: "#05060F",
                white: "#F0F0F0",
                translucens: "#00000060",
                transBlue: "#05060F99",
            },
            borderRadius: {
                super: "100px",
            },
            screens: {
                xs: "480px",
            },
        },
    },
    plugins: [],
};
