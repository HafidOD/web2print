// import "server-only";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((r) => r.default),
  es: () => import("@/dictionaries/es.json").then((r) => r.default),
};

export const getDictionary = async (lang) => {
  return dictionaries[lang]();
};
// export const getDictionary = async (locale) => dictionaries[locale]();
