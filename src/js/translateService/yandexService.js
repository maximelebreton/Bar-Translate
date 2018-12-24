import sharedTranslateService from './shared'

const yandexService = () => {
  let state = {
    id: 'yandex',
    name: 'Yandex',
    smallcase: 'ʏᴀɴᴅᴇx',

    getUrl: (sourceLanguage, targetLanguage, query) => {
      sourceLanguage = sourceLanguage.split('-')[0]
      targetLanguage = targetLanguage.split('-')[0]

      const path = 'https://translate.yandex.net/api/v1.5/tr.json/translate'
      const params = {
        'key': 'trnsl.1.1.20181209T155517Z.6a4e8ee4a104900a.b00a6b62af865aebb569102a3e8134bedfa40d97',
        'lang': `${sourceLanguage ? sourceLanguage + '-' : ''}${targetLanguage}`,
        'text': encodeURI(query)
      }
      return yandexService().getUrlWithParams(path, params)
    },

    getSiteUrl: (sourceLanguage, targetLanguage, query) => {
      sourceLanguage = sourceLanguage.split('-')[0]
      targetLanguage = targetLanguage.split('-')[0]
      return `https://translate.yandex.com/?lang=${sourceLanguage ? sourceLanguage + '-' : ''}${targetLanguage}&text=${encodeURI(query)}`
    },

    getNormalizedData: (data) => {
      const translations = data.text
      const detectedSourceLanguage = data.lang.split("-")[0]
      const normalizedData = translations.map(translation => {
        return {
          translatedText: translation,
          detectedSourceLanguage: detectedSourceLanguage
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

export default yandexService

