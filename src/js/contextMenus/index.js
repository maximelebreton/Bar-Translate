
import create from './create'
import onClicked from './onClicked'


const contextMenus = {

}

chrome.contextMenus.removeAll(function() {

  contextMenus.translate = create.translate(),
  contextMenus.help = create.help(),
  contextMenus.buyLicense = create.buyLicense(),
  contextMenus.registerLicense = create.registerLicense()

})

console.log(contextMenus)

export default contextMenus
