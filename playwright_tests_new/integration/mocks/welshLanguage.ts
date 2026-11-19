export const welshTranslationsSmall = {
  translations: {
    'Manage Cases': {
      translation: 'Rheoli achosion',
    },
    'Sign out': {
      translation: 'Allgofnodi',
    },
    'Case list': {
      translation: 'Rhestr achosion',
    },
    'Create case': {
      translation: 'Creu achos',
    },
    '© Crown copyright': {
      translation: '© Hawlfraint y Goron',
    },
  },
};

export const welshTranslationsForPhrases = (phrases: string[]) => ({
  translations: Object.fromEntries(
    Object.entries(welshTranslationsSmall.translations).filter(([phrase]) => phrases.includes(phrase))
  ),
});
