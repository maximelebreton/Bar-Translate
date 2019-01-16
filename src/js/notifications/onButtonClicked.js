import notifications from './index'
import actions from '../actions'
//import licensing from '../licensing'
import storage from '../storage'
import textUtils from '../utils/text'


export default chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    if (notificationId === notifications.tryLoveBuy.id) {

      if (buttonIndex === 0) {
        chrome.notifications.clear(notifications.tryLoveBuy.id)
        actions.openBuyPage()
      }
      if (buttonIndex === 1) {
        //licensing.registerLicense()
        actions.openRegisterPage()
        chrome.notifications.clear(notifications.tryLoveBuy.id)
      }

    }
    if (notificationId === notifications.help.id) {
      if (buttonIndex === 0) {
        chrome.notifications.clear(notifications.help.id)

        storage.local.set(`${notifications.help.id}.${storage.states.hide}`, true)
          .then(() => {
            console.info('saved')
          })
      }
      if (buttonIndex === 1) {
        actions.openHelpPage()
      }
    }
    if (notificationId === notifications.translation.id) {

      /*if (buttonIndex === 0) {
        //clearInterval(notifications.translation.interval)
        chrome.notifications.clear(notifications.translation.id)
      }*/
      if (buttonIndex === 0) {
        textUtils.copyToClipboard(notifications.translation.params.translatedText)
        //chrome.notifications.clear(notifications.translation.id)
      }
      if (buttonIndex === 1) {
        let {sourceLanguage, targetLanguage, query} = notifications.translation.params
        actions.openTranslationInSite(sourceLanguage, targetLanguage, query)
        chrome.notifications.clear(notifications.translation.id)
      }

    }
})
