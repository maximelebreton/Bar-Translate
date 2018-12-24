import langNames from '../../json/langNames.json'
//import textUtils from '../utils/text'
let space = ` `
const messages = {

  defaultDescription: '',

  getDefaultDescription(sourceLanguage, targetLanguage, query, isDefault, isDetectedSourceLanguage) {
    let targetLanguageName = targetLanguage && langNames[targetLanguage] ? langNames[targetLanguage].name : ''
    let sourceLanguageName = sourceLanguage && langNames[sourceLanguage] ? langNames[sourceLanguage].name : ''

    let translate = `<match>${chrome.i18n.getMessage('translate').capitalize()} </match>`
    let match = `<match><dim>${query.length ? query.trunc(25)+' ' : ''}</dim></match>`

    let fromSource = sourceLanguageName ? `${chrome.i18n.getMessage('from')} <url>${sourceLanguageName}</url> ` : ``
    let fromDetected = sourceLanguageName ? `<dim>(${sourceLanguageName}-ᴅᴇᴛᴇᴄᴛᴇᴅ)</dim> ` : ''
    let from = isDetectedSourceLanguage ? fromDetected : fromSource

    let toPrefix = sourceLanguage && !isDetectedSourceLanguage ? `${chrome.i18n.getMessage('into')} ` : `${chrome.i18n.getMessage('in')} `
    let toSuffix = `<dim>${isDefault ? ` (${chrome.i18n.getMessage('default')})` : ''}</dim>`
    let to = `<match>${toPrefix}<url>${targetLanguageName}</url></match>${toSuffix}`

    return `${translate}${match}${from}${to}`
  },

  getLanguageSuggestDescription(languageName, languageSlice, langName, langSlice) {
    return `<match><dim>?</dim></match>${space.repeat(2)}Translate in <url><match>${languageName.slice(0, languageSlice.length)}</match>${languageName.slice(languageSlice.length, languageName.length)}</url> <dim>(${langName})</dim>`
  },

  getLangSuggestDescription(languageName, languageSlice, langName, langSlice) {
    return `<match><dim>?</dim></match>${space.repeat(2)}Translate in <url>${languageName}</url> <dim>(<match>${langName.slice(0, langSlice.length)}</match>${langName.slice(langSlice.length, langName.length)})</dim>`
  },

  getFromLanguageSuggestDescription(languageName, languageSlice, langName, langSlice) {
    return `<match><dim>?</dim></match>${space.repeat(2)}Translate from <url><match>${languageName.slice(0, languageSlice.length)}</match>${languageName.slice(languageSlice.length, languageName.length)}</url> <dim>(${langName})</dim>`
  },

  getFromLangSuggestDescription(languageName, languageSlice, langName, langSlice) {
    return `<match><dim>?</dim></match>${space.repeat(2)}Translate from <url>${languageName}</url> <dim>(<match>${langName.slice(0, langSlice.length)}</match>${langName.slice(langSlice.length, langName.length)})</dim>`
  },

  getFromToLangSuggestDescription(source, target) {
    return `<match><dim>?</dim></match>${space.repeat(2)}Translate from <url>${source.languageName}</url> <dim>(<match>${source.langName.slice(0, source.langSlice.length)}</match>${source.langName.slice(source.langSlice.length, source.langName.length)})</dim> into <url>${target.languageName}</url> <dim>(<match>${target.langName.slice(0, target.langSlice.length)}</match>${target.langName.slice(target.langSlice.length, target.langName.length)})</dim>`
  },

  getFromToLanguageSuggestDescription(source, target) {
    return `<match><dim>?</dim></match>${space.repeat(2)}Translate from <url><match>${source.languageName.slice(0, source.languageSlice.length)}</match>${source.languageName.slice(source.languageSlice.length, source.languageName.length)}</url> <dim>(${source.langName})</dim> into <url><match>${target.languageName.slice(0, target.languageSlice.length)}</match>${target.languageName.slice(target.languageSlice.length, target.languageName.length)}</url> <dim>(${target.langName})</dim>`
  },

  getFromToSuggestDescription(source, target) {
    return `<match><dim>?</dim></match>${space.repeat(2)}Translate from <url><match>${source.languageName.slice(0, source.languageSlice.length)}</match>${source.languageName.slice(source.languageSlice.length, source.languageName.length)}</url> <dim>(<match>${source.langName.slice(0, source.langSlice.length)}</match>${source.langName.slice(source.langSlice.length, source.langName.length)})</dim> into <url><match>${target.languageName.slice(0, target.languageSlice.length)}</match>${target.languageName.slice(target.languageSlice.length, target.languageName.length)}</url> <dim>(<match>${target.langName.slice(0, target.langSlice.length)}</match>${target.langName.slice(target.langSlice.length, target.langName.length)})</dim>`
  },

  getTranslationDescription( translatedText, translateService) {
    //let equal = `=`
    //let arrow = `—›`
    //let prefix = `<dim>${sourceLanguage ? `${sourceLanguage}` : ''}</dim><match></match><dim> › ${targetLanguage}</dim>`
    let space = `  `
    return `${space}<match><dim>=</dim></match>${space}<url><match>${translatedText}</match></url> <dim>${space}ᴛʀᴀɴsʟᴀᴛᴇᴅ ʙʏ ${translateService.smallcase}</dim>`
  },

  getErrorDescription(sourceLanguage, targetLanguage, query, translateService) {
    return `<dim>Connexion problem with ${translateService.name} api</dim>, press enter to translate <match>${query.trunc(25)}</match> in <url>${langNames[targetLanguage].name}</url> on <match><url>Google Translate</url></match>`
  }

}

export default messages
