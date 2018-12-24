import translateService from './translateService'


const actions = {

  openTranslationInSite: (sourceLanguage, targetLanguage, query) => {
    let url = translateService.current.getSiteUrl(sourceLanguage, targetLanguage, query)
    chrome.tabs.create({
      url: url
    })
  },

  openHelpPage: () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL("help.html")
    })
  },

  openChromeWebstorePage: () => {
    chrome.tabs.create({
      url: `https://chrome.google.com/webstore/detail/bar-translate/inigdjcpofmlcigjhhiigigihmookhcp`
    });
  }

}

export default actions
