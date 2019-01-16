//import storage from './js/storage'
import licensing from './js/licensing'


const validate = (licenseKey) => {

  validateButton.disabled = true
  validateButton.innerText = 'please wait...'

  return fetch('https://us-central1-license-8a4bd.cloudfunctions.net/validate?license_key='+licenseKey, {
    method: 'get'
  })
  .then(response => response.json())
  .then((data) => {
    console.log(data)
    resetValidateButton()
    let licenseData = Object.values(data)[0]

    if (licenseData && licenseData.info) {

      licensing.storeLicense(licenseData)
        .then(() => {
          console.info('License registered with this owner: ' + licenseData.info.email)
          setSuccessState(licenseData)
        })
        .catch((error) => {
          console.log(error)
        })

      /*chrome.storage.sync.set({'barTranslate.license': licenseData}, function() {

      })*/
    } else {
      setFailState(licenseKey)
    }
  })
  .catch((error) => {
    console.log(error)
    setFailState(licenseKey)
  })


}

const resetValidateButton = () => {
  validateButton.innerText = 'Register license'
  validateButton.disabled = false
}




// 🙌

const setSuccessState = (licenseData) => {
  title.textContent = `License registered with this owner: ${licenseData.info.email}`
  input.value = ""
  title.style.color = 'green'
}

const setFailState = (licenseKey) => {
  title.textContent = `"${licenseKey}" is an invalid license key`
  title.style.color = 'red'
  input.value = ""
  resetValidateButton()
}

const setDefaultState = () => {
  title.textContent = `Register your license`
  input.value = ""
  title.style.color = ''

}







let title = document.getElementById('title-message')
let input = document.getElementById('license-key')
let validateButton = document.getElementById('validate')

validateButton.addEventListener('click', function () {
  validate(input.value)

})


setDefaultState()

licensing.getStorageLicense().then((licenseData) => {
  console.log(licenseData)


    if (licenseData) {
      setSuccessState(licenseData)
    }
})
