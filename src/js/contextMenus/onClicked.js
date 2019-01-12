import contextMenus from './index'
import actions from '../actions'
import licensing from '../licensing'
import langUtils from '../utils/lang'
import notifications from '../notifications'
import translateService from '../translateService'

export default chrome.contextMenus.onClicked.addListener(function (info, tab) {


  if (info.menuItemId === contextMenus.translateSelection) {
    let targetLanguage = langUtils.getBrowserLanguage()
    //actions.openTranslationInSite(null, targetLanguage, info.selectionText)
    translateService.getTranslation('', targetLanguage, info.selectionText)
    .then(data => {
      //clearInterval(spinner.current)
      let {sourceLanguage, targetLanguage, query, translations} = data
      let {resolvedSourceLanguage} = langUtils.getResolvedSourceLanguage(sourceLanguage, translations)
      let params = {
        translatedText: translations[0].translatedText,
        translateService: translateService.current,
        sourceLanguage: resolvedSourceLanguage,
        targetLanguage: targetLanguage,
        query: query
      }
      notifications.translation.params = params

      notifications.show('translation', params)
    })
  }
  if (info.menuItemId === contextMenus.help) {
    actions.openHelpPage()
  }
  if (info.menuItemId === contextMenus.buyLicense) {
    actions.openChromeWebstorePage()
  }
  if (info.menuItemId === contextMenus.registerLicense) {
    licensing.registerLicense()
  }

});
