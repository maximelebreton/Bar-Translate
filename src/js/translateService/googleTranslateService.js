import sharedTranslateService from './shared'

const googleTranslateService = () => {
  let state = {
    id: 'googleTranslate',
    name: 'Google Translate',
    smallcase: 'ɢᴏᴏɢʟᴇ',

    getUrl: (sourceLanguage, targetLanguage, query) => {
      const path = 'https://translate.googleapis.com/translate_a/single'
      const params = {
        'client': 'gtx',
        'dt': 't',
        'sl': sourceLanguage ? sourceLanguage : 'auto',
        'tl': targetLanguage,
        'q': encodeURI(query)
      }
      return googleTranslateService().getUrlWithParams(path, params)
    },

    getSiteUrl: (sourceLanguage, targetLanguage, query) => {
      console.log(sourceLanguage)
      return `https://translate.google.com/#view=home&op=translate&sl=${sourceLanguage ? sourceLanguage : 'auto'}&tl=${targetLanguage}&text=${encodeURI(query)}`
    },

    getNormalizedData: (data) => {
      const translations = data[0]
      const detectedSourceLanguage = data[2]

      // because google translate api split every sentence after a dot (.), so we need to re-concate them
      let concatedTranslatedText = ''
      translations.forEach(translation => {
        concatedTranslatedText += translation[0]
      })
      const normalizedData = [{
        translatedText: concatedTranslatedText,
        detectedSourceLanguage: detectedSourceLanguage
      }]
      /*const normalizedData = translations.map(translation => {
        return {
          translatedText: translation[0],
          detectedSourceLanguage: detectedSourceLanguage
        }
      })*/
      return normalizedData
    }
  }
  return Object.assign(
    state,
    sharedTranslateService(state)
  )
}

export default googleTranslateService
