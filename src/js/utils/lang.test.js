import langNames from '../../json/langNames.json'
import langSupport from '../../json/langSupport.json'
import langAliases from '../../json/langAliases.json'
import textUtils from './text'
import langUtils from './lang'

describe('Lang utils', () => {

  it("Returns supported lang from alias", function () {

    expect( langUtils.getLangFromAlias('nb') ).toBe('no')
    expect( langUtils.getLangFromAlias('azertyuiop') ).toBe(undefined)

  })


  it("Returns supported alias from lang", function () {

    expect( langUtils.getAliasFromLang('no') ).toBe('nb')
    expect( langUtils.getAliasFromLang('azertyuiop') ).toBe(undefined)

  })



})
