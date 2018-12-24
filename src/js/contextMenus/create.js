
import langNames from '../../json/langNames.json'
import translateService from '../translateService'
import messages from '../messages'
import langUtils from '../utils/lang.js';

const prefix = 'barTranslate.contextMenu.'

const create = {

  translate: () => {
    return chrome.contextMenus.create({
      id: prefix + "translate",
      title: chrome.i18n.getMessage('translateSelection', [langNames[langUtils.getChromeLanguage()].name, translateService.current.name]),
      //title: `Translate \"%s\" in ${langNames[langUtils.getChromeLanguage()].name} on ${translateService.current.name}`,
      contexts: ["selection"]
    })
  },

  help: () => {
    return chrome.contextMenus.create({
      "id": prefix + "help",
      "title": messages.contextMenus.help.title,
      "type": "normal",
      "contexts": ["page_action"]
    })
  },

  buyLicense: () => {
    return chrome.contextMenus.create({
      "id": prefix + "buyLicense",
      "title": messages.contextMenus.buy.title,
      "type": "normal",
      "contexts": ["page_action"]
    })
  },

  registerLicense: () => {
    return chrome.contextMenus.create({
      "id": prefix + "registerLicense",
      "title": messages.contextMenus.license.title,
      "type": "normal",
      "contexts": ["page_action"]
    })
  }

}


export default create