import notifications from './notifications'
import storage from './storage'



// Display help only one time per session
chrome.storage.local.remove(`${notifications.help.id}.${storage.states.alreadyNotified}`, function(result) {
  console.info(`${notifications.help.id}.${storage.states.alreadyNotified} removed`)
})
