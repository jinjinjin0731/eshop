'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../npm/@tarojs/taro-weapp/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PAGE_LEVEL_LIMIT = 10;

var AtBase = function (_Component) {
  _inherits(AtBase, _Component);

  function AtBase() {
    _classCallCheck(this, AtBase);

    return _possibleConstructorReturn(this, (AtBase.__proto__ || Object.getPrototypeOf(AtBase)).apply(this, arguments));
  }

  _createClass(AtBase, [{
    key: 'jumpUrl',
    value: function jumpUrl(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var pages = _index2.default.getCurrentPages();
      var method = options.method || 'navigateTo';

      var tabList = ['pages/index/index', 'pages/cart/index', 'pages/order/list/index'];

      if (url && typeof url === 'string') {
        if (tabList.findIndex(function (x) {
          return '/' + x == url;
        }) != -1) {
          method = 'switchTab';
        }

        if (method == 'navigateTo' && pages.length == PAGE_LEVEL_LIMIT) {
          method = 'redirectTo';
        }

        _index2.default[method]({
          url: url
        });
      }
    }
  }, {
    key: 'queryStringToJson',
    value: function queryStringToJson(queryString) {
      if (queryString.indexOf('?') > -1) {
        queryString = queryString.split('?')[1];
      }
      var pairs = queryString.split('&');
      var result = {};
      pairs.forEach(function (pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
      });
      return result;
    }
  }, {
    key: 'successCode',
    value: function successCode(res) {
      return res.result.code === 0;
    }
  }, {
    key: 'getDataContent',
    value: function getDataContent(res) {
      return res.result.data;
    }
  }]);

  return AtBase;
}(_index.Component);

exports.default = AtBase;