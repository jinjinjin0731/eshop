"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/classnames/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../../utils/index.js");

var _data = require("./data.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cart = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Cart, _BaseComponent);

  function Cart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Cart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cart.__proto__ || Object.getPrototypeOf(Cart)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["$compid__1", "$compid__2", "$compid__3", "$compid__4", "cartClass", "showEidtBox", "isLogin", "isFixedBar", "__fn_on"], _this.config = {
      navigationBarTitleText: '购物车',
      backgroundColor: '#f2efef',
      disableScroll: true
    }, _this.customComponents = ["Commondity", "Goods", "EditBox", "BottomBar"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Cart, [{
    key: "_constructor",
    value: function _constructor() {
      _get(Cart.prototype.__proto__ || Object.getPrototypeOf(Cart.prototype), "_constructor", this).apply(this, arguments);
      this.state = _extends({
        isLogin: true,
        isFixedBar: false
      }, (0, _data.getInitialState)());

      this.scrollTop = 0;
      this.pageScrollFn = (0, _index5.throttle)(this.isNeedFixedBar, 200, this);
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      _index2.default.eventCenter.on('setState', this.setNewData.bind(this));
      _index2.default.eventCenter.on('getChangeCartNum', this.getChangeCartNum.bind(this));
      _index2.default.eventCenter.on('delCart', this.delCart.bind(this));
      _index2.default.eventCenter.on('onShowEditBox', this.onShowEditBox.bind(this));
      _index2.default.eventCenter.on('onInverseCheckDelCart', this.onInverseCheckDelCart.bind(this));
      _index2.default.eventCenter.on('onCheckDelCart', this.onCheckDelCart.bind(this));
      _index2.default.eventCenter.on('onFetchInvertCheckCart', this.onFetchInvertCheckCart.bind(this));
      _index2.default.eventCenter.on('onFetchCheckCart', this.onFetchCheckCart.bind(this));
      _index2.default.eventCenter.on('onFetchChangeAttr', this.onFetchChangeAttr.bind(this));
    }
  }, {
    key: "setNewData",
    value: function setNewData(data) {
      this.setState(_extends({}, data));
    }
  }, {
    key: "getChangeCartNum",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(skuArrs) {
        var newData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _data.editCart)(skuArrs, 'CHANGE_NUM');

              case 2:
                newData = _context.sent;

                this.setState(_extends({}, newData));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getChangeCartNum(_x) {
        return _ref2.apply(this, arguments);
      }

      return getChangeCartNum;
    }()
  }, {
    key: "delCart",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(skuArrs) {
        var newData;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _data.editCart)(skuArrs, 'DEL');

              case 2:
                newData = _context2.sent;

                this.setState(_extends({}, newData));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function delCart(_x2) {
        return _ref3.apply(this, arguments);
      }

      return delCart;
    }()
  }, {
    key: "onShowEditBox",
    value: function onShowEditBox(sku) {
      var editSkuData = this.state.editSkuData;

      var newEditSkuData = _extends({}, editSkuData, {
        sku: sku,
        showEidtBox: true
      });
      this.setState({ editSkuData: newEditSkuData });
    }
  }, {
    key: "onHideEditBox",
    value: function onHideEditBox() {
      var editSkuData = this.state.editSkuData;

      var newEditSkuData = _extends({}, editSkuData, {
        showEidtBox: false
      });
      console.log();
      this.setState({ editSkuData: newEditSkuData });
    }
  }, {
    key: "onInverseCheckDelCart",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(skusArr) {
        var newData;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _data.inverseCheckDelCart)(this.state.commoditys, skusArr, false);

              case 2:
                newData = _context3.sent;

                this.setState({
                  commoditys: newData.newCommoditys,
                  checkDelAll: newData.commoditysCheckDelAll
                });

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function onInverseCheckDelCart(_x3) {
        return _ref4.apply(this, arguments);
      }

      return onInverseCheckDelCart;
    }()
  }, {
    key: "onCheckDelCart",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(skusArr) {
        var newData;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (0, _data.inverseCheckDelCart)(this.state.commoditys, skusArr, true);

              case 2:
                newData = _context4.sent;

                this.setState({
                  commoditys: newData.newCommoditys,
                  checkDelAll: newData.commoditysCheckDelAll
                });

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function onCheckDelCart(_x4) {
        return _ref5.apply(this, arguments);
      }

      return onCheckDelCart;
    }()
  }, {
    key: "onFetchInvertCheckCart",
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(skusArr) {
        var newData;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return (0, _data.editCart)(skusArr, 'INVERT_CHECK');

              case 2:
                newData = _context5.sent;

                this.setState(_extends({}, newData));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function onFetchInvertCheckCart(_x5) {
        return _ref6.apply(this, arguments);
      }

      return onFetchInvertCheckCart;
    }()
  }, {
    key: "onFetchCheckCart",
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(skusArr) {
        var newData;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                console.log(skusArr);
                _context6.next = 3;
                return (0, _data.editCart)(skusArr, 'CHECK');

              case 3:
                newData = _context6.sent;

                this.setState(_extends({}, newData));

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function onFetchCheckCart(_x6) {
        return _ref7.apply(this, arguments);
      }

      return onFetchCheckCart;
    }()
  }, {
    key: "onFetchChangeAttr",
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(skusArr) {
        var newData;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return (0, _data.editCart)(skusArr, 'CHANGE_ATTR');

              case 2:
                newData = _context7.sent;

                this.setState(_extends({}, newData));

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function onFetchChangeAttr(_x7) {
        return _ref8.apply(this, arguments);
      }

      return onFetchChangeAttr;
    }()
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentDidShow",
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var newData;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return (0, _data.getCartData)();

              case 2:
                newData = _context8.sent;

                this.setState(_extends({}, newData));

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function componentDidShow() {
        return _ref9.apply(this, arguments);
      }

      return componentDidShow;
    }()
  }, {
    key: "onViewScroll",
    value: function onViewScroll(e) {
      this.pageScrollFn && this.pageScrollFn(e.detail.scrollTop);
    }
  }, {
    key: "isNeedFixedBar",
    value: function isNeedFixedBar(top) {
      var isFixedBar = this.state.isFixedBar;

      this.scrollTop = top;
      var needTop = 45;
      if (top > needTop) {
        !isFixedBar && this.setState({ isFixedBar: true });
      } else {
        isFixedBar && this.setState({ isFixedBar: false });
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
      var $compid__1 = (0, _index.genCompid)(__prefix + "$compid__1");
      var $compid__2 = (0, _index.genCompid)(__prefix + "$compid__2");
      var $compid__3 = (0, _index.genCompid)(__prefix + "$compid__3");
      var $compid__4 = (0, _index.genCompid)(__prefix + "$compid__4");

      var _state = this.__state,
          isLogin = _state.isLogin,
          isFixedBar = _state.isFixedBar,
          editSkuData = _state.editSkuData,
          commoditys = _state.commoditys,
          isFetching = _state.isFetching,
          isEditStatus = _state.isEditStatus,
          checkCartNum = _state.checkCartNum,
          totalPrice = _state.totalPrice,
          checkAll = _state.checkAll,
          checkDelAll = _state.checkDelAll,
          isSub = _state.isSub;

      var showEidtBox = editSkuData.showEidtBox;
      var hasCommodity = commoditys.length !== 0;

      var cartClass = (0, _index4.default)('cart-scroll', {
        no_bottom: !hasCommodity && !isLogin
      });

      _index.propsManager.set({
        "isFixedBar": isFixedBar,
        "isEditStatus": isEditStatus,
        "commoditys": commoditys,
        "isFetching": isFetching,
        "editSkuData": editSkuData
      }, $compid__1);
      _index.propsManager.set({
        "footmark": editSkuData.footmark
      }, $compid__2);
      showEidtBox && _index.propsManager.set({
        "onHideEditBox": this.onHideEditBox.bind(this),
        "editSkuData": editSkuData
      }, $compid__3);
      _index.propsManager.set({
        "isLogin": isLogin,
        "isSub": isSub,
        "isEditStatus": isEditStatus,
        "checkCartNum": checkCartNum,
        "totalPrice": totalPrice,
        "checkAll": checkAll,
        "checkDelAll": checkDelAll,
        "commoditys": commoditys
      }, $compid__4);
      Object.assign(this.__state, {
        $compid__1: $compid__1,
        $compid__2: $compid__2,
        $compid__3: $compid__3,
        $compid__4: $compid__4,
        cartClass: cartClass,
        showEidtBox: showEidtBox
      });
      return this.__state;
    }
  }]);

  return Cart;
}(_index.Component), _class.$$events = ["onViewScroll"], _class.$$componentPath = "pages/cart/index", _temp2);
exports.default = Cart;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Cart, true));