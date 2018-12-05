# Bemy-style-loader

Webpack loader which allows to use `bemy-class-builder` in a nicer way. 

## Quick start

1. Install dependencies:
   ```
   npm i bemy-class-builder
   npm i -D bemy-style-loader
   ```
   
1. Put `bemy-style-loader` on top of your css loaders chain (_don't forget to enable css modules feature_)

    ```javascript
    {
      test: /.css$/,
      use: [
        {
          loader: 'bemy-style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: true 
          }
        }
      ]
    }
    ```
1. Enjoy :)
    ```javascript
    import styles from './styles.css'
    
    const myBlockClassName = styles()
    // Or
    const myElementClassName = styles.myFancyElementName()
    ```
    
## Options

Parameter         | Type     | Description                                                                       | Default
------------------|----------|-----------------------------------------------------------------------------------|----------------------------------------
`baseAppPath`     | `string` | Allows `bemy-class-builder` to notify you about misused styles                    |
`delims`          | `object` | Defines delimeters for elem and/or mods                                           |
`delims.elem`     | `string` | Separates element's name from block.                                              | `__`
`delims.mod`      | `string`, `{ name: string, val: string }` | Separates modifier from block or element.        | `_`
`delims.mod.name` | `string` | Separates a modifier name from a block or an element.                             | `_`
`delims.mod.val`  | `string` | Separates the value of a modifier from the modifier name.                         | `_`
`wordPattern`     | `string` | Defines which characters can be used in names of blocks, elements, and modifiers. | `[a-z0-9]+(?:-[a-z0-9]+)*`

Note: `delims` and `wordPattern` sections represent options for `bemNaming` which is used to parse class names, feel free to check their [docs](https://github.com/bem/bem-sdk/tree/master/packages/naming.entity#bemnaming-delims-elem-mod-wordpattern-) for actual settings and good examples.

## Have any troubles?

Bug reports and questions are welcomed [here](https://github.com/user1736/bem-css-modules/issues)