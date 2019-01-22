import langUtils from '../utils/lang'
import langNames from '../../json/langNames.json'
import textUtils from '../utils/text'
import messages from './messages'
import spinner from '../utils/spinner'
import debounce from '../utils/debounce'
import translateService from '../translateService'

let abortOnChangeDebounce = false


const getTranslationsSuggests = (sourceLanguage, targetLanguage, query, translations, translateService) => {
  return translations.map(function (translation) {
    // because suggest doesn't display if content attr already exist in suggests, and somestimes the input query match the translated result
    let content = translation.translatedText === query ? `${translation.translatedText}${textUtils.zeroWidthSpace}` : translation.translatedText

    return {
      content: `${content}`,
      description: messages.getTranslationDescription(translation.translatedText, translateService)
    }
  })
}



const getLanguageSlices = (value) => {
  let matches = []

  for (var lang in langNames) {
    let languageName = langNames[lang]['name']
    let languageSlice = languageName.toLowerCase().slice(0, value.length)
    let langName = lang
    let langSlice = langName.toLowerCase().slice(0, value.length)
    let aliasName = langUtils.getAliasFromLang(lang)
    let aliasSlice = aliasName ? aliasName.toLowerCase().slice(0, value.length) : ''
    let match = {
      languageName,
      languageSlice: '',
      langName,
      langSlice: '',
      aliasName,
      aliasSlice: ''
    }

    if (value.toLowerCase() === languageSlice) {
      match.languageSlice = languageSlice
    }
    if (value.toLowerCase() === langSlice) {
      match.langSlice = langSlice
    }
    if (value.toLowerCase() === aliasSlice) {
      match.aliasSlice = aliasSlice
    }
    if (match.languageSlice || match.langSlice || match.aliasSlice) {
      matches.push(match)
    }
  }

  return matches
}

const getLanguagesSuggests = (value) => {

  let firstWord = textUtils.getFirstWord(value)
  let {sourceValue, targetValue} = langUtils.getLanguagePair( firstWord )
  let languageSuggests = []

  if (!sourceValue && targetValue) {
    let targetSlices = getLanguageSlices(targetValue)

    targetSlices.forEach((targetSlice) => {
      let {languageName: targetLanguageName, languageSlice: targetLanguageSlice, langName: targetLangName, langSlice: targetLangSlice, aliasName: targetAliasName, aliasSlice: targetAliasSlice} = targetSlice
      if (targetValue.toLowerCase() === targetLangSlice || targetValue.toLowerCase() === targetLanguageSlice || targetValue.toLowerCase() === targetAliasSlice) {
        let languageSuggest = {
          content: `${targetLangName} `,
          description: `${textUtils.zeroWidthSpace}${messages.getSuggestDescription(targetLanguageName, targetLanguageSlice, targetLangName, targetLangSlice, targetAliasName, targetAliasSlice)}`
        }
        languageSuggests.push(languageSuggest);
      }
      /*if (targetValue.toLowerCase() === targetLanguageSlice) {
        let languageSuggest = {
          content: `${targetLangName} `,
          description: `${textUtils.zeroWidthSpace}${messages.getSuggestDescription(targetLanguageName, targetLanguageSlice, targetLangName, targetLangSlice, targetAliasName, targetAliasSlice)}`
        }
        languageSuggests.push(languageSuggest);
      }
      if (targetValue.toLowerCase() === targetAliasSlice) {
        let languageSuggest = {
          content: `${targetLangName} `,
          description: `${textUtils.zeroWidthSpace}${messages.getSuggestDescription(targetLanguageName, targetLanguageSlice, targetLangName, targetLangSlice, targetAliasName, targetAliasSlice)}`
        }
        languageSuggests.push(languageSuggest);
      }*/
    })
  }
  if (sourceValue && !targetValue) {
    let sourceSlices = getLanguageSlices(sourceValue)

    sourceSlices.forEach((sourceSlice) => {
      let {languageName: sourceLanguageName, languageSlice: sourceLanguageSlice, langName: sourceLangName, langSlice: sourceLangSlice, aliasName: sourceAliasName, aliasSlice: sourceAliasSlice} = sourceSlice

      if (sourceValue.toLowerCase() === sourceLangSlice || sourceValue.toLowerCase() === sourceLanguageSlice || sourceValue.toLowerCase() === sourceAliasSlice) {

        let languageSuggest = {
          content: `${sourceLangName}>${textUtils.zeroWidthSpace}`,
          description: `${textUtils.zeroWidthSpace}${messages.getFromSuggestDescription(sourceLanguageName, sourceLanguageSlice, sourceLangName, sourceLangSlice, sourceAliasName, sourceAliasSlice)}`
        }
        languageSuggests.push(languageSuggest);
      }
      /*if (sourceValue.toLowerCase() === sourceLanguageSlice) {

        let languageSuggest = {
          content: `${sourceLangName}>${textUtils.zeroWidthSpace}`,
          description: `${textUtils.zeroWidthSpace}${messages.getFromLanguageSuggestDescription(sourceLanguageName, sourceLanguageSlice, sourceLangName, sourceLangSlice)}`
        }
        languageSuggests.push(languageSuggest);
      }*/
    })

  }
  if (sourceValue && targetValue) {
    let sourceSlices = getLanguageSlices(sourceValue)
    let targetSlices = getLanguageSlices(targetValue)

    sourceSlices.forEach((sourceSlice) => {
      let {languageName: sourceLanguageName, languageSlice: sourceLanguageSlice, langName:sourceLangName, langSlice: sourceLangSlice, aliasName: sourceAliasName, aliasSlice: sourceAliasSlice} = sourceSlice
      targetSlices.forEach((targetSlice) => {
        let {languageName: targetLanguageName, languageSlice: targetLanguageSlice, langName: targetLangName, langSlice: targetLangSlice, aliasName: targetAliasName, aliasSlice: targetAliasSlice} = targetSlice
        let sourceParams = {languageName: sourceLanguageName, languageSlice: sourceLanguageSlice, langName: sourceLangName, langSlice: sourceLangSlice, aliasName: sourceAliasName, aliasSlice: sourceAliasSlice}
        let targetParams = {languageName: targetLanguageName, languageSlice: targetLanguageSlice, langName: targetLangName, langSlice: targetLangSlice, aliasName: targetAliasName, aliasSlice: targetAliasSlice}

        if (
          (sourceValue.toLowerCase() === sourceLangSlice || sourceValue.toLowerCase() === sourceLanguageSlice || sourceValue.toLowerCase() === sourceAliasSlice)
          &&
          (targetValue.toLowerCase() === targetLangSlice || targetValue.toLowerCase() === targetLanguageSlice || sourceValue.toLowerCase() === targetAliasSlice)
        ) {
          if (sourceLangName !== targetLangName) {
            let languageSuggest = {
              content: `${sourceLangName}>${targetLangName} `,
              description: `${textUtils.zeroWidthSpace}${messages.getFromToSuggestDescription(sourceParams, targetParams)}`
            }
            languageSuggests.push(languageSuggest);
          }
        }

      })
    })

  }

  return languageSuggests
}


