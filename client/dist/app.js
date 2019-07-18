"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

require("./npm/@tarojs/async-await/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-next-line import/first


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

var _App = function (_BaseComponent) {
  _inherits(_App, _BaseComponent);

  function _App() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _App.__proto__ || Object.getPrototypeOf(_App)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      pages: ['pages/index/index', 'pages/cart/index', 'pages/order/list/index', 'pages/shop/index', 'pages/detail/index', 'pages/order/detail/index'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#ffffff',
        navigationBarTitleText: 'Taro商城',
        navigationBarTextStyle: 'black'
      },
      tabBar: {
        color: '#7b7b7a',
        selectedColor: '#c0a369',
        backgroundColor: '#222222',
        list: [{
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: 'asset/home.png',
          selectedIconPath: 'asset/home_active.png'
        }, {
          pagePath: 'pages/cart/index',
          text: '购物车',
          iconPath: 'asset/shoppingbag.png',
          selectedIconPath: 'asset/shoppingbag_active.png'
        }, {
          pagePath: 'pages/order/list/index',
          text: '订单',
          iconPath: 'asset/mine.png',
          selectedIconPath: 'asset/mine_active.png'
        }]
      },
      cloud: true,
      networkTimeout: {
        request: 6000,
        connectSocket: 10000,
        uploadFile: 10000,
        downloadFile: 10000
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      {
        _index2.default.cloud.init({
          env: 'env-8772f0', // 获取环境ID：前往 云开发控制台-设置-环境ID
          traceUser: true // 是否要捕捉每个用户的访问记录。设置为true，用户可在管理端看到用户访问记录
        });
      }
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "componentDidCatchError",
    value: function componentDidCatchError() {}

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数

  }, {
    key: "_createData",
    value: function _createData() {}
  }]);

  return _App;
}(_index.Component);

exports.default = _App;

App(require('./npm/@tarojs/taro-weapp/index.js').default.createApp(_App));
_index2.default.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});