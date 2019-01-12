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

  retries: 3,

  isRetrying: false,

  orderIndex: 0,

  get current() {
    let currentId = this.order[this.orderIndex]
    return this.list[currentId]
  }

}

function fetchTimeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}

translateService.fetchRetry = (sourceLanguage, targetLanguage, query, retries = translateService.retries) => {

  translateService.retries = retries

  if (translateService.retries === 0 && translateService.orderIndex < translateService.order.length - 1 ) {
    console.info(`Unable to communicate ${translateService.current.id} api`)
    ++translateService.orderIndex
    console.info(`Switch to ${translateService.current.id} service`)
    translateService.retries = 3
  }

  // first try expires in 3s, but to not block low connections, other retries times out are set on 60s
  //let timeOut = translateService.retries === 3 ? 3000 : 60000
  // fetchTimeout(timeOut, ())

  return fetch(translateService.current.getUrl(sourceLanguage, targetLanguage, query), {
    method: 'get'
  }).then((response) => {
    translateService.isRetrying = false
    if (!response.ok) {
      console.info(response)
      throw Error(response.statusText);
    }
    return response;
  }).catch((error) => {
    translateService.isRetrying = false
    if (navigator.onLine) {

      if (translateService.retries === 0) throw {
        error: error,
        type: 'error',
        message: `<match>⚠ Houston, we have a problem:</match> <dim>${error.message}</dim>`
      }
      let leftRetries = translateService.retries - 1
      console.info('Retries left:' + (leftRetries))
      translateService.isRetrying = true
      return translateService.fetchRetry(sourceLanguage, targetLanguage, query, leftRetries)
    } else {

      throw {
        error: error,
        type: 'offline',
        message: `<match>⚠ You're offline!</match>`
      }
    }

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
