import 'server-only'
 
const dictionaries: any = {
  fr: () => import('./local/fr/common.json').then((module) => module.default),
  en: () => import('./local/en/common.json').then((module) => module.default),
}

export const getDictionary = async (locale: any) => {
  return dictionaries[locale.lang]() as any
}