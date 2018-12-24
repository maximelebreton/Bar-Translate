/**
 * Fired when a profile that has this extension installed first starts up. This event is not fired when an incognito profile is started, even if this extension is operating in 'split' incognito mode.
 * --> Not fired on extension reload
 */

export default chrome.runtime.onStartup.addListener(function() {

  //chrome.storage.local.clear()
})
