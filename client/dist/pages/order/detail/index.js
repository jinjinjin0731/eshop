"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrderDetail = (_temp2 = _class = function (_BaseComponent) {
  _inherits(OrderDetail, _BaseComponent);

  function OrderDetail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, OrderDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OrderDetail.__proto__ || Object.getPrototypeOf(OrderDetail)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["showTip", "payCommodities", "allPrice", "aniShowPayWay", "showPayWay", "paymentType", "payNum", "isShowUserAuth", "freightPrice", "totalPrice", "isNeedBanlance"], _this.config = {
      navigationBarTitleText: '确认订单',
      disableScroll: true
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(OrderDetail, [{
    key: "_constructor",
    value: function _constructor() {
      _get(OrderDetail.prototype.__proto__ || Object.getPrototypeOf(OrderDetail.prototype), "_constructor", this).apply(this, arguments);
      this.currentScrollTop = 0;
      this.state = {
        showTip: true,
        showPayWay: false,
        aniShowPayWay: false,
        paymentType: 4
      };
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.firstIn = true;
    }
  }, {
    key: "componentDidShow",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _openId, res;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _index2.default.showLoading({ title: '加载中...' });
                _context.next = 3;
                return (0, _index3.getOpenId)();

              case 3:
                _openId = _context.sent;
                _context.next = 6;
                return _index2.default.cloud.callFunction({
                  name: 'order',
                  data: {
                    $url: 'getBalance',
                    data: {
                      _id: _openId
                    }
                  }
                });

              case 6:
                res = _context.sent;

                console.log(res);
                _index2.default.hideLoading();

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidShow() {
        return _ref2.apply(this, arguments);
      }

      return componentDidShow;
    }()
  }, {
    key: "onPageScroll",
    value: function onPageScroll(e) {
      if (!e.scrollTop && !this.state.reachTop) {
        this.setState({
          reachTop: true
        });
        return;
      }
      if (this.state.reachTop) {
        this.setState({
          reachTop: false
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(nextProps) {
      var isNeedBanlance = nextProps.isNeedBanlance;

      if (!isNeedBanlance) {
        this.backToCart();
      }
    }
  }, {
    key: "backToCart",
    value: function backToCart() {
      this.jumpUrl('/pages/cart/index');
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd() {
      if (!this.state.showPayWay) {
        this.setState({
          aniShowPayWay: false
        });
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

      var _state = this.__state,
          paymentType = _state.paymentType,
          showTip = _state.showTip,
          aniShowPayWay = _state.aniShowPayWay,
          showPayWay = _state.showPayWay,
          isShowUserAuth = _state.isShowUserAuth,
          freightPrice = _state.freightPrice,
          totalPrice = _state.totalPrice,
          payNum = _state.payNum,
          allPrice = _state.allPrice;
      var _state$payCommoditie = this.__state.payCommodities,
          payCommodities = _state$payCommoditie === undefined ? [] : _state$payCommoditie;

      payCommodities = payCommodities.map(function (item) {
        var price = 0;
        var totalNum = 0;
        var newSkus = item.skus.map(function (skuItem) {
          totalNum += parseInt(skuItem.num);
          price += totalNum * parseInt(skuItem.main.price);
          if (!/http:\/\/|https:\/\//.test(skuItem.main.images[0])) {
            skuItem.imgUrl = "https://" + skuItem.main.images[0];
          } else {
            skuItem.imgUrl = skuItem.main.images[0];
          }
          return skuItem;
        });
        item.skus = newSkus;
        item.totalNum = totalNum;
        item.totalPrice = (0, _index3.parseMoney)(price);
        return item;
      });
      Object.assign(this.__state, {
        payCommodities: payCommodities,
        allPrice: allPrice,
        payNum: payNum,
        isShowUserAuth: isShowUserAuth,
        freightPrice: freightPrice,
        totalPrice: totalPrice
      });
      return this.__state;
    }
  }]);

  return OrderDetail;
}(_index.Component), _class.$$events = ["closeTip", "showPayWayBox", "onAnimationEnd", "closePayWay", "checkPayWay", "submitOrder", "showUserAuthModal"], _class.$$componentPath = "pages/order/detail/index", _temp2);
exports.default = OrderDetail;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(OrderDetail, true));