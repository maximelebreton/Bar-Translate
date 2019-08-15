import notifications from "../notifications";
import storage from "../storage";
import licensing from "../licensing";

/* User has started a keyword input session by typing the extension's keyword. This is guaranteed to be sent exactly once per input session, and before any onInputChanged events.
 */
export default chrome.omnibox.onInputStarted.addListener(function() {
  storage.setSnapshot();

  /*storage.local.getValue(`${notifications.help.id}.${storage.states.hide}`)
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
  */

  licensing.getStorageLicense().then(license => {
    console.info(license, "license");
    console.info(licensing.getLicenseMessage(license));
    if (!license || (license && license.accessLevel === "FREE_TRIAL")) {
      //notifications.show('tryLoveBuy')
      storage.local
        .getValue(
          `${notifications.tryLoveBuy.id}.${storage.states.alreadyNotified}`
        )
        .then(alreadyNotified => {
          if (!alreadyNotified) {
            notifications.show("tryLoveBuy");
            storage.local.set(
              `${notifications.tryLoveBuy.id}.${
                storage.states.alreadyNotified
              }`,
              true
            );
          }
        });

      /*storage.local.getValue(`${notifications.tryLoveBuy.id}.alreadyNotified`)
          .then((alreadyNotified) => {

            //if (!alreadyNotified) {
              notifications.show('tryLoveBuy')

              //storage.local.set(`${notifications.tryLoveBuy.id}.alreadyNotified`, true)
            //}
          })*/
    }
  });
});
