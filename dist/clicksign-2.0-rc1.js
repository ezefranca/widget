// Generated by CoffeeScript 1.8.0
(function() {
  var ENDPOINT, HEIGHT, STYLE, WIDTH, Widget, create, params, window;

  ENDPOINT = 'https://widget.clicksign.com';

  WIDTH = 800;

  HEIGHT = 600;

  STYLE = 'border: 1px solid #777; border-radius: 3px;';

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
      var _results;
      _results = [];
      for (k in options) {
        v = options[k];
        _results.push([k, encodeURIComponent(v)].join('='));
      }
      return _results;
    })()).join('&');
  };

  Widget = function(container, key, options) {
    var fn;
    fn = (function(_this) {
      return function() {
        var cb, _i, _len, _ref, _results;
        _ref = _this.callbacks;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cb = _ref[_i];
          _results.push(cb.apply(null, arguments));
        }
        return _results;
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
    this.iframe.setAttribute('src', (options.endpoint || ENDPOINT) + '/' + key + '?' + params(options.signer));
    this.iframe.setAttribute('width', options.width || WIDTH);
    this.iframe.setAttribute('height', options.height || HEIGHT);
    this.iframe.setAttribute('style', options.style || STYLE);
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
    version: '2.0-rc1'
  };

}).call(this);
