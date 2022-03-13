import React from 'react'
import data from "../countries.json";
import { Asset } from 'expo-asset';
import { Image } from 'react-native';



function cacheImages() {
    return data.map(image => {
        if (typeof image.flag == 'string') {
          return Image.prefetch(`data:image/gif;base64,${image.flag}`);
        } else {
          return Asset.fromModule(image.flag).downloadAsync();
        }
      });
}

export default cacheImages