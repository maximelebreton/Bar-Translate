import translateService from './translateService'


const actions = {

  openTranslationInSite: (sourceLanguage, targetLanguage, query) => {
    let url = translateService.current.getSiteUrl(sourceLanguage, targetLanguage, query)
    chrome.tabs.create({
      url: url
    })
  },

  openRegisterPage: () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL("register.html")
    })
  },

  openHelpPage: () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL("help.html")
    })
  },

  openBuyPage: () => {
    chrome.tabs.create({
      url: 'https://license.maximelebreton.com/bar-translate/buy'
    })
  },

  openChromeWebstorePage: () => {
    chrome.tabs.create({
      url: `https://chrome.google.com/webstore/detail/bar-translate/inigdjcpofmlcigjhhiigigihmookhcp`
    });
  }

}

export default actions
