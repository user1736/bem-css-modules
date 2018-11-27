import noop from 'lodash/noop'
import cn from 'classnames'
import convert from './convert'

const mapModifiers = (modifiers, entity) => {
  if (!entity.mod || !modifiers) {
    return null
  }

  if (typeof modifiers === 'object') {
    return Object.keys(modifiers).reduce((seed, mod) => {
      const entityMod = entity.mod[mod]
      if (!entityMod) {
        return seed
      }

      if (typeof entityMod === 'string') {
        return {
          ...seed,
          [entityMod]: modifiers[mod],
        }
      }

      const modValue = modifiers[mod]
      return {
        ...seed,
        [entityMod[modValue]]: true,
      }
    }, {})
  }
}

const createBuilder = (entity) => (modifiers, extraClasses) =>
  cn(entity.cls, mapModifiers(modifiers, entity), extraClasses)

const isProxySupported = typeof Proxy === 'function'
const proxyExceptionList = ['__esModule', 'default']
const createProxy = (obj, filePath) =>
  new Proxy(obj, {
    get(target, prop, receiver) {
      if (!target[prop] && !proxyExceptionList.includes(prop)) {
        /* eslint-disable no-console */
        console.error(`element "${prop}" is not defined in ${filePath}`)
        /* eslint-enable no-console */
        return noop
      }

      return Reflect.get(target, prop, receiver)
    },
  })

const index = (cssModule, options, filePath) => {
  const bemTree = convert(cssModule, options)
  const blocks = Object.keys(bemTree)
  if (!blocks || blocks.length === 0) {
    /* eslint-disable no-console */
    console.error(`${filePath} doesn't contain styles`)
    /* eslint-enable no-console */
    return null
  }

  if (blocks.length > 1) {
    /* eslint-disable no-console */
    console.warn(`${filePath} contains styles of more than one block`)
    /* eslint-enable no-console */
  }

  const block = bemTree[blocks[0]]
  const builder = createBuilder(block)
  Object.keys(block.elem || {}).forEach((elemName) => {
    builder[elemName] = createBuilder(block.elem[elemName])
  })

  builder._raw = cssModule

  return isProxySupported ? createProxy(builder, filePath) : builder
}

export default index
