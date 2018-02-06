export default function arrayFromObject(object) {
  let images = [];
  Object.keys(object).map(key => {
    let item = object[key];

    if (typeof item === 'object') {
      console.log('isObj')
      images = images.concat(arrayFromObject(item));
    } else {
      images.push(item);
    }
  });
  return images;
}
