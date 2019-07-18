"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/classnames/index.js");

var _index4 = _interopRequireDefault(_index3);

var _base = require("../../bases/base.js");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var searchIcon = "/asset/ic_search.png";

var DEFAULT_PLACEHOLDER = '探索你的精致生活';

var SearchInto = (_temp2 = _class = function (_AtBase) {
  _inherits(SearchInto, _AtBase);

  function SearchInto() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SearchInto);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SearchInto.__proto__ || Object.getPrototypeOf(SearchInto)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["_cls", "searchIcon", "placeholder", "cls"], _this.config = {
      navigationBarTitleText: '搜索'
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SearchInto, [{
    key: "_constructor",
    value: function _constructor() {
      _get(SearchInto.prototype.__proto__ || Object.getPrototypeOf(SearchInto.prototype), "_constructor", this).apply(this, arguments);
      this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _props = this.__props,
          placeholder = _props.placeholder,
          cls = _props.cls;


      var _cls = (0, _index4.default)('search-into', cls);
      Object.assign(this.__state, {
        _cls: _cls,
        searchIcon: searchIcon,
        placeholder: placeholder
      });
      return this.__state;
    }
  }]);

  return SearchInto;
}(_base2.default), _class.$$events = [], _class.$$componentPath = "components/search-into/index", _temp2);


SearchInto.defaultProps = {
  placeholder: DEFAULT_PLACEHOLDER
};
exports.default = SearchInto;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(SearchInto));