import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        SoSHColorDisabled: "#D8D8D8",
        SoSHColorPrimary: "#35383F",
        SoshColorBento: "#F3F9FF",
        SoshColorInfoColor: "#8EB3FB",
        SoshColorPopupBannerColor: "#ECF4FD",
        SoshColorGrey200: "#EEEEEE",
        SoshColorGrey300: "#D0D5DD",
        SoshColorGrey400: "#98A2B3",
        SoshColorGrey500: "#667085",
        SoshColorGrey600: "#475467",
        SoshColorGrey700: "#344054",
        SoshColorGreyScale: "#212121",
        SoshButtonDisable: "#FBFBFB",
        SoshStatusWordColor: "#212121",
        SoshOrange: "#FC8F7D",
        SoshBackground: "#f2efe8",
      },
      lineHeight: {
        Sosh22: "140%",
      },
      width: {
        "360": "22.5rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
