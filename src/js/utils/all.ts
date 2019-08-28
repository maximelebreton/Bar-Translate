import textUtils from "./text";
import langUtils from "./lang";


type Lang = string;

type Query = string;

type TargetLang = Lang;

type SourceLang = Lang;

type Auto = "auto";

type SourceInput = SourceLang;
type TargetInput = TargetLang;

type inputRequest = {};

type outputRequest = {
  source;
};

type TranslateRequest = {
  source?: SourceInput;
  target: TargetInput;
  query: Query;
};

let test1: TranslateRequest = {
  source: "fr",
  target: "en",
  query: "bonjour"
};

let test2: TranslateRequest = {
  source: "",
  target: "en",
  query: "bonjour"
};

const getBrowserLanguages = async (): Promise<Array<Lang>> => {
  return chrome.i18n.getAcceptLanguages(langList => {
    return Promise.resolve(langList);
  });
};

const getLanguageWithoutVariation = (lang: string):Lang => {
  return lang.split("-")[0];
};

const getBrowserDefaultLanguage = async (): Promise<Lang> => {
  let primaryLanguage = getLanguageWithoutVariation(
    chrome.i18n.getUILanguage()
  );
  return Promise.resolve(primaryLanguage);
};

const getLanguagesWithoutDefault = async (): Promise<Array<Lang>> => {
  let browserLanguages = await getBrowserLanguages();

  let languagesWithoutDefault = browserLanguages.filter(async lang => {
    let primaryLanguage = await getBrowserDefaultLanguage();
    return langUtils.getLanguageWithoutVariation(lang) !== primaryLanguage;
  });

  return Promise.resolve(languagesWithoutDefault)
}

const getBrowserSecondaryLanguage = async (): Promise<Lang | null> => {
  let languagesWithoutDefault = await getLanguagesWithoutDefault()

  return Promise.resolve(
    languagesWithoutDefault.length ? languagesWithoutDefault[0] : null
  );
};

const extractRequestFromInput = async (
  input: string
): Promise<TranslateRequest> => {
  let firstWord = textUtils.getFirstWordAfterSpace(input);
  let {
    sourceValue,
    targetValue
  }: { sourceValue: string; targetValue: string } = langUtils.getLanguagePair(
    firstWord
  );

  let supportedSourceLang: SourceLang = langUtils.getSupportedLang(sourceValue);
  let supportedTargetLang: TargetLang = langUtils.getSupportedLang(targetValue);

  let query: Query =
    sourceValue || targetValue
      ? textUtils.getWithoutFirstWordAfterSpace(input)
      : input;

  let source: SourceInput = supportedSourceLang
    ? supportedSourceLang
    : langUtils.getStoreSourceLang();

  let primaryLanguage = await getBrowserDefaultLanguage()
  let target: TargetInput = supportedTargetLang
    ? supportedTargetLang
    : primaryLanguage;

  return Promise.resolve({
    source,
    target,
    query
  });
};
