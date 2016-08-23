/**
 *
 * title    : Selfie.js
 *
 * version  : 1.1.0
 *
 * author   : wonism
 *
 * license  : MIT
 *
 * homepage : https://jaewonism.cf
 *
 * github   : https://www.github.com/wonism
 *
 */
;((() => {
  const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  let _selfie;
  const selfie = {
    init(options = { }) {
      return _selfie || new Selfie(options);
    },
    author: 'wonism',
    version: '1.0.0'
  };

  class Selfie {
    constructor(options) {
      _selfie = this;

      _selfie.options = options;
      _selfie.camera = document.createElement('video');
      _selfie.store = document.createElement('canvas');
      _selfie.photo = document.createElement('img');
      _selfie.download = document.createElement('a');

      options.camera && options.camera.id && _selfie.camera.setAttribute('id', options.camera.id);
      options.store && options.store.id && _selfie.store.setAttribute('id', options.store.id);
      options.photo && options.photo.id && _selfie.photo.setAttribute('id', options.photo.id);
      options.download && options.download.id && _selfie.download.setAttribute('id', options.download.id);

      _selfie.download.setAttribute('download', `${options.fileName || 'selfie'}.png`);
      _selfie.download.insertAdjacentHTML('beforeend', options.downloadLinkText || 'DOWNLOAD');

      _selfie.setup();
    }

    isNode(node) {
      if (node && node.nodeType) {
        return node;
      } else {
        return null;
      }
    }

    activeNode(node, componentName, active) {
      const component = _selfie.options[componentName];
      let className = component && component.class ? component.class : '';

      if (active) {
        className += (className && component.activeClass ? (` ${component.activeClass}`) : ' __selfie-active');
      } else {
        className += (className && component.unactiveClass ? (` ${component.unactiveClass}`) : ' __selfie-unactive');
      }

      node.setAttribute('class', className);
    }

    setup() {
      const options = _selfie.options;
      const target = _selfie.isNode(options.target) || document.body;

      target.appendChild(_selfie.camera);
      target.appendChild(_selfie.store);
      target.appendChild(_selfie.photo);
      target.appendChild(_selfie.download);

      if (!getUserMedia) {
        throw new Error('This browser is not support user media.');
      } else {
        getUserMedia.call(navigator, {
            video: true
          },
          stream => {
            if (window.URL) {
              _selfie.camera.src = window.URL.createObjectURL(stream);
            } else {
              _selfie.camera.src = stream;
            }

            _selfie.camera.onplay = () => {
              _selfie.display();
            };

            _selfie.camera.play();
          },
          err => {
            throw err;
          }
        );
      }
    }

    display() {
      _selfie.activeNode(_selfie.camera, 'camera', true);
      _selfie.activeNode(_selfie.store, 'store', false);
      _selfie.activeNode(_selfie.photo, 'photo', false);
      _selfie.activeNode(_selfie.download, 'download', false);

      _selfie.updateUI();
    }

    updateUI() {
      const activeNodes = document.querySelectorAll('.__selfie-active'), unactiveNodes = document.querySelectorAll('.__selfie-unactive');

      Array.prototype.forEach.call(activeNodes, node => {
        node.setAttribute('style', 'display: none;');
        node.setAttribute('style', node.getAttribute('style').replace(/display\s?\:\s*none\;/gi, ''));
      });

      Array.prototype.forEach.call(unactiveNodes, node => {
        node.setAttribute('style', 'display: none;');
      });
    }

    takePhoto() {
      const ctx = _selfie.store.getContext('2d');
      const width = _selfie.camera.videoWidth;
      const height = _selfie.camera.videoHeight;
      let snap = '';

      if (width && height) {
        _selfie.store.width = width;
        _selfie.store.height = height;

        ctx.drawImage(_selfie.camera, 0, 0, width, height);

        snap = _selfie.store.toDataURL('image/png');

        _selfie.photo.setAttribute('src', snap);
        _selfie.download.setAttribute('href', snap);

        _selfie.activeNode(_selfie.photo, 'photo', true);
        _selfie.activeNode(_selfie.download, 'download', true);

        _selfie.updateUI();

        return true;
      } else {
        return false;
      }
    }

    removePhoto() {
      _selfie.photo.setAttribute('src', '');
      _selfie.download.setAttribute('href', '');

      _selfie.activeNode(_selfie.photo, 'photo', false);
      _selfie.activeNode(_selfie.download, 'download', false);

      _selfie.updateUI();

      return true;
    }
  }

  window.selfie = selfie;
}))();

