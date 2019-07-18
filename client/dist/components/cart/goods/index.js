"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _base = require("../../../bases/base.js");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Goods = (_temp2 = _class = function (_AtBase) {
  _inherits(Goods, _AtBase);

  function Goods() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Goods);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Goods.__proto__ || Object.getPrototypeOf(Goods)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["hasNofootmark", "footmark", "showDiviner"], _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Goods, [{
    key: "_constructor",
    value: function _constructor() {
      _get(Goods.prototype.__proto__ || Object.getPrototypeOf(Goods.prototype), "_constructor", this).apply(this, arguments);
      this.state = {
        showDiviner: true
      };
      this.$$refs = [];
    }
  }, {
    key: "gotoDetail",
    value: function gotoDetail(skuId) {
      this.jumpUrl("/pages/detail/detail?skuId=" + skuId);
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var footmark = this.__props.footmark;

      var hasNofootmark = !footmark || footmark.length === 0;
      Object.assign(this.__state, {
        hasNofootmark: hasNofootmark,
        footmark: footmark
      });
      return this.__state;
    }
  }]);

  return Goods;
}(_base2.default), _class.$$events = ["gotoDetail"], _class.$$componentPath = "components/cart/goods/index", _temp2);
exports.default = Goods;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Goods));