import sharedTranslateService from './shared'

const googleScriptService = () => {
  let state = {
    id: 'googleScript',
    name: 'Google Translate',
    smallcase: 'ɢᴏᴏɢʟᴇ',

    getUrl: (sourceLanguage, targetLanguage, query) => {
      const path = 'https://script.google.com/macros/s/AKfycbyCMrxkscWQ_fqmz_G0jBp44qzSitIu37RcsUVznA4M-zSP2tI/exec'
      const params = {
        'sl': sourceLanguage ? sourceLanguage : '',
        'tl': targetLanguage,
        'q': encodeURI(query)
      }
      return googleScriptService().getUrlWithParams(path, params)
    },

    getSiteUrl: (sourceLanguage, targetLanguage, query) => {
      console.log(sourceLanguage)
      return `https://translate.google.com/#view=home&op=translate&sl=${sourceLanguage ? sourceLanguage : 'auto'}&tl=${targetLanguage}&text=${encodeURI(query)}`
    },

    getNormalizedData: (data) => {
      const translations = data
      const normalizedData = translations.map(translation => {
        return {
          translatedText: translation.translatedText
        }
      })
      return normalizedData
    }
  }


  return Object.assign(
    state,
    sharedTranslateService(state)
  )
}

export default googleScriptService
