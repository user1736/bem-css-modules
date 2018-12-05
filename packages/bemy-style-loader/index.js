const path = require('path')
const { getOptions } = require('loader-utils')

module.exports = function () {}
module.exports.pitch = function (remainingRequest) {
  if (this.cacheable) {
    this.cacheable()
  }

  const options = getOptions(this) || {}
  const inlineOptions = JSON.stringify(options)

  const basePath = options.baseAppPath
  const filePath = basePath
    ? JSON.stringify(path.relative(basePath, this.resourcePath))
    : ''

  const output = `
      module.exports = require('bemy-class-builder').default(
        require(${JSON.stringify('!!' + remainingRequest)}), 
        ${inlineOptions},
        ${filePath}
      );
    `

  return output
}
