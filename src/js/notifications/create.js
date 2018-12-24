import notifications from './index'
import licensing from '../licensing'
import messages from '../messages'

const create = {

  help: () => {
    return chrome.notifications.create(notifications.help.id, {
      type: 'basic',
      iconUrl: 'images/icon@2x.png',
      title: messages.notifications.help.title,
      message: ``,
      contextMessage: messages.extensionName,
      silent: true,
      requireInteraction: false,
      buttons: [{
        title: messages.notifications.help.buttons.alwaysHide.title
      }, {
        title: messages.notifications.help.buttons.goHelp.title
      }]
    })
  },

  tryLoveBuy: () => {
    return chrome.notifications.create(notifications.tryLoveBuy.id, {
      type: 'basic',
      iconUrl: 'images/square.png',
      title: messages.notifications.tryLoveBuy.title,
      message: messages.notifications.tryLoveBuy.message,
      contextMessage: messages.extensionName,
      silent: true,
      requireInteraction: false,
      buttons: [{
        title: messages.notifications.tryLoveBuy.buttons.buy.title
      }, {
        title: messages.notifications.tryLoveBuy.buttons.sync.title
      }]
    })
  },

  license: (license) => {

    let licenseCreatedDate = new Date(license.createdTime).toLocaleDateString("en", {year: "numeric", month: "long", day: "numeric"})
    let hasLicense = license.accessLevel === 'FULL' ? true : false

    let titleMessage = hasLicense ? messages.notifications.license.title.success : messages.notifications.license.title.fail

    chrome.notifications.clear(notifications.tryLoveBuy.id)

    return chrome.notifications.create(notifications.license.id, {
      type: 'basic',
      iconUrl: 'images/icon@2x.png',
      title: titleMessage,
      message: licensing.getLicenseMessage(license),
      contextMessage: messages.extensionName,
      silent: true,
      requireInteraction: false,
      buttons: hasLicense ? [] : [{
        title: messages.notifications.license.buttons.buy.title
      }]
    })
  }

}


export default create
