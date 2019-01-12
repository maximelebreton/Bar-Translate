import langSupport from '../json/langSupport.json'
import langNames from '../json/langNames.json'
import langAliases from '../json/langAliases.json'
import langUtils from '../js/utils/lang'
import helloInAllLanguages from '../json/helloInAllLanguages.json'

describe('Test supported lanuages translations', () => {

  it("Returns language traduction for each supported language", function () {

    langSupport.forEach((lang) => {
      expect(langNames[lang]).toHaveProperty('name')
    })

  })

})
