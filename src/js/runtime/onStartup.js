import notifications from '../notifications'
import storage from '../storage'

/**
 * Fired when a profile that has this extension installed first starts up. This event is not fired when an incognito profile is started, even if this extension is operating in 'split' incognito mode.
 * --> Not fired on extension reload
 */

export default chrome.runtime.onStartup.addListener(function() {

  //chrome.storage.local.clear()

  // Display help only one time per session
  chrome.storage.local.remove(`${notifications.help.id}.${storage.states.alreadyNotified}`, function(result) {
    console.info(`${notifications.help.id}.${storage.states.alreadyNotified} removed`)
  })
  chrome.storage.local.remove(`${notifications.tryLoveBuy.id}.${storage.states.alreadyNotified}`, function(result) {
    console.info(`${notifications.tryLoveBuy.id}.${storage.states.alreadyNotified} removed`)
  })
})
