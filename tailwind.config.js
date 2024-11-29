import colors from 'tailwindcss/colors';

export const gray = colors.zinc;
export const primary = colors.emerald;
export const secundary = colors.lime;

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./.storybook/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                'dark-gradient': `url('./bg.png'), linear-gradient(to bottom, ${gray[800]}, ${gray[950]})`,
                'primary-gradient': `linear-gradient(to bottom, ${primary[500]}, ${primary[400]})`,
                'secundary-gradient': `linear-gradient(to bottom, ${secundary[500]}, ${secundary[400]})`,
            },
        },
    },
    plugins: [],
};
