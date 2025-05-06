import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome to our app!",
          changeLanguage: "Change Language",
        },
      },
      es: {
        translation: {
          welcome: "¡Bienvenido a nuestra aplicación!",
          changeLanguage: "Cambiar idioma",
        },
      },
    },
    fallbackLng: "en", // Default language if the user's language isn't supported
    debug: true,
    interpolation: {
      escapeValue: false, // React handles XSS by default
    },
  });

export default i18n;