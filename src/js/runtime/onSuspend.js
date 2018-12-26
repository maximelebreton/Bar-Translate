export default chrome.runtime.onSuspend.addListener(() => {

  chrome.notifications.getAll((items) => {
    if ( items ) {
        for (let notificationId in items) {
            chrome.notifications.clear(notificationId);
        }
    }
  });

})
