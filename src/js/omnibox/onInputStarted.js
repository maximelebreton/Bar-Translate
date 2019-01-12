import notifications from '../notifications'
import storage from '../storage'
import licensing from '../licensing'

export default chrome.omnibox.onInputStarted.addListener(function() {

  storage.local.getValue(`${notifications.help.id}.${storage.states.hide}`)
    .then((hide) => {
      console.info(hide, 'hide')
      // if not always hidden, check for already hidden
      if (!hide) {
        storage.local.getValue(`${notifications.help.id}.${storage.states.alreadyNotified}`)
        .then((alreadyNotified) => {

          if (!alreadyNotified) {
            notifications.show('help')
            storage.local.set(`${notifications.help.id}.${storage.states.alreadyNotified}`, true)
          }
        })
      }
    })



  licensing.getStorageLicense()
    .then(license => {
      console.info(license, 'license')
      console.info(licensing.getLicenseMessage(license))
      if (!license || (license && license.accessLevel !== 'FULL')) {

        //notifications.show('tryLoveBuy')
        storage.local.getValue(`${notifications.tryLoveBuy.id}.${storage.states.alreadyNotified}`)
        .then((alreadyNotified) => {

          if (!alreadyNotified) {
            notifications.show('tryLoveBuy')
            storage.local.set(`${notifications.tryLoveBuy.id}.${storage.states.alreadyNotified}`, true)
          }
        })

        /*storage.local.getValue(`${notifications.tryLoveBuy.id}.alreadyNotified`)
          .then((alreadyNotified) => {

            //if (!alreadyNotified) {
              notifications.show('tryLoveBuy')

              //storage.local.set(`${notifications.tryLoveBuy.id}.alreadyNotified`, true)
            //}
          })*/
      }
    })

})
