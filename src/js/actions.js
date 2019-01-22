import translateService from './translateService'

export const openRegisterPage = () => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("register.html")
  })
}

export const openHelpPage = () => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("help.html")
  })
}

export const openBuyPage = () => {
  chrome.tabs.create({
    url: 'https://license.maximelebreton.com/bar-translate/buy'
  })
}

const actions = {

  openTranslationInSite: (sourceLanguage, targetLanguage, query) => {
    let url = translateService.current.getSiteUrl(sourceLanguage, targetLanguage, query)
    chrome.tabs.create({
      url: url
    })
  },

  openRegisterPage: openRegisterPage,

  openHelpPage: openHelpPage,

  openBuyPage: openBuyPage,

  openChromeWebstorePage: () => {
    chrome.tabs.create({
      url: `https://chrome.google.com/webstore/detail/bar-translate/inigdjcpofmlcigjhhiigigihmookhcp`
    });
  }

}



export default actions
