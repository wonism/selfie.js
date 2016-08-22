;(function () {
  var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  var _selfie;
  var selfie = {
    init: function (options) {
      options = options || {};

      return _selfie || new Selfie(options);
    },
    author: 'wonism'
  };

  function Selfie(options) {
    _selfie = this;

    _selfie.options = options;
    _selfie.camera = document.createElement((options.camera && options.camera.tag) || 'video');
    _selfie.store = document.createElement((options.store && options.store.tag) || 'canvas');
    _selfie.photo = document.createElement('img');
    _selfie.download = document.createElement('a');

    _selfie.download.setAttribute('download', 'selfie.png');
    _selfie.download.insertAdjacentHTML('beforeend', 'DOWNLOAD');

    _selfie.setup();
  }

  Selfie.prototype.isNode = function (node) {
    if (node && node.nodeType) {
      return node;
    } else {
      return null;
    }
  };

  Selfie.prototype.activeNode = function (node, componentName, active) {
    var component = _selfie.options[componentName],
        className = component && component.class ? component.class : '';

    if (active) {
      className += (className && component.activeClass ? (' ' + component.activeClass) : ' __selfie-active');
    } else {
      className += (className && component.unactiveClass ? (' ' + component.unactiveClass) : ' __selfie-unactive');
    }

    node.setAttribute('class', className);
  };

  Selfie.prototype.setup = function () {
    var options = _selfie.options;
    var target = _selfie.isNode(options.target) || document.body;

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
        function (stream) {
          if (window.URL) {
            _selfie.camera.src = window.URL.createObjectURL(stream);
          } else {
            _selfie.camera.src = stream;
          }

          _selfie.camera.onplay = function () {
            _selfie.display();
          };

          _selfie.camera.play();
        },
        function (err) {
          throw err;
        }
      );
    }
  };

  Selfie.prototype.display = function () {
    _selfie.activeNode(_selfie.camera, 'camera', true);
    _selfie.activeNode(_selfie.store, 'store', false);
    _selfie.activeNode(_selfie.photo, 'photo', false);
    _selfie.activeNode(_selfie.download, 'download', false);

    _selfie.updateUI();
  };

  Selfie.prototype.updateUI = function () {
    var activeNodes = document.querySelectorAll('.__selfie-active'),
        unactiveNodes = document.querySelectorAll('.__selfie-unactive');

    Array.prototype.forEach.call(activeNodes, function (node) {
      node.setAttribute('style', 'display: none;');
      node.setAttribute('style', node.getAttribute('style').replace(/display\s?\:\s*none\;/gi, ''));
    });

    Array.prototype.forEach.call(unactiveNodes, function (node) {
      node.setAttribute('style', 'display: none;');
    });
  };

  Selfie.prototype.takePhoto = function () {
    var ctx = _selfie.store.getContext('2d'),
        width = _selfie.camera.videoWidth,
        height = _selfie.camera.videoHeight,
        snap = '';

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
  };

  Selfie.prototype.removePhoto = function () {
    _selfie.photo.setAttribute('src', '');
    _selfie.download.setAttribute('href', '');

    _selfie.activeNode(_selfie.photo, 'photo', false);
    _selfie.activeNode(_selfie.download, 'download', false);

    _selfie.updateUI();

    return true;
  };

  window.selfie = selfie;
})();
