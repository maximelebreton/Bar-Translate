import create from './create'
import onButtonClicked from './onButtonClicked'

const prefix = 'barTranslate.notifications.'

const notifications = {

  help: {
    id: prefix + 'help'
  },
  tryLoveBuy: {
    id: prefix + 'tryLoveBuy'
  },
  license: {
    id: prefix + 'license'
  },

  show: (name, params) => {
    create[name](params)
  }

}


export default notifications
