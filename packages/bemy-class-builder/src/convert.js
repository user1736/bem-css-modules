import bem from '@bem/sdk.naming.entity'
import set from 'lodash/set'
import camelCase from 'lodash/camelCase'
import groupBy from 'lodash/groupBy'

const bemNamingFactory = options => {
  const parser = bem(options)
  return key => [
    key,
    parser.parse(key) || {
      raw: true
    }
  ]
}

const getModPath = entity =>
  entity.isSimpleMod()
    ? `mod.${entity.mod.name}`
    : `mod.${entity.mod.name}.${entity.mod.val}`

const getElemPath = entity => `${entity.block}.elem.${entity.elem}`

const convert = (input, options) => {
  const bemNaming = bemNamingFactory(options)
  const groupedInputKeys = groupBy(Object.keys(input), camelCase)

  return Object.keys(input)
    .reduce((output, key) => {
      const camelCasedKey = camelCase(key)
      /**
       * Output of css-loader contains classNames in 2 versions: raw and camelCased,
       * so we need to filter out copies in order to prevent creation of "fake" blocks
       * from camelCased element classNames
       */
      if (
        camelCasedKey === key &&
        groupedInputKeys[camelCasedKey].length !== 1
      ) {
        return output
      }

      output.push(bemNaming(key))
      return output
    }, [])
    .reduce((output, [key, entity]) => {
      switch (entity.type) {
        case 'block':
          set(output, `${entity.block}.cls`, input[key])
          break

        case 'elem':
          set(output, `${getElemPath(entity)}.cls`, input[key])
          break

        case 'blockMod':
          set(output, `${entity.block}.${getModPath(entity)}`, input[key])
          break

        case 'elemMod':
          set(
            output,
            `${getElemPath(entity)}.${getModPath(entity)}`,
            input[key]
          )
          break
      }

      return output
    }, {})
}

export default convert
