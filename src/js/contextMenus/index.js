
import create from './create'
import onClicked from './onClicked'
import update from './update'


const contextMenus = {
  update: update
}

chrome.contextMenus.removeAll(function() {

  contextMenus.translateSelection = create.translateSelection(),
  contextMenus.help = create.help(),
  contextMenus.buyLicense = create.buyLicense(),
  contextMenus.registerLicense = create.registerLicense()

})

console.log(contextMenus)

export default contextMenus
