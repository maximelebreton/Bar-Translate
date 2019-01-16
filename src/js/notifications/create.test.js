import chromeLanguages from '../../json/chromeLangs.json'
import langUtils from '../utils/lang.js'



describe('Supported languages translations', () => {

  it("Returns hello traduction for each supported language", function () {
    let missingLanguages = []
    chromeLanguages.forEach((lang) => {

        let hello = langUtils.getHelloFromLangOrAlias(lang)
        expect(hello).toBeDefined()
        if (hello) {

        } else {
          missingLanguages.push(lang)

        }

    })
    console.warn(`missing hello for ${missingLanguages}`)

  })

})
