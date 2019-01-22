import textUtils from '../utils/text'
import langUtils from '../utils/lang'
import actions from '../actions'


export default chrome.omnibox.onInputEntered.addListener((content) => {
  let {sourceLanguage, targetLanguage, query} = langUtils.extractLanguageFromQuery(content)

  /*if (
    content === `${targetLanguage} `
    || content === `${sourceLanguage}>${textUtils.zeroWidthSpace}`
    || content === `${sourceLanguage}>${targetLanguage} `
    ) {
  }*/

  actions.openTranslationInSite(sourceLanguage, targetLanguage, query)

})
