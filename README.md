# Selfie.js
Selfie with Java Script

## Install
__bower__
```sh
$ bower install selfie.js
```

__npm__
```sh
$ bower install selfie.js
```

## How to use
```html
<!-- add selfie.js -->
<script src="path/to/selfie.min.js"></script>
```

```js
const s = selfie.init(options);
s.takePhoto(); // method to take photo.
s.removePhoto(); // method to remove photo.
```

## Options (Everything is optional. Not necessary)
- `option` - __(Object)__
  - `target` - __(Object)__ It shoud be 'Node Element'. Its default value is `document.body`.
  - `fileName` - __(String)__ Set file's name. Default is 'selfie' and file extension is png.
  - `downloadLinkText` - __(String)__ Set download link's text. Default is 'DOWNLOAD'.
  - `camera` - __(Object)__ It is 'Video Element' for displaying camera.
    - `id` - __(String)__ If you want to add ID to this node element, Specify it.
    - `class` - __(String)__ If you want to add class to this node element, Specify it.
    - `activeClass` - __(String)__ If you want to add class to node element when it is activated, Specify it.
    - `unactiveClass` - __(String)__ If you want to add class to node element when it is unactivated, Specify it.
  - `store` - __(Object)__ It is 'Canvas Element' for save selfie temporarily.
    - `id` - __(String)__ If you want to add ID to this node element, Specify it.
    - `class` - __(String)__ If you want to add class to this node element, Specify it.
    - `activeClass` - __(String)__ If you want to add class to node element when it is activated, Specify it.
    - `unactiveClass` - __(String)__ If you want to add class to node element when it is unactivated, Specify it.
  - `photo` - __(Object)__ It is 'Image Element' for displaying selfie taken.
    - `id` - __(String)__ If you want to add ID to this node element, Specify it.
    - `class` - __(String)__ If you want to add class to this node element, Specify it.
    - `activeClass` - __(String)__ If you want to add class to node element when it is activated, Specify it.
    - `unactiveClass` - __(String)__ If you want to add class to node element when it is unactivated, Specify it.
  - `download` - __(Object)__ It is 'Anchor Element' for download selfie. It has 'download' attributes.
    - `id` - __(String)__ If you want to add ID to this node element, Specify it.
    - `class` - __(String)__ If you want to add class to this node element, Specify it.
    - `activeClass` - __(String)__ If you want to add class to node element when it is activated, Specify it.
    - `unactiveClass` - __(String)__ If you want to add class to node element when it is unactivated, Specify it.

## Example
```js
// Set options. It is not necessary.
const options = {
  target: document.getElementById('selfie-wrapper'),
  fileName: 'selfie',
  downloadLinkText: 'Click',
  camera: {
    id: 'selfie-camera',
    activeClass: 'active',
    unactiveClass: 'none',
    class: 'selfie-camera'
  },
  store: {
    id: 'selfie-store',
    activeClass: 'active',
    unactiveClass: 'none',
    class: 'selfie-store'
  },
  photo: {
    id: 'selfie-image',
    activeClass: 'active',
    unactiveClass: 'none',
    class: 'selfie-image'
  },
  download: {
    id: 'selfie-download',
    activeClass: 'active',
    unactiveClass: 'none',
    class: 'selfie-download'
  }
};

// Initialize
const s = selfie.init(options);

// take photo
document.querySelector('SELFIE_SHUTTER_BUTTON').onclick = s.takePhoto;

// remove photo
document.querySelector('REMOVE_SELFIE').onclick = s.removePhoto;
```

## Licence
MIT

