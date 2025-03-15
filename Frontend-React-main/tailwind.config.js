/** @type {import('tailwindcss').Config} */

import preline from "preline/plugin";
import daisyui from "daisyui";

export default {
    content: ["./node_modules/preline/preline.js", "./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            nunito: ["Nunito", "sans-serif"],
        },
        screens: {
            mobile: "320px",
            mobileNormal: "375px",
            mobilelg: "520px",
            tablet: "885px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            xxl: "1370px",
        },

        extend: {
            lineHeight: {
                "extra-loose": "2.5",
                12: "3rem",
            },
            colors: {
                primary: "#2E7D32",
                secondary: "#F9F9EB",
                third: "#E0E0E0",
            },
        },
    },
    daisyui: {
        themes: ["light"],
    },
    plugins: [
        // require('@tailwindcss/forms'),
        preline,
        daisyui,
    ],
    daisyui: {
        themes: ["light"], // Ubah menjadi 'light'
    },
};
