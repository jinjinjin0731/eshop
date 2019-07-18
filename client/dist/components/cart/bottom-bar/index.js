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

var _index5 = require("../../../utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BottomBar = (_temp2 = _class = function (_AtBase) {
  _inherits(BottomBar, _AtBase);

  function BottomBar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BottomBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BottomBar.__proto__ || Object.getPrototypeOf(BottomBar)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "$compid__9", "bottomClass", "isEditStatus", "checkDelAll", "hasDelCart", "checkAll", "checkCartNum", "showConfirm", "totalPrice", "delNum", "commoditys", "isLogin", "isSub"], _this.customComponents = ["Modal"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BottomBar, [{
    key: "_constructor",
    value: function _constructor() {
      _get(BottomBar.prototype.__proto__ || Object.getPrototypeOf(BottomBar.prototype), "_constructor", this).apply(this, arguments);
      this.state = {
        showConfirm: false,
        delNum: 0
      };
      this.delSkusArr = [];
      this.$$refs = [];
    }
  }, {
    key: "checkAllCart",
    value: function checkAllCart() {
      var _props = this.props,
          isEditStatus = _props.isEditStatus,
          commoditys = _props.commoditys,
          checkAll = _props.checkAll,
          checkDelAll = _props.checkDelAll;

      var skusArr = [];
      commoditys.forEach(function (commodity) {
        commodity.skus.forEach(function (sku) {
          skusArr.push({ skuId: sku.skuId });
        });
      });
      if (skusArr.length === 0) {
        return;
      }if (isEditStatus) {
        checkDelAll ? _index2.default.eventCenter.trigger('onInverseCheckDelCart', skusArr) : _index2.default.eventCenter.trigger('onCheckDelCart', skusArr);
      } else {
        checkAll ? _index2.default.eventCenter.trigger('onFetchInvertCheckCart', skusArr) : _index2.default.eventCenter.trigger('onFetchCheckCart', skusArr);
      }
    }
  }, {
    key: "onHideDelPopup",
    value: function onHideDelPopup() {
      this.setState({ showConfirm: false });
    }
  }, {
    key: "delCart",
    value: function delCart() {
      _index2.default.eventCenter.trigger('delCart', this.delSkusArr);
      this.setState({ showConfirm: false });
      _index2.default.eventCenter.trigger('setState', { isEditStatus: false });
    }
  }, {
    key: "handleDelbtn",
    value: function handleDelbtn(hasDelCart) {
      var _this2 = this;

      if (!hasDelCart) {
        return;
      }var commoditys = this.props.commoditys;

      var delNum = 0;
      this.delSkusArr = [];
      commoditys.forEach(function (commodity) {
        commodity.skus.forEach(function (sku) {
          if (sku.checkDel) {
            delNum++;
            _this2.delSkusArr.push({ skuId: sku.skuId });
          }
        });
      });
      this.setState({
        showConfirm: true,
        delNum: delNum
      });
    }
  }, {
    key: "booleanDelCart",
    value: function booleanDelCart() {
      var _props$commoditys = this.props.commoditys,
          commoditys = _props$commoditys === undefined ? [] : _props$commoditys;

      var hasDelCart = false;
      for (var i = 0; i < commoditys.length; i++) {
        var commodity = commoditys[i];
        for (var j = 0; j < commodity.skus.length; j++) {
          var sku = commodity.skus[j];
          if (sku.checkDel) {
            hasDelCart = true;
            break;
          }
        }
        if (hasDelCart) {
          break;
        }
      }
      return hasDelCart;
    }
  }, {
    key: "gotoBalance",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this3 = this;

        var checkCartNum, _openId;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                checkCartNum = this.props.checkCartNum;

                if (!(checkCartNum <= 0)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                _index2.default.showLoading({ title: '提交中...' });
                _context.next = 6;
                return (0, _index5.getOpenId)();

              case 6:
                _openId = _context.sent;

                _index2.default.cloud.callFunction({
                  name: 'order',
                  data: {
                    func: 'addOrder',
                    data: {
                      _id: _openId,
                      freightPrice: 14,
                      payType: 4
                    }
                  }
                }).then(function () {
                  _index2.default.hideLoading();
                  _this3.jumpUrl('/pages/order/list/index');
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function gotoBalance() {
        return _ref2.apply(this, arguments);
      }

      return gotoBalance;
    }()
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      var $compid__9 = (0, _index.genCompid)(__prefix + "$compid__9");

      var _props2 = this.__props,
          isLogin = _props2.isLogin,
          isSub = _props2.isSub,
          isEditStatus = _props2.isEditStatus,
          checkCartNum = _props2.checkCartNum,
          totalPrice = _props2.totalPrice,
          checkAll = _props2.checkAll,
          checkDelAll = _props2.checkDelAll,
          commoditys = _props2.commoditys;


      var hasCommodity = commoditys.length !== 0;

      var _state = this.__state,
          showConfirm = _state.showConfirm,
          delNum = _state.delNum;

      var hasDelCart = this.booleanDelCart();
      var bottomClass = (0, _index4.default)('bottom_bar_wp', {
        hide: !hasCommodity && !isLogin
      });
      var anonymousState__temp = (0, _index.internal_inline_style)(isSub ? 'margin-bottom: 0' : '');
      var anonymousState__temp2 = showConfirm ? "\u662F\u5426\u5220\u9664\u8FD9" + delNum + "\u79CD\u5546\u54C1" : null;
      showConfirm && _index.propsManager.set({
        "title": "\u63D0\u793A",
        "contentText": anonymousState__temp2,
        "onCancelCallback": this.onHideDelPopup.bind(this),
        "onConfirmCallback": this.delCart.bind(this)
      }, $compid__9);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        $compid__9: $compid__9,
        bottomClass: bottomClass,
        isEditStatus: isEditStatus,
        checkDelAll: checkDelAll,
        hasDelCart: hasDelCart,
        checkAll: checkAll,
        checkCartNum: checkCartNum,
        totalPrice: totalPrice
      });
      return this.__state;
    }
  }]);

  return BottomBar;
}(_base2.default), _class.$$events = ["checkAllCart", "handleDelbtn", "gotoBalance"], _class.$$componentPath = "components/cart/bottom-bar/index", _temp2);


BottomBar.defaultProps = {
  isLogin: true,
  isSub: false,
  isEditStatus: false,
  checkCartNum: 0,
  totalPrice: 0,
  checkAll: false,
  checkDelAll: false,
  commoditys: []
};
exports.default = BottomBar;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(BottomBar));