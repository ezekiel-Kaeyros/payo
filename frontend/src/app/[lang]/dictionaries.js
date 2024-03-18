import 'server-only'
 
const dictionaries = {
  fr: () => import('./local/fr/common.json').then((module) => module.default),
  en: () => import('./local/en/common.json').then((module) => module.default),
}

export const getDictionary = async (locale) => {
  return dictionaries[locale.lang]()
}