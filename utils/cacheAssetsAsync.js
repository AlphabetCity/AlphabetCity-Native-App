'use strict'
import { Image } from 'react-native'
import { Asset, Font } from 'expo'

// From https://github.com/EvanBacon/expo-three-text/
// by Evan Bacon
export default function cacheAssetsAsync({ files = [], fonts = [] }) {
  return Promise.all([...cacheFiles(files), ...cacheFonts(fonts)]).catch(e =>
    console.log('cacheError: ', e)
  )
}

function cacheFiles(files) {
  return files.map(file => {
    if (typeof file === 'string') {
      return Image.prefetch(file)
    } else {
      return Asset.fromModule(file).downloadAsync()
    }
  })
}

function cacheFonts(fonts) {
  return fonts.map((font, idx) => {
    console.log(`cache file ${idx} begun`)
    Font.loadAsync(font)
    console.log(`cache file ${idx} finished`)
  })
}
