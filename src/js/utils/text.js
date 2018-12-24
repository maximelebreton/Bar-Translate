const textUtils = {

  zeroWidthSpace: `​`,

  removeZeroWidthSpaces(value) {
    return value.replace(/[\u200B-\u200D\uFEFF]/g, '')
  },

  getFirstWordAfterSpace(value) {
    return value.substr(0, value.indexOf(" "))
  },

  getFirstWord(value) {
    return value.split(' ')[0]
  },

  getWithoutFirstWordAfterSpace(value) {
    return value.substr(value.indexOf(" ")+1, value.length)
  }

}

export default textUtils
