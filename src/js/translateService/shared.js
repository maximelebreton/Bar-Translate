const sharedTranslateService = (state) => ({

  getUrlWithParams: (path, params) => {
    const stringParams = Object.keys(params).map(key => key + '=' + params[key]).join('&')
    const url = `${path}?${stringParams}`
    return url
  }
})

export default sharedTranslateService
