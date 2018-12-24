
let getMessage = (name) => {
  return chrome.i18n.getMessage(name)
}

const messages = {

  extensionName: "Bar Translate",

  notifications: {
    help: {
      title: getMessage('helpAndTips'),
      buttons: {
        alwaysHide: {
          title: getMessage('dontShowAnymore')
        },
        goHelp: {
          title: getMessage('goHelp')
        }
      }
    },
    tryLoveBuy: {
      title: getMessage('tryLoveBuy'),
      message: getMessage('supportMessage'),
      buttons: {
        buy: {
          title: getMessage('buyNow')
        },
        sync: {
          title: getMessage('syncLicense')
        }
      }
    },
    license: {
      title: {
        success: getMessage('ohYeah'),
        fail: getMessage('ohNo')
      },
      buttons: {
        buy: {
          title: getMessage('buyLicenseNow')
        }
      }
    }
  },

  contextMenus: {
    help: {
      title: getMessage('helpAndTips')
    },
    buy: {
      title: getMessage('buyLicense')
    },
    license: {
      title: getMessage('syncLicense')
    }

  },

}
export default messages