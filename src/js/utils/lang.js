import langNames from '../../json/langNames.json'
import langSupport from '../../json/langSupport.json'
import langAliases from '../../json/langAliases.json'
import helloInAllLanguages from '../../json/hello.json'
import textUtils from './text'

const langUtils = {

  /*testExistingLanguage(value) {
    return Object.keys(langNames).some(function(key) {
      if (key && value) {
        return key.toLowerCase() === value.toLowerCase();
      }
    })
  },*/

  /*testLanguageAlias(value) {
    return Object.keys(langAliases).some(function(key) {
      if (key && value) {
        return key.toLowerCase() === value.toLowerCase()
      }
    })
  },*/

  /*testSupportedLanguage(value) {
    let hasAlias = langUtils.testLanguageAlias(value)
    let language = hasAlias ? langAliases[value].lang : value
    //return supportedLanguages.some(language)
  },*/

  getBrowserLanguage() {
    let uiLanguage = chrome.i18n.getUILanguage()
    return uiLanguage.split('-')[0]
  },

  /*getLangAlias(value) {
    let hasAlias = langUtils.testLanguageAlias(value)
    return hasAlias ? langAliases[value].lang : value
  },*/

  getLangFromAlias(value) {
    return langAliases[value] ? langAliases[value].lang : undefined
  },

  getAliasFromLang(value) {
    return Object.keys(langAliases).find(key => langAliases[key].lang === value)
  },

  getSupportedLang(value) {
    /*let candidate = langUtils.getLangAlias(value)
    return langSupport.find((item) => {
      return item === candidate
    })*/
    let lang = langUtils.getLangOrAliasResultFrom(value, langSupport)
    return lang
  },

  getLangOrAliasResultFrom(value, json) {
    let keys = Array.isArray(json) ? json : Object.keys(json)
    let lang = keys.find(key => key === value)
    if (!lang) {
      lang = keys.find(key => key === langUtils.getLangFromAlias(value))
    }
    return Array.isArray(json) ? lang : json[lang]
  },

  getLangOrAliasName(value) {
    let langEntry = langUtils.getLangOrAliasResultFrom(value, langNames)
    return langEntry.name
  },

  getLanguagePair(value) {
    let cleanedValue = textUtils.removeZeroWidthSpaces( value )
    let languagePair = cleanedValue.split(">")
    let sourceValue
    let targetValue

    if (languagePair.length === 1) {
      targetValue = languagePair[0]
    }
    if (languagePair.length === 2) {
      sourceValue = languagePair[0]
      targetValue = languagePair[1]
    }

    return {
      sourceValue,
      targetValue
    }
  },


  isDefaultLang(value) {
    let isDefault = langUtils.getBrowserLanguage() === value ? true : false
    return isDefault
  },


  extractLanguageFromQuery(text) {
    let firstWord = textUtils.getFirstWordAfterSpace(text)
    let {sourceValue, targetValue} = langUtils.getLanguagePair( firstWord )

    let supportedTargetLang = langUtils.getSupportedLang(targetValue)
    let supportedSourceLang = langUtils.getSupportedLang(sourceValue)

    let ifTargetLanguageExists = targetValue ? supportedTargetLang : null
    let ifSourceLanguageExists = sourceValue ? supportedSourceLang : null

    let query = ifTargetLanguageExists || ifSourceLanguageExists ? textUtils.getWithoutFirstWordAfterSpace(text) : text
    let targetLanguage = ifTargetLanguageExists ? supportedTargetLang : langUtils.getBrowserLanguage()
    let sourceLanguage = ifSourceLanguageExists ? supportedSourceLang : null

    let isDefault = ifTargetLanguageExists ? false : langUtils.isDefaultLang(targetLanguage)

    return {
      isDefault,
      query: query.trim(),
      targetLanguage,
      sourceLanguage
    }
  },


  getSuggestedLanguages(value) {
    let languageSuggests = []

    for (var language in langNames) {
      let languageName = langNames[language]['name']
      let languageSlice = languageName.toLowerCase().slice(0, value.length)
      let langName = language
      let langSlice = langName.toLowerCase().slice(0, value.length)

      if (value.toLowerCase() === langSlice) {
        let languageSuggest = {
          content: `${language} `,
          description: `${textUtils.zeroWidthSpace}Translate in <url>${languageName}</url> <dim>(<match>${langName.slice(0, langSlice.length)}</match>${langName.slice(langSlice.length, langName.length)})</dim>`
        }
        languageSuggests.push(languageSuggest);
      }
      if (value.toLowerCase() === languageSlice) {
        let languageSuggest = {
          content: `${language} `,
          description: `${textUtils.zeroWidthSpace}Translate in <url><match>${languageName.slice(0, languageSlice.length)}</match>${languageName.slice(languageSlice.length, languageName.length)}</url> <dim>(${language})</dim>`
        }
        languageSuggests.push(languageSuggest);
      }
    }

    return languageSuggests
  },


  getResolvedSourceLanguage(sourceLanguage, translations) {
    let detectedSourceLanguage = sourceLanguage ? null : (translations[0].detectedSourceLanguage ? translations[0].detectedSourceLanguage : null)
    let isDetectedSourceLanguage = !sourceLanguage && detectedSourceLanguage ? true : false
    let resolvedSourceLanguage = sourceLanguage ? sourceLanguage : detectedSourceLanguage
    return {
      isDetectedSourceLanguage,
      resolvedSourceLanguage
    }
  },


  getHelloFromLangOrAlias(value) {
    let helloItem
    let langResult = helloInAllLanguages.filter(item => item.locale === value)
    if (langResult.length) {
      helloItem = langResult
    } else {
      let fromAliasResult = helloInAllLanguages.filter(item => item.locale === langUtils.getLangFromAlias(value))
      if (fromAliasResult.length) {
        helloItem = fromAliasResult
      } else {
        let fromLangResult = helloInAllLanguages.filter(item => item.locale === langUtils.getAliasFromLang(value))
        helloItem = fromLangResult
      }
    }

    return helloItem.length ? helloItem[0].string : undefined
  }

}

export default langUtils
