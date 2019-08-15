import langNames from "../../json/langNames.json";
import langSupport from "../../json/langSupport.json";
import langAliases from "../../json/langAliases.json";
import textUtils from "./text";
import langUtils from "./lang";

describe("Lang utils", () => {
  it("Returns supported lang from alias", function() {
    expect(langUtils.getLangFromAlias("nb")).toBe("no");
    expect(langUtils.getLangFromAlias("azertyuiop")).toBe(undefined);
  });

  it("Returns supported alias from lang", function() {
    expect(langUtils.getAliasFromLang("no")).toBe("nb");
    expect(langUtils.getAliasFromLang("azertyuiop")).toBe(undefined);
  });
});

describe("Extract languages from query", () => {
  it("Should be the default", function() {
    let input = "hello";
    let {
      isDefault,
      query,
      sourceLanguage,
      targetLanguage
    } = langUtils.extractLanguageFromQuery(input);
    expect(isDefault).toBe(true);
    expect(query).toBe("hello");
    expect(sourceLanguage).toBe(null);
    expect(targetLanguage).toBe("en");
  });

  it("Should separate target language from query", function() {
    let input = "fr hello";
    let {
      isDefault,
      query,
      sourceLanguage,
      targetLanguage
    } = langUtils.extractLanguageFromQuery(input);
    expect(query).toBe("hello");
    expect(sourceLanguage).toBe(null);
    expect(targetLanguage).toBe("fr");
  });

  it("Should separate source & target languages from query", function() {
    let input = "en>fr hello";
    let {
      isDefault,
      query,
      sourceLanguage,
      targetLanguage
    } = langUtils.extractLanguageFromQuery(input);

    expect(query).toBe("hello");
    expect(sourceLanguage).toBe("en");
    expect(targetLanguage).toBe("fr");
  });

  it("Should understand langs with dash", function() {
    let input = "en>zh-CN hello";
    let {
      isDefault,
      query,
      sourceLanguage,
      targetLanguage
    } = langUtils.extractLanguageFromQuery(input);

    expect(query).toBe("hello");
    expect(sourceLanguage).toBe("en");
    expect(targetLanguage).toBe("zh-CN");
  });

  it("Should understand if the target language is the browser default language", function() {
    let input = "en hello";
    let {
      isDefault,
      query,
      sourceLanguage,
      targetLanguage
    } = langUtils.extractLanguageFromQuery(input);

    expect(isDefault).toBe(false);
    expect(query).toBe("hello");
    expect(targetLanguage).toBe("en");
  });

  it("Should fallback to browser language if target language doesn't exists", function() {
    let input = "xxx hello";
    let {
      isDefault,
      query,
      sourceLanguage,
      targetLanguage
    } = langUtils.extractLanguageFromQuery(input);
    expect(query).toBe("xxx hello");
    expect(targetLanguage).toBe(langUtils.getBrowserLanguage());
  });

  it("Should skip target and fallback to browser default language but keep source", function() {
    let input = "fr>xxx hello";
    let {
      isDefault,
      query,
      sourceLanguage,
      targetLanguage
    } = langUtils.extractLanguageFromQuery(input);
    expect(query).toBe("hello");
    expect(sourceLanguage).toBe("fr");
    expect(targetLanguage).toBe(langUtils.getBrowserLanguage());
  });

  it("Should skip source language if it doesn't exists but target is defined", function() {
    let input = "xxx>fr hello";
    let {
      isDefault,
      query,
      sourceLanguage,
      targetLanguage
    } = langUtils.extractLanguageFromQuery(input);
    expect(query).toBe("hello");
    expect(sourceLanguage).toBe(null);
    expect(targetLanguage).toBe("fr");
  });
});
