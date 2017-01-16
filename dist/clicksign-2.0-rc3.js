// Generated by CoffeeScript 1.12.2
(function() {
  var DEFAULT_VERSION, ENDPOINT, HEIGHT, STYLE, WIDTH, Widget, create, params, window;

  ENDPOINT = 'https://widget.clicksign.com';

  WIDTH = '100%';

  HEIGHT = '85vh';

  STYLE = 'border: 1px solid #777; border-radius: 3px;';

  DEFAULT_VERSION = '1';

  window = this;

  params = function(data) {
    var k, options, v;
    if (data == null) {
      data = {};
    }
    options = {};
    for (k in data) {
      v = data[k];
      options[k] = v;
    }
    options.origin = window.location.protocol + '//' + window.location.host;
    return ((function() {
      var results;
      results = [];
      for (k in options) {
        v = options[k];
        results.push([k, encodeURIComponent(v)].join('='));
      }
      return results;
    })()).join('&');
  };

  Widget = function(container, key, options) {
    var _src, fn;
    fn = (function(_this) {
      return function() {
        var cb, i, len, ref, results;
        ref = _this.callbacks;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          cb = ref[i];
          results.push(cb.apply(null, arguments));
        }
        return results;
      };
    })(this);
    this.destroy = function() {
      this.container.removeChild(this.iframe);
      if (window.removeEventListener) {
        return window.removeEventListener('message', fn);
      } else {
        return window.detachEvent('onmessage', fn);
      }
    };
    this.key = key;
    this.callbacks = options.callbacks || [];
    this.container = window.document.getElementById(container);
    this.iframe = window.document.createElement('iframe');
    _src = (options.endpoint || ENDPOINT) + '/' + key + '?' + params(options.signer) + '&v=' + (options.version || DEFAULT_VERSION);
    if (options.main_color) {
      _src += '&color1=' + options.main_color.replace(/#/, '%23');
    }
    if (options.header_color) {
      _src += '&color2=' + options.header_color.replace(/#/, '%23');
    }
    this.iframe.setAttribute('src', _src);
    this.iframe.setAttribute('style', options.style || STYLE);
    this.iframe.style.width = options.width || WIDTH;
    this.iframe.style.height = options.height || HEIGHT;
    if (window.addEventListener) {
      window.addEventListener('message', fn);
    } else {
      window.attachEvent('onmessage', fn);
    }
    this.container.appendChild(this.iframe);
    return this;
  };

  create = function(container, key, options) {
    if (options == null) {
      options = {};
    }
    return new Widget(container, key, options);
  };

  window.clicksign = {
    create: create,
    version: '2.0-rc3'
  };

}).call(this);
