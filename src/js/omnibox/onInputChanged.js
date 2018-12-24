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
    let match = {
      languageName,
      languageSlice: '',
      langName,
      langSlice: ''
    }

    if (value.toLowerCase() === languageSlice) {
      match.languageSlice = languageSlice
    }
    if (value.toLowerCase() === langSlice) {
      match.langSlice = langSlice
    }
    if (match.languageSlice || match.langSlice) {
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
      let {languageName: targetLanguageName, languageSlice: targetLanguageSlice, langName: targetLangName, langSlice: targetLangSlice} = targetSlice
      if (targetValue.toLowerCase() === targetLangSlice) {
        let languageSuggest = {
          content: `${targetLangName} `,
          description: `${textUtils.zeroWidthSpace}${messages.getLangSuggestDescription(targetLanguageName, targetLanguageSlice, targetLangName, targetLangSlice)}`
        }
        languageSuggests.push(languageSuggest);
      }
      if (targetValue.toLowerCase() === targetLanguageSlice) {
        let languageSuggest = {
          content: `${targetLangName} `,
          description: `${textUtils.zeroWidthSpace}${messages.getLanguageSuggestDescription(targetLanguageName, targetLanguageSlice, targetLangName, targetLangSlice)}`
        }
        languageSuggests.push(languageSuggest);
      }
    })
  }
  if (sourceValue && !targetValue) {
    let sourceSlices = getLanguageSlices(sourceValue)

    sourceSlices.forEach((sourceSlice) => {
      let {languageName: sourceLanguageName, languageSlice: sourceLanguageSlice, langName: sourceLangName, langSlice: sourceLangSlice} = sourceSlice

      if (sourceValue.toLowerCase() === sourceLangSlice) {

        let languageSuggest = {
          content: `${sourceLangName}>${textUtils.zeroWidthSpace}`,
          description: `${textUtils.zeroWidthSpace}${messages.getFromLangSuggestDescription(sourceLanguageName, sourceLanguageSlice, sourceLangName, sourceLangSlice)}`
        }
        languageSuggests.push(languageSuggest);
      }
      if (sourceValue.toLowerCase() === sourceLanguageSlice) {

        let languageSuggest = {
          content: `${sourceLangName}>${textUtils.zeroWidthSpace}`,
          description: `${textUtils.zeroWidthSpace}${messages.getFromLanguageSuggestDescription(sourceLanguageName, sourceLanguageSlice, sourceLangName, sourceLangSlice)}`
        }
        languageSuggests.push(languageSuggest);
      }
    })

  }
  if (sourceValue && targetValue) {
    let sourceSlices = getLanguageSlices(sourceValue)
    let targetSlices = getLanguageSlices(targetValue)

    sourceSlices.forEach((sourceSlice) => {
      let {languageName: sourceLanguageName, languageSlice: sourceLanguageSlice, langName:sourceLangName, langSlice: sourceLangSlice} = sourceSlice
      targetSlices.forEach((targetSlice) => {
        let {languageName: targetLanguageName, languageSlice: targetLanguageSlice, langName: targetLangName, langSlice: targetLangSlice} = targetSlice
        let sourceParams = {languageName: sourceLanguageName, languageSlice: sourceLanguageSlice, langName: sourceLangName, langSlice: sourceLangSlice}
        let targetParams = {languageName: targetLanguageName, languageSlice: targetLanguageSlice, langName: targetLangName, langSlice: targetLangSlice}

        if (
          (sourceValue.toLowerCase() === sourceLangSlice || sourceValue.toLowerCase() === sourceLanguageSlice)
          &&
          (targetValue.toLowerCase() === targetLangSlice || targetValue.toLowerCase() === targetLanguageSlice)
        ) {
          let languageSuggest = {
            content: `${sourceLangName}>${targetLangName} `,
            description: `${textUtils.zeroWidthSpace}${messages.getFromToSuggestDescription(sourceParams, targetParams)}`
          }
          languageSuggests.push(languageSuggest);
        }

      })
    })

  }

  return languageSuggests
}


const onChange = (sourceLanguage, targetLanguage, query, isDefault, suggest) => {
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

    chrome.omnibox.setDefaultSuggestion({
      description: messages.defaultDescription
    })
    if (translationsSuggests.length && translationsSuggests[0].content.length) {
      suggest(translationsSuggests)
    }
  })
  .catch(function(error) {
    console.log(error)
    clearInterval(spinner.current)
    chrome.omnibox.setDefaultSuggestion({
      description: messages.getErrorDescription(sourceLanguage, targetLanguage, query, translateService.current)
    })
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
        description: `${messages.defaultDescription}${' '+indicator}`
      })
    })
  } else {
    chrome.omnibox.setDefaultSuggestion({
      description: `${messages.defaultDescription}`
    })
  }

  let words = text.split(' ')
  if (words.length === 1) {
    let suggestedLanguages = getLanguagesSuggests(text)
    suggest(suggestedLanguages)
  }


  abortOnChangeDebounce = false
  debounceOnChange(sourceLanguage, targetLanguage, query, isDefault, suggest)
  if (words.length === 2 && !words[1] && !isDefault) {
    abortOnChangeDebounce = true
  }
}


export default chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  onInputChangedListener(text, suggest)
})
