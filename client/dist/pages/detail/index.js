"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _base = require("../../bases/base.js");

var _base2 = _interopRequireDefault(_base);

var _index3 = require("../../utils/index.js");

var _index4 = require("../../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var bagImage = "/asset/bag.png";

var Detail = (_temp2 = _class = function (_AtBase) {
  _inherits(Detail, _AtBase);

  function Detail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Detail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Detail.__proto__ || Object.getPrototypeOf(Detail)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["sku", "isFirst", "isIpx", "detailInfoRow", "serviceInfo", "isShowCartLayer", "colorValue", "sizeValue", "bagImage", "cartNum", "systemInfo", "skuId", "areaId", "areasName", "showAddress", "showMore", "showColorValue", "showSizeValue"], _this.config = {
      navigationBarTitleText: '商品详情',
      enablePullDownRefresh: false,
      disableScroll: true
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Detail, [{
    key: "_constructor",
    value: function _constructor() {
      _get(Detail.prototype.__proto__ || Object.getPrototypeOf(Detail.prototype), "_constructor", this).apply(this, arguments);
      this.state = {
        detailInfoRow: [{
          name: 'desc',
          title: '商品描述',
          show: true,
          open: true
        }, {
          name: 'size',
          title: '尺寸说明',
          show: true,
          open: false
        }, {
          name: 'service',
          title: '服务说明',
          show: true,
          open: false
        }],
        isFirst: true,
        isShowCartLayer: false,
        systemInfo: {},
        skuId: '',
        areaId: '1-72-4137-0',
        areasName: '深圳市宝安区龙光世纪大厦',
        showAddress: false,
        isIpx: false,
        showMore: false,
        showColorValue: '',
        showSizeValue: '',
        sku: {
          colorInfo: {},
          sizeInfo: {}
        }
      };
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var params, systemInfo, skuId, _ref3, _ref4, skuData, cartData;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = this.$router.params;
                systemInfo = (0, _index3.getSystemInfo)();

                this.setState({
                  isFirst: false,
                  isIpx: systemInfo.isIpx,
                  systemInfo: systemInfo
                });
                skuId = params.skuId || params.skuid || '1';


                _index2.default.showNavigationBarLoading();
                _context.next = 7;
                return Promise.all([this.getSkuData(skuId), this.getCartData()]);

              case 7:
                _ref3 = _context.sent;
                _ref4 = _slicedToArray(_ref3, 2);
                skuData = _ref4[0];
                cartData = _ref4[1];

                // 成功调用
                if (this.successCode(skuData) && this.successCode(cartData)) {
                  this.setState({
                    sku: this.getDataContent(skuData),
                    cartNum: this.getDataContent(cartData).cartNum
                  });
                }
                _index2.default.hideNavigationBarLoading();

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentWillMount() {
        return _ref2.apply(this, arguments);
      }

      return componentWillMount;
    }()
  }, {
    key: "getSkuData",
    value: function getSkuData(skuId) {
      return _index2.default.cloud.callFunction({
        name: 'shop',
        data: {
          $url: 'getSku',
          data: skuId
        }
      });
    }
  }, {
    key: "getCartData",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _openId;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _index3.getOpenId)();

              case 2:
                _openId = _context2.sent;
                return _context2.abrupt("return", _index2.default.cloud.callFunction({
                  name: 'cart',
                  data: {
                    $url: 'getCart',
                    data: {
                      _id: _openId
                    }
                  }
                }));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getCartData() {
        return _ref5.apply(this, arguments);
      }

      return getCartData;
    }()
  }, {
    key: "toggleFold",
    value: function toggleFold(idx) {
      var detailInfoRow = this.state.detailInfoRow;

      detailInfoRow[idx].open = !detailInfoRow[idx].open;
      var newDetailInfoRow = detailInfoRow;
      this.setState({
        detailInfoRow: newDetailInfoRow
      });
    }
  }, {
    key: "toggleDetailLayer",
    value: function toggleDetailLayer() {
      this.setState(function (prevState) {
        return {
          isShowCartLayer: !prevState.isShowCartLayer
        };
      });
    }
  }, {
    key: "toggleShowMore",
    value: function toggleShowMore() {
      this.setState(function (prevState) {
        return {
          showMore: !prevState.showMore
        };
      });
    }

    // 跳转去购物车

  }, {
    key: "toCartTab",
    value: function toCartTab() {
      this.jumpUrl('/pages/cart/index');
    }
  }, {
    key: "gotoIndex",
    value: function gotoIndex() {
      this.jumpUrl('/pages/index/index');
    }
  }, {
    key: "connectService",
    value: function connectService() {
      _index2.default.makePhoneCall({
        phoneNumber: '0000000' //仅为示例，并非真实的电话号码
      });
    }
  }, {
    key: "changeAttr",
    value: function changeAttr(type, value) {
      if (type === 'color') {
        this.setState({ showColorValue: value });
      } else if (type === 'size') {
        this.setState({ showSizeValue: value });
      }
    }
  }, {
    key: "addToCart",
    value: function addToCart() {
      var _state = this.state,
          showColorValue = _state.showColorValue,
          showSizeValue = _state.showSizeValue,
          sku = _state.sku;

      var newSku = [{
        skuId: sku.skuId,
        num: 1,
        color: showColorValue || sku.colorInfo.value,
        size: showSizeValue || sku.sizeInfo.value
      }];

      this.addCart(newSku);
    }
  }, {
    key: "addCart",
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(skus) {
        var _this2 = this;

        var _openId;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _index3.getOpenId)();

              case 2:
                _openId = _context3.sent;

                _index2.default.showLoading();
                _context3.next = 6;
                return _index2.default.cloud.callFunction({
                  name: 'cart',
                  data: {
                    $url: 'editCart',
                    data: {
                      _id: _openId,
                      type: _index4.operate['ADD'],
                      skus: skus
                    }
                  }
                }).then(function (res) {
                  _index2.default.hideLoading();
                  _index2.default.showToast({
                    title: '添加购物车成功'
                  });
                  _this2.setState({
                    isShowCartLayer: false,
                    cartNum: _this2.getDataContent(res).cartNum
                  });
                });

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addCart(_x) {
        return _ref6.apply(this, arguments);
      }

      return addCart;
    }()
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _state2 = this.__state,
          isFirst = _state2.isFirst,
          isIpx = _state2.isIpx,
          detailInfoRow = _state2.detailInfoRow,
          isShowCartLayer = _state2.isShowCartLayer,
          serviceInfo = _state2.serviceInfo,
          showColorValue = _state2.showColorValue,
          showSizeValue = _state2.showSizeValue,
          sku = _state2.sku,
          cartNum = _state2.cartNum;
      var colorInfo = sku.colorInfo,
          sizeInfo = sku.sizeInfo;

      var colorValue = showColorValue || colorInfo.value;
      var sizeValue = showSizeValue || sizeInfo.value;

      Object.assign(this.__state, {
        serviceInfo: serviceInfo,
        colorValue: colorValue,
        sizeValue: sizeValue,
        bagImage: bagImage,
        cartNum: cartNum
      });
      return this.__state;
    }
  }]);

  return Detail;
}(_base2.default), _class.$$events = ["connectService", "gotoIndex", "toggleShowMore", "toggleFold", "gotoAfterSale", "toggleDetailLayer", "stopTouchMove", "selecteAddress", "changeAttr", "addToCart", "toCartTab"], _class.$$componentPath = "pages/detail/index", _temp2);
exports.default = Detail;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Detail, true));