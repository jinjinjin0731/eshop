"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _base = require("../../../bases/base.js");

var _base2 = _interopRequireDefault(_base);

var _index3 = require("../../../utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var orderLoading = "/asset/order_loading.gif";
var icSearchTips = "/asset/ic_search_tips.png";

var OrderList = (_temp2 = _class = function (_AtBase) {
  _inherits(OrderList, _AtBase);

  function OrderList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, OrderList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OrderList.__proto__ || Object.getPrototypeOf(OrderList)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["orderList", "icSearchTips", "isFirst", "orderLoading"], _this.config = {
      navigationBarTitleText: '订单中心',
      enablePullDownRefresh: true,
      backgroundTextStyle: 'dark'
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(OrderList, [{
    key: "_constructor",
    value: function _constructor() {
      _get(OrderList.prototype.__proto__ || Object.getPrototypeOf(OrderList.prototype), "_constructor", this).apply(this, arguments);
      this.state = {
        isFirst: true,
        orderList: []
      };
      this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      this.initFetchData();
    }
  }, {
    key: "initFetchData",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var _openId;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _index2.default.showLoading({ title: '加载中...' });
                _context.next = 3;
                return (0, _index3.getOpenId)();

              case 3:
                _openId = _context.sent;

                _index2.default.cloud.callFunction({
                  name: 'order',
                  data: {
                    func: 'getOrder',
                    data: {
                      _id: _openId
                    }
                  }
                }).then(function (res) {
                  _index2.default.hideLoading();
                  _this2.handleOrderData(res.result.data);
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initFetchData() {
        return _ref2.apply(this, arguments);
      }

      return initFetchData;
    }()
  }, {
    key: "handleOrderData",
    value: function handleOrderData(data) {
      var newOrderList = data.map(function (item) {
        var venderId = item.skuInfoList[0].venderId;
        var newItem = _extends({}, item);
        newItem.shopInfo = _extends({}, newItem.shopInfo[venderId]);
        var totalGoodsCount = 0;
        var isMulti = false;
        newItem.skuInfoList.forEach(function (sku) {
          totalGoodsCount += sku.num;
        });
        if (newItem.skuInfoList.length > 1) {
          isMulti = true;
          newItem.skuInfoList.splice(2);
        } else {
          newItem.skuItem = newItem.skuInfoList[0];
        }
        newItem.isMulti = isMulti;
        newItem.totalGoodsCount = totalGoodsCount;
        newItem.statusClassName = 'orders_item_status';
        if (newItem.orderState === -1) {
          newItem.orderStateStr = '已取消订单';
          newItem.statusClassName = 'orders_item_status cancel';
        } else if (newItem.orderState === 1) {
          newItem.orderStateStr = '待支付';
          newItem.statusClassName = 'orders_item_status pay';
        }
        newItem.shouldPayPrice = (0, _index3.parseMoney)(newItem.shouldPayPrice);
        return newItem;
      });

      this.setState({ orderList: newOrderList });
    }
  }, {
    key: "payOrder",
    value: function payOrder() {
      _index2.default.showToast({
        title: '你触发了去支付',
        duration: 2000
      });
    }
  }, {
    key: "onPullDownRefresh",
    value: function onPullDownRefresh() {
      this.initFetchData();
      _index2.default.stopPullDownRefresh();
    }
  }, {
    key: "gotoBrand",
    value: function gotoBrand(venderId) {
      if (venderId) {
        this.jumpUrl("/pages/shop/index?venderId=" + venderId);
      }
    }
  }, {
    key: "gotoHome",
    value: function gotoHome() {
      this.jumpUrl("/pages/index/index");
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
          isFirst = _state.isFirst,
          orderList = _state.orderList;

      Object.assign(this.__state, {
        icSearchTips: icSearchTips,
        orderLoading: orderLoading
      });
      return this.__state;
    }
  }]);

  return OrderList;
}(_base2.default), _class.$$events = ["gotoBrand", "payOrder", "gotoHome"], _class.$$componentPath = "pages/order/list/index", _temp2);
exports.default = OrderList;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(OrderList, true));