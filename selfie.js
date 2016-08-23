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
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function () {
  var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  var _selfie = void 0;
  var selfie = {
    init: function init() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return _selfie || new Selfie(options);
    },

    author: 'wonism',
    version: '1.0.0'
  };

  var Selfie = function () {
    function Selfie(options) {
      _classCallCheck(this, Selfie);

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

      _selfie.download.setAttribute('download', (options.fileName || 'selfie') + '.png');
      _selfie.download.insertAdjacentHTML('beforeend', options.downloadLinkText || 'DOWNLOAD');

      _selfie.setup();
    }

    _createClass(Selfie, [{
      key: 'isNode',
      value: function isNode(node) {
        if (node && node.nodeType) {
          return node;
        } else {
          return null;
        }
      }
    }, {
      key: 'activeNode',
      value: function activeNode(node, componentName, active) {
        var component = _selfie.options[componentName];
        var className = component && component.class ? component.class : '';

        if (active) {
          className += className && component.activeClass ? ' ' + component.activeClass : ' __selfie-active';
        } else {
          className += className && component.unactiveClass ? ' ' + component.unactiveClass : ' __selfie-unactive';
        }

        node.setAttribute('class', className);
      }
    }, {
      key: 'setup',
      value: function setup() {
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
          }, function (stream) {
            if (window.URL) {
              _selfie.camera.src = window.URL.createObjectURL(stream);
            } else {
              _selfie.camera.src = stream;
            }

            _selfie.camera.onplay = function () {
              _selfie.display();
            };

            _selfie.camera.play();
          }, function (err) {
            throw err;
          });
        }
      }
    }, {
      key: 'display',
      value: function display() {
        _selfie.activeNode(_selfie.camera, 'camera', true);
        _selfie.activeNode(_selfie.store, 'store', false);
        _selfie.activeNode(_selfie.photo, 'photo', false);
        _selfie.activeNode(_selfie.download, 'download', false);

        _selfie.updateUI();
      }
    }, {
      key: 'updateUI',
      value: function updateUI() {
        var activeNodes = document.querySelectorAll('.__selfie-active'),
            unactiveNodes = document.querySelectorAll('.__selfie-unactive');

        Array.prototype.forEach.call(activeNodes, function (node) {
          node.setAttribute('style', 'display: none;');
          node.setAttribute('style', node.getAttribute('style').replace(/display\s?\:\s*none\;/gi, ''));
        });

        Array.prototype.forEach.call(unactiveNodes, function (node) {
          node.setAttribute('style', 'display: none;');
        });
      }
    }, {
      key: 'takePhoto',
      value: function takePhoto() {
        var ctx = _selfie.store.getContext('2d');
        var width = _selfie.camera.videoWidth;
        var height = _selfie.camera.videoHeight;
        var snap = '';

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
    }, {
      key: 'removePhoto',
      value: function removePhoto() {
        _selfie.photo.setAttribute('src', '');
        _selfie.download.setAttribute('href', '');

        _selfie.activeNode(_selfie.photo, 'photo', false);
        _selfie.activeNode(_selfie.download, 'download', false);

        _selfie.updateUI();

        return true;
      }
    }]);

    return Selfie;
  }();

  window.selfie = selfie;
})();
//# sourceMappingURL=data:application/json;base64,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QWlCLFlBQWpCLENBQThCLE1BQTlCLEVBQXNDLElBQXRDOztBQUVBLGtCQUFRLFVBQVIsQ0FBbUIsUUFBUSxLQUEzQixFQUFrQyxPQUFsQyxFQUEyQyxJQUEzQztBQUNBLGtCQUFRLFVBQVIsQ0FBbUIsUUFBUSxRQUEzQixFQUFxQyxVQUFyQyxFQUFpRCxJQUFqRDs7QUFFQSxrQkFBUSxRQUFSOztBQUVBLGlCQUFPLElBQVA7QUFDRCxTQWpCRCxNQWlCTztBQUNMLGlCQUFPLEtBQVA7QUFDRDtBQUNGO0FBeklJO0FBQUE7QUFBQSxvQ0EySVM7QUFDWixnQkFBUSxLQUFSLENBQWMsWUFBZCxDQUEyQixLQUEzQixFQUFrQyxFQUFsQztBQUNBLGdCQUFRLFFBQVIsQ0FBaUIsWUFBakIsQ0FBOEIsTUFBOUIsRUFBc0MsRUFBdEM7O0FBRUEsZ0JBQVEsVUFBUixDQUFtQixRQUFRLEtBQTNCLEVBQWtDLE9BQWxDLEVBQTJDLEtBQTNDO0FBQ0EsZ0JBQVEsVUFBUixDQUFtQixRQUFRLFFBQTNCLEVBQXFDLFVBQXJDLEVBQWlELEtBQWpEOztBQUVBLGdCQUFRLFFBQVI7O0FBRUEsZUFBTyxJQUFQO0FBQ0Q7QUFySkk7O0FBQUE7QUFBQTs7QUF3SlAsU0FBTyxNQUFQLEdBQWdCLE1BQWhCO0FBQ0QsQ0F6SkEiLCJmaWxlIjoic2VsZmllLmpzIiwic291cmNlc0NvbnRlbnQiOlsiOygoKCkgPT4ge1xuICBjb25zdCBnZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3IubXNHZXRVc2VyTWVkaWE7XG5cbiAgbGV0IF9zZWxmaWU7XG4gIGNvbnN0IHNlbGZpZSA9IHtcbiAgICBpbml0KG9wdGlvbnMgPSB7IH0pIHtcbiAgICAgIHJldHVybiBfc2VsZmllIHx8IG5ldyBTZWxmaWUob3B0aW9ucyk7XG4gICAgfSxcbiAgICBhdXRob3I6ICd3b25pc20nLFxuICAgIHZlcnNpb246ICcxLjAuMCdcbiAgfTtcblxuICBjbGFzcyBTZWxmaWUge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgIF9zZWxmaWUgPSB0aGlzO1xuXG4gICAgICBfc2VsZmllLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgX3NlbGZpZS5jYW1lcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgX3NlbGZpZS5zdG9yZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgX3NlbGZpZS5waG90byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgX3NlbGZpZS5kb3dubG9hZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgICAgb3B0aW9ucy5jYW1lcmEgJiYgb3B0aW9ucy5jYW1lcmEuaWQgJiYgX3NlbGZpZS5jYW1lcmEuc2V0QXR0cmlidXRlKCdpZCcsIG9wdGlvbnMuY2FtZXJhLmlkKTtcbiAgICAgIG9wdGlvbnMuc3RvcmUgJiYgb3B0aW9ucy5zdG9yZS5pZCAmJiBfc2VsZmllLnN0b3JlLnNldEF0dHJpYnV0ZSgnaWQnLCBvcHRpb25zLnN0b3JlLmlkKTtcbiAgICAgIG9wdGlvbnMucGhvdG8gJiYgb3B0aW9ucy5waG90by5pZCAmJiBfc2VsZmllLnBob3RvLnNldEF0dHJpYnV0ZSgnaWQnLCBvcHRpb25zLnBob3RvLmlkKTtcbiAgICAgIG9wdGlvbnMuZG93bmxvYWQgJiYgb3B0aW9ucy5kb3dubG9hZC5pZCAmJiBfc2VsZmllLmRvd25sb2FkLnNldEF0dHJpYnV0ZSgnaWQnLCBvcHRpb25zLmRvd25sb2FkLmlkKTtcblxuICAgICAgX3NlbGZpZS5kb3dubG9hZC5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgYCR7b3B0aW9ucy5maWxlTmFtZSB8fCAnc2VsZmllJ30ucG5nYCk7XG4gICAgICBfc2VsZmllLmRvd25sb2FkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgb3B0aW9ucy5kb3dubG9hZExpbmtUZXh0IHx8ICdET1dOTE9BRCcpO1xuXG4gICAgICBfc2VsZmllLnNldHVwKCk7XG4gICAgfVxuXG4gICAgaXNOb2RlKG5vZGUpIHtcbiAgICAgIGlmIChub2RlICYmIG5vZGUubm9kZVR5cGUpIHtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhY3RpdmVOb2RlKG5vZGUsIGNvbXBvbmVudE5hbWUsIGFjdGl2ZSkge1xuICAgICAgY29uc3QgY29tcG9uZW50ID0gX3NlbGZpZS5vcHRpb25zW2NvbXBvbmVudE5hbWVdO1xuICAgICAgbGV0IGNsYXNzTmFtZSA9IGNvbXBvbmVudCAmJiBjb21wb25lbnQuY2xhc3MgPyBjb21wb25lbnQuY2xhc3MgOiAnJztcblxuICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICBjbGFzc05hbWUgKz0gKGNsYXNzTmFtZSAmJiBjb21wb25lbnQuYWN0aXZlQ2xhc3MgPyAoYCAke2NvbXBvbmVudC5hY3RpdmVDbGFzc31gKSA6ICcgX19zZWxmaWUtYWN0aXZlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGFzc05hbWUgKz0gKGNsYXNzTmFtZSAmJiBjb21wb25lbnQudW5hY3RpdmVDbGFzcyA/IChgICR7Y29tcG9uZW50LnVuYWN0aXZlQ2xhc3N9YCkgOiAnIF9fc2VsZmllLXVuYWN0aXZlJyk7XG4gICAgICB9XG5cbiAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgc2V0dXAoKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0gX3NlbGZpZS5vcHRpb25zO1xuICAgICAgY29uc3QgdGFyZ2V0ID0gX3NlbGZpZS5pc05vZGUob3B0aW9ucy50YXJnZXQpIHx8IGRvY3VtZW50LmJvZHk7XG5cbiAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChfc2VsZmllLmNhbWVyYSk7XG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoX3NlbGZpZS5zdG9yZSk7XG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoX3NlbGZpZS5waG90byk7XG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoX3NlbGZpZS5kb3dubG9hZCk7XG5cbiAgICAgIGlmICghZ2V0VXNlck1lZGlhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBicm93c2VyIGlzIG5vdCBzdXBwb3J0IHVzZXIgbWVkaWEuJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnZXRVc2VyTWVkaWEuY2FsbChuYXZpZ2F0b3IsIHtcbiAgICAgICAgICAgIHZpZGVvOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdHJlYW0gPT4ge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5VUkwpIHtcbiAgICAgICAgICAgICAgX3NlbGZpZS5jYW1lcmEuc3JjID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF9zZWxmaWUuY2FtZXJhLnNyYyA9IHN0cmVhbTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX3NlbGZpZS5jYW1lcmEub25wbGF5ID0gKCkgPT4ge1xuICAgICAgICAgICAgICBfc2VsZmllLmRpc3BsYXkoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIF9zZWxmaWUuY2FtZXJhLnBsYXkoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRpc3BsYXkoKSB7XG4gICAgICBfc2VsZmllLmFjdGl2ZU5vZGUoX3NlbGZpZS5jYW1lcmEsICdjYW1lcmEnLCB0cnVlKTtcbiAgICAgIF9zZWxmaWUuYWN0aXZlTm9kZShfc2VsZmllLnN0b3JlLCAnc3RvcmUnLCBmYWxzZSk7XG4gICAgICBfc2VsZmllLmFjdGl2ZU5vZGUoX3NlbGZpZS5waG90bywgJ3Bob3RvJywgZmFsc2UpO1xuICAgICAgX3NlbGZpZS5hY3RpdmVOb2RlKF9zZWxmaWUuZG93bmxvYWQsICdkb3dubG9hZCcsIGZhbHNlKTtcblxuICAgICAgX3NlbGZpZS51cGRhdGVVSSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVVJKCkge1xuICAgICAgY29uc3QgYWN0aXZlTm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuX19zZWxmaWUtYWN0aXZlJyksIHVuYWN0aXZlTm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuX19zZWxmaWUtdW5hY3RpdmUnKTtcblxuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhY3RpdmVOb2Rlcywgbm9kZSA9PiB7XG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBub25lOycpO1xuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBub2RlLmdldEF0dHJpYnV0ZSgnc3R5bGUnKS5yZXBsYWNlKC9kaXNwbGF5XFxzP1xcOlxccypub25lXFw7L2dpLCAnJykpO1xuICAgICAgfSk7XG5cbiAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwodW5hY3RpdmVOb2Rlcywgbm9kZSA9PiB7XG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBub25lOycpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGFrZVBob3RvKCkge1xuICAgICAgY29uc3QgY3R4ID0gX3NlbGZpZS5zdG9yZS5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgY29uc3Qgd2lkdGggPSBfc2VsZmllLmNhbWVyYS52aWRlb1dpZHRoO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gX3NlbGZpZS5jYW1lcmEudmlkZW9IZWlnaHQ7XG4gICAgICBsZXQgc25hcCA9ICcnO1xuXG4gICAgICBpZiAod2lkdGggJiYgaGVpZ2h0KSB7XG4gICAgICAgIF9zZWxmaWUuc3RvcmUud2lkdGggPSB3aWR0aDtcbiAgICAgICAgX3NlbGZpZS5zdG9yZS5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZShfc2VsZmllLmNhbWVyYSwgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgc25hcCA9IF9zZWxmaWUuc3RvcmUudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcblxuICAgICAgICBfc2VsZmllLnBob3RvLnNldEF0dHJpYnV0ZSgnc3JjJywgc25hcCk7XG4gICAgICAgIF9zZWxmaWUuZG93bmxvYWQuc2V0QXR0cmlidXRlKCdocmVmJywgc25hcCk7XG5cbiAgICAgICAgX3NlbGZpZS5hY3RpdmVOb2RlKF9zZWxmaWUucGhvdG8sICdwaG90bycsIHRydWUpO1xuICAgICAgICBfc2VsZmllLmFjdGl2ZU5vZGUoX3NlbGZpZS5kb3dubG9hZCwgJ2Rvd25sb2FkJywgdHJ1ZSk7XG5cbiAgICAgICAgX3NlbGZpZS51cGRhdGVVSSgpO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVBob3RvKCkge1xuICAgICAgX3NlbGZpZS5waG90by5zZXRBdHRyaWJ1dGUoJ3NyYycsICcnKTtcbiAgICAgIF9zZWxmaWUuZG93bmxvYWQuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xuXG4gICAgICBfc2VsZmllLmFjdGl2ZU5vZGUoX3NlbGZpZS5waG90bywgJ3Bob3RvJywgZmFsc2UpO1xuICAgICAgX3NlbGZpZS5hY3RpdmVOb2RlKF9zZWxmaWUuZG93bmxvYWQsICdkb3dubG9hZCcsIGZhbHNlKTtcblxuICAgICAgX3NlbGZpZS51cGRhdGVVSSgpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICB3aW5kb3cuc2VsZmllID0gc2VsZmllO1xufSkpKCk7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
