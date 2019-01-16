//import notifications from './notifications'
import storage from './storage'

//var CWS_API_URL = 'https://www.googleapis.com/chromewebstore/v1.1/';


const licensing = {

  /*getAuthToken: () => {
    return new Promise((resolve, reject) => {

      chrome.identity.getAuthToken({interactive: false}, function (token) {
        if (!token) {

          chrome.identity.getAuthToken({interactive: true}, function (token) {
              resolve(token)
          })

        } else {
          resolve(token)
        }
      })

    })
  },


  fetchLicense: (token) => fetch(`${CWS_API_URL}userlicenses/${chrome.runtime.id}`, {
    method: 'get',
    headers: new Headers({
      'Authorization': 'Bearer ' + token
    })
  }),


  getLicense: (token) => {

    return licensing.fetchLicense(token)
    .then(function(result) {
      return result.json()
    })
    .then(data => {
      return data
    })

  },*/


  getLicenseMessage: (license) => {
    let licenseSuccessMessage = `Your Bar Translate license is registered!`
    let licenseRejectMessage = `Sorry, but there is no Bar Translate license associated with this account`
    if (!license || (license && license.accessLevel === 'FREE_TRIAL')) {
      return licenseRejectMessage
    } else {
      return licenseSuccessMessage
    }
  },


  getStorageLicense: () => {
      return storage.sync.getValue('barTranslate.license')
  },

  storeLicense: (licenseData) => {
   return storage.sync.set('barTranslate.license', licenseData)
  }

/*
  registerLicense: () => {
    return licensing.getAuthToken()
      .then(token => {
        return licensing.getLicense(token)
      })
      .then(license => {
        if (license.result === true) {

          chrome.storage.sync.set({'barTranslate.license': license}, function() {
            console.info('License synchronized with this access level: ' + license.accessLevel)
            console.info(licensing.getLicenseMessage(license))
          })

          notifications.show('license', license)
        }

        console.info(license)
        return license
      })
  }*/
}


export default licensing


/* var req = new XMLHttpRequest();
req.open('GET', CWS_LICENSE_API_URL + chrome.runtime.id);
req.setRequestHeader('Authorization', 'Bearer ' + token);
req.onreadystatechange = function() {
  if (req.readyState == 4) {
    var license = JSON.parse(req.responseText);
    verifyAndSaveLicense(license);
  }
}
req.send(); */


