import notifications from './index'
import licensing from '../licensing'
import messages from '../messages'
import langUtils from '../utils/lang'
import langNames from '../../json/langNames.json'
import langNativeNames from '../../json/langNativeNames.json'
import helloInAllLanguages from '../../json/helloInAllLanguages.json'



const create = {

  /*help: () => {

    let browserLang = langUtils.getBrowserLanguage()
    let langHello = langUtils.getHelloFromLangOrAlias( browserLang )
    let englishHello = 'Hello'
    let hello = langHello

    if (browserLang === 'en' || langHello === undefined) {
      var zero = `'Bonjour' = Hello`
      var one = `'fr Hello' = Bonjour`
      var two = `'en Bonjour' = Hello`
    } else {
      var zero = `'${englishHello}' = ${langHello}`
      var one = `'en ${langHello}' = ${englishHello}`
      var two = `'${browserLang} ${englishHello}' = ${langHello}`
    }

    chrome.notifications.clear(notifications.help.id, () => {
      return chrome.notifications.create(notifications.help.id, {
        type: 'basic',
        iconUrl: 'images/icon@2x.png',
        //title: messages.notifications.help.title,
        title: 'Need help? Here some examples:',
        message: `• ${one} \n• ${two} \n• 'de>en gift' = poison \n• 'chi' suggests to translate in Chinese`,
        contextMessage: messages.extensionName,
        silent: true,
        requireInteraction: false,
        buttons: [{
          title: messages.notifications.help.buttons.alwaysHide.title
        }, {
          title: messages.notifications.help.buttons.goHelp.title
        }]
      })
    })
  },*/

  tryLoveBuy: () => {
    chrome.notifications.clear(notifications.tryLoveBuy.id, () => {
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
  },


  translation: (params) => {
    let notif = notifications.translation

    chrome.notifications.clear(notif.id, () => {

      //clearInterval(notif.interval)

      let {translatedText, translateService, sourceLanguage, targetLanguage, query} = params
      let message = `${translatedText}`

      /*notif.counter = 7

      let delay = 1000
      notif.interval = setInterval(() => {
        notif.counter--
        if (notif.counter >= 1) {
          chrome.notifications.update(notif.id, {
            buttons: [{
              title: chrome.i18n.getMessage('autoClose', [notif.counter])
            }, {
              title: chrome.i18n.getMessage('openInNewTab', [translateService.name])
            }]
          })
        }
        if (notif.counter <= 0) {
          //chrome.notifications.clear(notif.id, (wasCleared) => {
            console.info(`Is ${notif.id} notification with ${translatedText.trunc(25)} is cleared: ${wasCleared}`)
            clearInterval(notif.interval)
          //})
        }
      }, delay)*/

      return chrome.notifications.create(notif.id, {
        priority: 2,
        type: 'basic',
        iconUrl: 'images/icon@2x.png',
        title: '',
        message: message,
        //contextMessage: `Bar Translate \nᴛʀᴀɴsʟᴀᴛᴇᴅ ʙʏ ${translateService.smallcase}`,
        contextMessage: `Translated ${sourceLanguage ? `from ${langUtils.getLangOrAliasName(sourceLanguage)} (ᴅᴇᴛᴇᴄᴛᴇᴅ) into` : 'in'} ${langUtils.getLangOrAliasName(targetLanguage)} by ${translateService.smallcase}`,
        silent: true,
        requireInteraction: true,
        buttons: [{
          title: chrome.i18n.getMessage('copyToClipboard', [translateService.name])
        }, {
          title: chrome.i18n.getMessage('openInNewTab', [translateService.name])
        }]
      })

    })

  }

}


export default create
