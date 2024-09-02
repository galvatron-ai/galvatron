import baseConfig from "@galvatron/ui/tailwind.config";

/** @type {import('tailwindcss').Config} */
const config = {
  presets: [baseConfig],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Add any dashboard-specific theme customizations here
  },
  plugins: [
    // Add any dashboard-specific plugins here
  ],
};

export default config;
