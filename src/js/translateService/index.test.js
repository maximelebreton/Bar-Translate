
import translateService from './index';

import {variables, mocks} from '../test.config';
const {sourceLanguage, targetLanguage, query, translatedQuery} = variables

const fetchMock = require('fetch-mock');


describe('Fetch Main Service', () => {

  it("Returns translation in normalized format", function () {
    expect.assertions(1)
    fetchMock.reset()
    fetchMock.mock('*', mocks[translateService.current.id] )

    return translateService.getTranslation(sourceLanguage, targetLanguage, query)
    .then(data => {
      expect(data).toEqual( {
        sourceLanguage: sourceLanguage,
        targetLanguage: targetLanguage,
        query: query,
        translations: [
          {
            translatedText: translatedQuery,
            detectedSourceLanguage: sourceLanguage
          }
        ]
      } )
    })
  })
})


const expectedTranslation = (sourceLanguage, translatedQuery) => {
  return [
      {
        translatedText: translatedQuery,
        detectedSourceLanguage: sourceLanguage
      }
    ]
}


describe('Check Services', () => {

  Object.keys(translateService.list).forEach(function (id) {
    let currentTranslateService = translateService.list[id]

    let url = currentTranslateService.getUrl(sourceLanguage, targetLanguage, query)
    it(url, () => {
      expect(url).toMatch(sourceLanguage)
      expect(url).toMatch(targetLanguage)
      expect(url).toMatch(query)
    })

    it("Returns translation in normalized format", function () {
      const data = currentTranslateService.getNormalizedData( mocks[id] )
      //expect(data).toEqual( expectedTranslation(sourceLanguage, translatedQuery) )
      expect(data[0]).toHaveProperty('translatedText', translatedQuery);
      if (currentTranslateService.id !== 'googleScript') {
        expect(data[0]).toHaveProperty('detectedSourceLanguage', sourceLanguage);
      }
    })


  })


})
/*

describe('Google Service', () => {

  let url = translateService.list.googleTranslate.getUrl(sourceLanguage, targetLanguage, query)
  it(url, () => {
    expect(url).toMatch(sourceLanguage)
    expect(url).toMatch(targetLanguage)
    expect(url).toMatch(query)
  })

  it("Returns translation in normalized format", function () {
    const data = translateService.list.googleTranslate.getNormalizedData( mocks.googleTranslate )
    expect(data).toEqual( expectedTranslation(sourceLanguage, translatedQuery) )
  })
})


describe('Yandex Service', () => {

  let url = translateService.list.yandex.getUrl(sourceLanguage, targetLanguage, query)
  it(url, () => {
    expect(url).toMatch(sourceLanguage)
    expect(url).toMatch(targetLanguage)
    expect(url).toMatch(query)
  })

  it("Returns translation in normalized format", function () {
    const data = translateService.list.yandex.getNormalizedData(mocks.yandex)
    expect(data).toEqual( expectedTranslation(sourceLanguage, translatedQuery) )
  })
})
*/

describe('Fetch service failure', () => {

  it("Should retry 2 times with each service, and then fail", () => {
    fetchMock.reset()
    fetchMock.mock('*', () => {
      throw new Error('ERROR!')
    })

    return translateService.fetchRetry(sourceLanguage, targetLanguage, query)
    .then(response => {
      return response.json()
    })
    .then(data => {
      expect(fetchMock.called()).toBe(true)
    })
    .catch(e => {
      expect(e.type).toMatch('error')
    })
  })
})

