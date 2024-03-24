/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				"rise-up": "rise-up 0.75s ease-in-out forwards",
			},
			keyframes: {
				"rise-up": {
					from: {
						transform: "translateY(500px)",
						opacity: 0,
					},
					to: {
						transform: "translateY(0)",
						opacity: 1,
					},
				},
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
