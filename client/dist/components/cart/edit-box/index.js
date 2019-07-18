"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../npm/classnames/index.js");

var _index4 = _interopRequireDefault(_index3);

var _base = require("../../../bases/base.js");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditBox = (_temp2 = _class = function (_AtBase) {
  _inherits(EditBox, _AtBase);

  function EditBox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EditBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditBox.__proto__ || Object.getPrototypeOf(EditBox)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["colorInfo", "sizeInfo", "wpClass", "aniClass", "sku", "colorValue", "sizeValue", "showColorValue", "showSizeValue", "isClose", "editSkuData"], _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EditBox, [{
    key: "_constructor",
    value: function _constructor() {
      _get(EditBox.prototype.__proto__ || Object.getPrototypeOf(EditBox.prototype), "_constructor", this).apply(this, arguments);
      this.state = {
        showColorValue: '',
        showSizeValue: '',
        isClose: false
      };
      this.$$refs = [];
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd() {
      var isClose = this.state.isClose;

      if (isClose) {
        this.setState({ isClose: false });
        this.props.onHideEditBox();
      }
    }
  }, {
    key: "runCloseAni",
    value: function runCloseAni() {
      this.setState({ isClose: true });
    }
  }, {
    key: "selectAttr",
    value: function selectAttr(type, value) {
      if (type === 'color') {
        this.setState({ showColorValue: value });
      } else if (type === 'size') {
        this.setState({ showSizeValue: value });
      }
    }
  }, {
    key: "changeCartAttr",
    value: function changeCartAttr() {
      var editSkuData = this.props.editSkuData;
      var _state = this.state,
          showColorValue = _state.showColorValue,
          showSizeValue = _state.showSizeValue;
      var sku = editSkuData.sku;

      var newSku = [{
        skuId: sku.skuId,
        color: showColorValue || sku.colorInfo.value,
        size: showSizeValue || sku.sizeInfo.value
      }];

      this.runCloseAni();
      if (showColorValue || showSizeValue) {
        _index2.default.eventCenter.trigger('onFetchChangeAttr', newSku);
      }
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _state2 = this.__state,
          isClose = _state2.isClose,
          showColorValue = _state2.showColorValue,
          showSizeValue = _state2.showSizeValue;
      var editSkuData = this.__props.editSkuData;
      var showEidtBox = editSkuData.showEidtBox,
          sku = editSkuData.sku;

      var _ref2 = sku || {},
          colorInfo = _ref2.colorInfo,
          sizeInfo = _ref2.sizeInfo;

      var colorValue = showColorValue || colorInfo && colorInfo.value;
      var sizeValue = showSizeValue || sizeInfo && sizeInfo.value;
      var wpClass = (0, _index4.default)('editbox bg_shade', { show: showEidtBox }, { fade: isClose });
      var aniClass = (0, _index4.default)('editbox_content', { show_wp: !isClose && showEidtBox }, { hide_wp: isClose });
      Object.assign(this.__state, {
        colorInfo: colorInfo,
        sizeInfo: sizeInfo,
        wpClass: wpClass,
        aniClass: aniClass,
        sku: sku,
        colorValue: colorValue,
        sizeValue: sizeValue
      });
      return this.__state;
    }
  }]);

  return EditBox;
}(_base2.default), _class.$$events = ["onAnimationEnd", "runCloseAni", "selectAttr", "changeCartAttr"], _class.$$componentPath = "components/cart/edit-box/index", _temp2);


EditBox.defaultProps = {
  editSkuData: {
    showEidtBox: false
  }
};
exports.default = EditBox;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(EditBox));