import googleTranslateService from './googletranslateService'
import yandexService from './yandexService'
import googleScriptService from './googleScriptService'


var myBody = new Blob();

addEventListener('fetch', function(event) {
  console.info(event, 'event')
  event.respondWith(new Response(myBody, {
    headers: { "Content-Type" : "text/plain" }
  })
)});

let translateService = {

  list: {
      'googleTranslate': googleTranslateService(),
      'yandex': yandexService(),
      'googleScript': googleScriptService()
  },

  order: [
    'googleTranslate',
    'googleScript',
    'yandex'
  ],

  orderIndex: 0,

  get current() {
    let currentId = this.order[this.orderIndex]
    return this.list[currentId]
  }

}


translateService.fetchRetry = (sourceLanguage, targetLanguage, query, retries = 2) => {

  if (retries === 0 && translateService.orderIndex < translateService.order.length - 1 ) {
    console.info(`Unable to communicate ${translateService.current.id} api`)
    ++translateService.orderIndex
    console.info(`Switch to ${translateService.current.id} service`)
    retries = 2
  }

  return fetch(translateService.current.getUrl(sourceLanguage, targetLanguage, query), {
    method: 'get'
  }).catch(function(error) {
    console.info('Retries left:' + (retries))
    if (retries === 0) throw {
      error: error,
      type: 'error',
      message: `Unable to communicate ${translateService.current.id} api`
    }
    return translateService.fetchRetry(sourceLanguage, targetLanguage, query, retries - 1)
  })
}


translateService.getTranslation = (sourceLanguage, targetLanguage, query) => {

  return translateService.fetchRetry(sourceLanguage, targetLanguage, query)
  .then(response => response.json())
  .then(data => {
    const translations = translateService.current.getNormalizedData(data)

    return {
      sourceLanguage: sourceLanguage,
      targetLanguage: targetLanguage,
      query: query,
      translations: translations
    }
  })
}


export default translateService
