

const variables = {


  sourceLanguage: 'fr',
  targetLanguage: 'en',
  query: 'bonjour',
  translatedQuery: 'hello'


}

let {sourceLanguage, targetLanguage, query, translatedQuery} = variables

const mocks = {
  googleTranslate: [[[translatedQuery, query, null, null, 1]], null, sourceLanguage],
  yandex: {
    "code": 200,
    "lang": `${sourceLanguage}-${targetLanguage}`,
    "text": [
    translatedQuery
    ]
  },
  googleScript: [{
    translatedText: translatedQuery
  }]
}

export {variables, mocks}
