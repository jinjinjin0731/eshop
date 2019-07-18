"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Modal, _BaseComponent);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["title", "contentText", "cancelText", "confirmText"], _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Modal, [{
    key: "_constructor",
    value: function _constructor() {
      _get(Modal.prototype.__proto__ || Object.getPrototypeOf(Modal.prototype), "_constructor", this).apply(this, arguments);
      this.state = {};
      this.$$refs = [];
    }
  }, {
    key: "onConfirmClick",
    value: function onConfirmClick() {
      this.props.onConfirmCallback();
    }
  }, {
    key: "onCancelClick",
    value: function onCancelClick() {
      this.props.onCancelCallback();
    }
  }, {
    key: "onAuthConfirmClick",
    value: function onAuthConfirmClick(e) {
      this.props.onConfirmCallback(e.detail);
    }
  }, {
    key: "preventTouchMove",
    value: function preventTouchMove(e) {
      e.stopPropagation();
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
          title = _props.title,
          contentText = _props.contentText,
          cancelText = _props.cancelText,
          confirmText = _props.confirmText;

      Object.assign(this.__state, {
        title: title,
        contentText: contentText,
        cancelText: cancelText,
        confirmText: confirmText
      });
      return this.__state;
    }
  }]);

  return Modal;
}(_index.Component), _class.$$events = ["preventTouchMove", "onCancelClick", "onConfirmClick"], _class.$$componentPath = "components/modal/index", _temp2);


Modal.defaultProps = {
  title: '',
  contentText: '',
  cancelText: '取消',
  confirmText: '确定',
  onCancelCallback: function onCancelCallback() {},
  onConfirmCallback: function onConfirmCallback() {}
};

exports.default = Modal;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Modal));