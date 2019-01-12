import langSupport from '../../json/langSupport.json'
import langNames from '../../json/langNames.json'

describe('Test supported lanuages translations', () => {

  it("Returns language traduction for each supported language", function () {

    langSupport.forEach((lang) => {
      //console.info(lang)
      //console.info(langNames[lang])
      expect(langNames[lang]).toBeDefined()
    })

  })

})
