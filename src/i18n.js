import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import tr from "./locales/tr.json";

function getInitialLng() {
  if (typeof window === "undefined") return "tr";
  try {
    const saved = window.localStorage.getItem("eldes-lang");
    if (saved === "en" || saved === "tr") return saved;
  } catch {
    /* ignore */
  }
  return "tr";
}

i18n.use(initReactI18next).init({
  resources: {
    tr: { translation: tr },
    en: { translation: en },
  },
  lng: getInitialLng(),
  fallbackLng: "tr",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lang) => {
  try {
    window.localStorage.setItem("eldes-lang", lang);
  } catch {
    /* ignore */
  }
});

export default i18n;
