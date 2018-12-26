import create from './create'
import onButtonClicked from './onButtonClicked'
import onClosed from './onClosed'

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
  translation: {
    id: prefix + 'translation'
  },

  translations: [],

  show: (name, params) => {
    create[name](params)
  }

}


export default notifications
