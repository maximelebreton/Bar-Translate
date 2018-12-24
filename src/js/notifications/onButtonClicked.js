import notifications from './index'
import actions from '../actions'
import licensing from '../licensing'
import storage from '../storage'


export default chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    if (notificationId === notifications.tryLoveBuy.id) {

      if (buttonIndex === 0) {
        chrome.notifications.clear(notifications.tryLoveBuy.id)
        actions.openChromeWebstorePage()
      }
      if (buttonIndex === 1) {
        licensing.registerLicense()
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
})
