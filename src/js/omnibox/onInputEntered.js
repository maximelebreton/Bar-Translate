import langUtils from '../utils/lang'
import actions from '../actions'


export default chrome.omnibox.onInputEntered.addListener((content) => {
  let {sourceLanguage, targetLanguage, query} = langUtils.extractLanguageFromQuery(content)

  actions.openTranslationInSite(sourceLanguage, targetLanguage, query)
})
