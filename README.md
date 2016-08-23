# Selfie.js
Selfie with Java Script

## Install
__bower__
```sh
$ bower install selfie.js
```

## How to use
```html
<!-- add selfie.js -->
<script src="path/to/selfie.min.js"></script>
```

```js
let s = selfie.init(options);
s.takePhoto(); // method to take photo.
s.removePhoto(); // method to remove photo.
```

## Options (Optional)
- `option` - __(Object)__
  - `target` - __(Object)__ It shoud be 'Node Element'. Its default value is `document.body`.
  - `fileName` - __(String)__ Set file's name. Default is 'selfie' and file extension is png.
  - `downloadLinkText` - __(String)__ Set download link's text. Default is 'DOWNLOAD'.
  - `camera` - __(Object)__ It is 'Video Element' for displaying camera.
    - `id` - __(String)__ If you want to add id to node element display camera, Specify it.
    - `className` - __(String)__ If you want to add class to node element display camera, Specify it.
  - `store` - __(Object)__ It is 'Canvas Element' for save selfie temporarily.
    - `id` - __(String)__ If you want to add id to node element save selfie, Specify it.
    - `className` - __(String)__ If you want to add class to node element save selfie, Specify it.
  - `photo` - __(Object)__ It is 'Image Element' for displaying selfie taken.
    - `id` - __(String)__ If you want to add id to node element display selfie, Specify it.
    - `className` - __(String)__ If you want to add class to node element display selfie, Specify it.
  - `download` - __(Object)__ It is 'Anchor Element' for download selfie. It has 'download' attributes.
    - `id` - __(String)__ If you want to add id to node element download selfie, Specify it.
    - `className` - __(String)__ If you want to add class to node element download selfie, Specify it.

## Example
```js
// Set options. It is not necessary.
let options = {
  target: document.getElementById('selfie-wrapper'),
  fileName: 'selfie',
  downloadLinkText: 'Click',
  camera: {
    id: 'selfie-camera',
    className: 'selfie-camera'
  },
  store: {
    id: 'selfie-store',
    className: 'selfie-store'
  },
  photo: {
    id: 'selfie-image',
    className: 'selfie-image'
  },
  download: {
    id: 'selfie-download',
    className: 'selfie-download'
  }
};

// Initialize
let s = selfie.init(options);

// take photo
document.querySelector('SELFIE_SHUTTER_BUTTON').onclick = s.takePhoto();

// remove photo
document.querySelector('REMOVE_SELFIE').onclick = s.removePhoto();
```

## Licence
MIT

