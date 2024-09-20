import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import en from './locales/en/translation.json';
import nl from './locales/nl/translation.json';

i18n
  .use(initReactI18next) // Initialize react-i18next
  .init({
    resources: {
      en: { translation: en },
      nl: { translation: nl },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
