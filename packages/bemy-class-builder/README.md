# Bemy-class-builder

Simple utility which allows you to use BEM class naming without painful copy-pasting these long names here and there.

## Usage

`bemy-class-builder` is supposed to be used alongside with `bemy-style-loader`, so don't hesitate to check its [docs](https://github.com/user1736/bem-css-modules/tree/master/packages/bemy-style-loader)

### Block classes

Define your component classes using BEM principles (to configure naming schema check out `bemy-style-loader` [docs](https://github.com/user1736/bem-css-modules/tree/master/packages/bemy-style-loader))

```css
.button {
  // base button styles
}

.button_disabled {
  // disabled button styles
}

.button_theme_danger {
  // danger button styles
}
```

and use it in your component file

```javascript
import styles from './styles.css'

// base block styles
const blockClassName = styles() // => 'button;

// block styles with modifiers
const collapsedBlockClassName = styles({ disabled: true }) // => 'button button_disabled'
const darkBlockStyles = styles({ theme: 'danger' }) // => 'button button_theme_danger'

// passing additional classes
const blockClassNameWithMixin = styles(null, 'foo') // => 'button foo'
const modifierAndMixinClassName = styles({ disabled: true, theme: 'danger' }, 'foo') // => 'button button_disabled button_theme_danger foo'
```

### Element classes

Element classes generation is similar to block with only one difference - you should call property corresponding to element name on the root style object.

```css
.header {
  // base header styles
}

.header__navigation {
  // navigation element styles
}

.header__navigation_collapsed {
  // collapsed navigation styles
}
```

```javascript
import styles from './styles.css'

const elemClassName = styles.navigation() // => 'header__navigation'
const elemAndAllAllAll = styles.navigation({ collapsed: true }, 'bar') // => 'header__navigation header__navigation_collapsed bar'
```

## Api

### styles(mods, mixins)

Generate block class names with specified mods and mixins

Parameter         | Type                          | Description                                       
------------------|-------------------------------|-----------------------------------------------------------------------------
`mods`            | `object`                      | Dictionary of modifiers to set                    
`mods[key]`       | `string`                      | Modifier name                                     
`mods[key][value]`| `string` / `boolean`          | Modifier value (modifiers with falsy values won't be included in the output)
`mixins`          | `string` / `array` / `object` | Mixin class in any format suitable for amazing yet simple `classnames` [lib](https://github.com/JedWatson/classnames)

### styles\[elemName\](elemMods, mixins)  

Generate element class names of given block with specified mods and mixins.

        

