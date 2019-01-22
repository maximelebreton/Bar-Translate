import langNames from '../../json/langNames.json'
import langUtils from '../utils/lang'
//import textUtils from '../utils/text'
let space = ` `

// i18n
const __ = (value) => {
  return chrome.i18n.getMessage(value)
}

const messages = {

  defaultDescription: '',

  getDefaultDescription(sourceLanguage, targetLanguage, query, isDefault, isDetectedSourceLanguage) {
    let targetLanguageName = targetLanguage && langNames[targetLanguage] ? langNames[targetLanguage].name : ''
    let sourceLanguageName = sourceLanguage && langNames[sourceLanguage] ? langNames[sourceLanguage].name : ''

    let translate = `<match>${__('translate').capitalize()} </match>`
    let match = `<match><dim>${query.length ? query.trunc(25)+' ' : ''}</dim></match>`

    let fromSource = sourceLanguageName ? `${__('from')} <url>${sourceLanguageName}</url> ` : ``
    let fromDetected = sourceLanguageName ? `<dim>(${sourceLanguageName}-ᴅᴇᴛᴇᴄᴛᴇᴅ)</dim> ` : ''
    let from = isDetectedSourceLanguage ? fromDetected : fromSource

    let toPrefix = sourceLanguage && !isDetectedSourceLanguage ? `${__('into')} ` : `${__('in')} `
    let toSuffix = `<dim>${isDefault ? ` (${__('default')})` : ''}</dim>`

    let to = `<match>${toPrefix}<url>${targetLanguageName}</url></match>${toSuffix}`

    return `${translate}${match}${from}${to}`
  },

  /*getLanguageSuggestDescription(languageName, languageSlice, langName, langSlice, aliasName, aliasSlice) {
    return `<match><dim>?</dim></match>${space.repeat(2)}Translate in <url><match>${languageName.slice(0, languageSlice.length)}</match>${languageName.slice(languageSlice.length, languageName.length)}</url> <dim>(${langName}${aliasName ? ', ' + aliasName : ''})</dim>`
  },

  getLangSuggestDescription(languageName, languageSlice, langName, langSlice, aliasName, aliasSlice) {
    return `<match><dim>?</dim></match>${space.repeat(2)}Translate in <url>${languageName}</url> <dim>(<match>${langName.slice(0, langSlice.length)}</match>${langName.slice(langSlice.length, langName.length)}${aliasName ? ', ' : ''}<match>${aliasName ? aliasName.slice(0, aliasSlice.length) : ''}</match>${aliasName ? aliasName.slice(aliasSlice.length, aliasName.length) : ''})</dim>`
  },*/

  getSuggestDescription(languageName, languageSlice, langName, langSlice, aliasName, aliasSlice) {
    let prefix = `<match><dim>?</dim></match>${space.repeat(2)}`
    let translateIn = `${__('translateIn')} `
    let matchedLanguage = `<url><match>${languageName.slice(0, languageSlice.length)}</match>${languageName.slice(languageSlice.length, languageName.length)}</url> `
    let matchedLang = `<match>${langName.slice(0, langSlice.length)}</match>${langName.slice(langSlice.length, langName.length)}`
    let matchedAlias = aliasName ? `<match>${aliasName.slice(0, aliasSlice.length)}</match>${aliasName.slice(aliasSlice.length, aliasName.length)}` : ''
    let aliasPrefix = aliasName ? `${space.repeat(2)}ᴀʟɪᴀs: ` : ''
    let matchedLangOrAlias = `<dim>(${matchedLang})${aliasPrefix}${matchedAlias}</dim>`

    return `${prefix}${translateIn}${matchedLanguage}${matchedLangOrAlias}`
  },

  /*getFromLanguageSuggestDescription(languageName, languageSlice, langName, langSlice) {
    return `<match><dim>?</dim></match>${space.repeat(2)}Translate from <url><match>${languageName.slice(0, languageSlice.length)}</match>${languageName.slice(languageSlice.length, languageName.length)}</url> <dim>(${langName})</dim>`
  },

  getFromLangSuggestDescription(languageName, languageSlice, langName, langSlice) {
    return `<match><dim>?</dim></match>${space.repeat(2)}Translate from <url>${languageName}</url> <dim>(<match>${langName.slice(0, langSlice.length)}</match>${langName.slice(langSlice.length, langName.length)})</dim>`
  },*/

  getFromSuggestDescription(languageName, languageSlice, langName, langSlice, aliasName, aliasSlice) {
    return `<match><dim>?</dim></match>${space.repeat(2)}${__('translateFrom')} <url><match>${languageName.slice(0, languageSlice.length)}</match>${languageName.slice(languageSlice.length, languageName.length)}</url> <dim>(<match>${!aliasSlice ? langName.slice(0, langSlice.length) : ''}</match>${!aliasSlice ? langName.slice(langSlice.length, langName.length) : ''}<match>${aliasSlice ? aliasName.slice(0, aliasSlice.length) : ''}</match>${aliasSlice ? aliasName.slice(aliasSlice.length, aliasName.length) : ''})</dim>`
  },

  /*getFromToLangSuggestDescription(source, target) {
    return `<match><dim>?</dim></match>${space.repeat(2)}Translate from <url>${source.languageName}</url> <dim>(<match>${source.langName.slice(0, source.langSlice.length)}</match>${source.langName.slice(source.langSlice.length, source.langName.length)})</dim> into <url>${target.languageName}</url> <dim>(<match>${target.langName.slice(0, target.langSlice.length)}</match>${target.langName.slice(target.langSlice.length, target.langName.length)})</dim>`
  },

  getFromToLanguageSuggestDescription(source, target) {
    return `<match><dim>?</dim></match>${space.repeat(2)}Translate from <url><match>${source.languageName.slice(0, source.languageSlice.length)}</match>${source.languageName.slice(source.languageSlice.length, source.languageName.length)}</url> <dim>(${source.langName})</dim> into <url><match>${target.languageName.slice(0, target.languageSlice.length)}</match>${target.languageName.slice(target.languageSlice.length, target.languageName.length)}</url> <dim>(${target.langName})</dim>`
  },*/

  getFromToSuggestDescription(source, target) {
    let prefix = `<match><dim>?</dim></match>${space.repeat(2)}`
    let translateFrom = `${__('translateFrom')} `
    let matchedSourceLanguage = `<url><match>${source.languageName.slice(0, source.languageSlice.length)}</match>${source.languageName.slice(source.languageSlice.length, source.languageName.length)}</url> `
    let matchedSourceLangOrAlias = `<dim>(<match>${!source.aliasSlice ? source.langName.slice(0, source.langSlice.length) : ''}</match>${!source.aliasSlice ? source.langName.slice(source.langSlice.length, source.langName.length) : ''}<match>${source.aliasSlice ? source.aliasName.slice(0, source.aliasSlice.length) : ''}</match>${source.aliasSlice ? source.aliasName.slice(source.aliasSlice.length, source.aliasName.length) : ''})</dim> `
    let matchedSource = `${matchedSourceLanguage}${matchedSourceLangOrAlias}`
    let into = `${__('into')} `
    let matchedTargetLanguage = `<url><match>${target.languageName.slice(0, target.languageSlice.length)}</match>${target.languageName.slice(target.languageSlice.length, target.languageName.length)}</url> `
    let matchedTargetLangOrAlias = `<dim>(<match>${!target.aliasSlice ? target.langName.slice(0, target.langSlice.length) : ''}</match>${!target.aliasSlice ? target.langName.slice(target.langSlice.length, target.langName.length) : ''}<match>${target.aliasSlice ? target.aliasName.slice(0, target.aliasSlice.length) : ''}</match>${target.aliasSlice ? target.aliasName.slice(target.aliasSlice.length, target.aliasName.length) : ''})</dim>`
    let matchedTarget = `${matchedTargetLanguage}${matchedTargetLangOrAlias}`

    return `${prefix}${translateFrom}${matchedSource}${into}${matchedTarget}`
  },

  getTranslationDescription( translatedText, translateService) {
    //let equal = `=`
    //let arrow = `—›`
    //let prefix = `<dim>${sourceLanguage ? `${sourceLanguage}` : ''}</dim><match></match><dim> › ${targetLanguage}</dim>`
    let space = `  `
    return `${space}<match><dim>=</dim></match>${space}<url><match>${translatedText}</match></url><dim>${space.repeat(2)}${__('translatedBy__smallcase')} ${translateService.smallcase}</dim>`
  },

  getErrorDescription(sourceLanguage, targetLanguage, query, translateService) {
    return `<dim>Connexion problem with ${translateService.name} api</dim>, press enter to translate <match>${query.trunc(25)}</match> in <url>${langNames[targetLanguage].name}</url> on <match><url>Google Translate</url></match>`
  },

  getLanguageSuggestDefaultDescription() {
    return `<match>${__('translateIn')}…</match> <dim>(${__('selectWithArrowKeys')}):</dim>`
  },

  getWeirdResultMessage() {
    return `<match>⚠</match> <dim>${__('weirdResult')}</dim>`
  }

}

export default messages
