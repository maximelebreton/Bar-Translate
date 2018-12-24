import contextMenus from './index'
import actions from '../actions'
import licensing from '../licensing'
import langUtils from '../utils/lang'

export default chrome.contextMenus.onClicked.addListener(function (info, tab) {


  if (info.menuItemId === contextMenus.translate) {
    let targetLanguage = langUtils.getChromeLanguage()
    actions.openTranslationInSite(null, targetLanguage, info.selectionText)
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
