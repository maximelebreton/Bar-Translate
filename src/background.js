import utils from './js/utils'
import init from './js/init'
import runtime from './js/runtime'
import contextMenus from './js/contextMenus'
import notifications from './js/notifications'
import omnibox from './js/omnibox'
import storage from './js/storage'

//chrome.storage.local.clear()

storage.local.getAll()
.then(data => {
  console.info(data)
})

storage.sync.getAll()
.then(data => {
  console.info(data)
})