const onChange = (sourceLanguage, targetLanguage, query, isDefault, suggest, suggestedLanguages) => {
  if (!query.length || abortOnChangeDebounce) {
    return
  }
  translateService.getTranslation(sourceLanguage, targetLanguage, query)
  .then(data => {
    clearInterval(spinner.current)
    let {sourceLanguage, targetLanguage, query, translations} = data
    let {isDetectedSourceLanguage, resolvedSourceLanguage} = langUtils.getResolvedSourceLanguage(sourceLanguage, translations)

    let translationsSuggests = getTranslationsSuggests(resolvedSourceLanguage, targetLanguage, query, translations, translateService.current)
    messages.defaultDescription = messages.getDefaultDescription(resolvedSourceLanguage, targetLanguage, query, isDefault, isDetectedSourceLanguage)

    let suggestedTranslation = textUtils.removeZeroWidthSpaces( translationsSuggests[0].content )


    if (suggestedTranslation === query && suggestedLanguages.length) { // ouput is same as input, and there is language suggests
      chrome.omnibox.setDefaultSuggestion({
        description: messages.getLanguageSuggestDefaultDescription()
      })
    } else if (suggestedTranslation === query && !suggestedLanguages.length) {  // ouput is same as input, and no language suggests, so it's weird... maybe a non existing word
      chrome.omnibox.setDefaultSuggestion({
        description: messages.defaultDescription
      })
      let warnedTranslationSuggest = translationsSuggests.map((result) => {
        return {
          content: result.content,
          description: messages.getWeirdResultMessage() + result.description
        }
      })
      suggest(warnedTranslationSuggest)
    } else if (query.match(/[>]/) && !query.match(/[\s]/)) { // find a > symbol but no spaces
      chrome.omnibox.setDefaultSuggestion({
        description: messages.defaultDescription
      })
    } else { // else, everything is fine!
      chrome.omnibox.setDefaultSuggestion({
        description: messages.defaultDescription
      })
      if (translationsSuggests.length && suggestedTranslation.length) {
        suggest(translationsSuggests)
      }
    }


  })
  .catch(function(error) {
    console.log(error)
    clearInterval(spinner.current)
    if (error.type === 'offline') {
      chrome.omnibox.setDefaultSuggestion({
        description: error.message
      })
    } else {
      chrome.omnibox.setDefaultSuggestion({
        description: messages.getErrorDescription(sourceLanguage, targetLanguage, query, translateService.current)
      })
    }

  })
}


let debounceOnChange = debounce(onChange, 300)



const onInputChangedListener = (text, suggest) => {
  let {sourceLanguage, targetLanguage, query, isDefault} = langUtils.extractLanguageFromQuery(text)
  messages.defaultDescription = messages.getDefaultDescription(sourceLanguage, targetLanguage, query, isDefault)

  clearInterval(spinner.current)
  if (query.length) {
    spinner.current = spinner.animate(function(indicator) {
      chrome.omnibox.setDefaultSuggestion({
        description: `${messages.defaultDescription}${' '+indicator} <dim>${translateService.isRetrying ? `${chrome.i18n.getMessage('retrying')}…` : ''}</dim>`
      })
    })
  } else {
    chrome.omnibox.setDefaultSuggestion({
      description: `${messages.defaultDescription}`
    })
  }
  let suggestedLanguages = []
  let words = text.split(' ')
  if (words.length === 1) {
    suggestedLanguages = getLanguagesSuggests(text)
    suggest(suggestedLanguages)
  }


  abortOnChangeDebounce = false
  debounceOnChange(sourceLanguage, targetLanguage, query, isDefault, suggest, suggestedLanguages)
  if (words.length === 2 && !words[1] && !isDefault) {
    abortOnChangeDebounce = true
  }
}


export default chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  onInputChangedListener(text, suggest)
})
