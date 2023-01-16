import { Image } from 'react-native';

const localImagePath = new Map([
  ["noImage", require("../../assets/images/noImage.png")]
]);

const localImage: {[key:string]:string} = {};

for (const [key, value] of localImagePath) {
  localImage[key] = Image.resolveAssetSource(value).uri;
}

export default localImage;