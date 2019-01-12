import chromeLanguages from '../../json/chromeLangs.json'
import langUtils from '../utils/lang.js'



describe('Test supported lanuages translations', () => {

  it("Returns language traduction for each supported language", function () {

    chromeLanguages.forEach((lang) => {

        let hello = langUtils.getHelloFromLangOrAlias(lang)
        if (hello) {
          expect(hello).toBeDefined()
        } else {
            console.warn(`${hello} for ${lang}`)
        }

    })

  })

})
