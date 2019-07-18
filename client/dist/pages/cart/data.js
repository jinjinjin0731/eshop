"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inverseCheckDelCart = exports.editCart = exports.getCartData = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getCartData = exports.getCartData = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _openId, res;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _index4.getOpenId)();

          case 2:
            _openId = _context.sent;
            _context.next = 5;
            return _index2.default.cloud.callFunction({
              name: 'cart',
              data: {
                $url: 'getCart',
                data: {
                  _id: _openId
                }
              }
            });

          case 5:
            res = _context.sent;
            return _context.abrupt("return", handleCartData(res.result.data));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getCartData() {
    return _ref.apply(this, arguments);
  };
}();

var editCart = exports.editCart = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(skus, oper) {
    var _openId, res;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _index4.getOpenId)();

          case 2:
            _openId = _context2.sent;
            _context2.next = 5;
            return _index2.default.cloud.callFunction({
              name: 'cart',
              data: {
                $url: 'editCart',
                data: {
                  _id: _openId,
                  type: _index3.operate[oper],
                  skus: skus
                }
              }
            });

          case 5:
            res = _context2.sent;
            return _context2.abrupt("return", handleCartData(res.result.data));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function editCart(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var inverseCheckDelCart = exports.inverseCheckDelCart = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(commoditys, delSkus, boolean) {
    var commoditysCheckDelAll, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, commodity, shop, skus, checkDelAll, newSkus, newCommoditys;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commoditysCheckDelAll = true;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 4;

            for (_iterator = commoditys[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              commodity = _step.value;
              shop = commodity.shop, skus = commodity.skus;
              checkDelAll = true;
              newSkus = skus.map(function (sku) {
                var isChoose = delSkus.filter(function (delSku) {
                  return delSku.skuId === sku.skuId;
                }).length !== 0;
                // 是否处于删除态
                if (isChoose) {
                  sku = _extends({}, sku, {
                    checkDel: boolean
                  });
                }
                if (!sku.checkDel) checkDelAll = false;
                return sku;
              });

              commodity.skus = newSkus;
              shop.checkDelAll = checkDelAll;
              if (!shop.checkDelAll) commoditysCheckDelAll = false;
            }
            // 返回新的数组
            _context3.next = 12;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context3.t0;

          case 12:
            _context3.prev = 12;
            _context3.prev = 13;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 15:
            _context3.prev = 15;

            if (!_didIteratorError) {
              _context3.next = 18;
              break;
            }

            throw _iteratorError;

          case 18:
            return _context3.finish(15);

          case 19:
            return _context3.finish(12);

          case 20:
            newCommoditys = commoditys.map(function (commodity) {
              return _extends({}, commodity);
            });
            return _context3.abrupt("return", { newCommoditys: newCommoditys, commoditysCheckDelAll: commoditysCheckDelAll });

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[4, 8, 12, 20], [13,, 15, 19]]);
  }));

  return function inverseCheckDelCart(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

// 将拿到的数据进行处理


exports.getInitialState = getInitialState;
exports.handleCartData = handleCartData;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../constants/index.js");

var _index4 = require("../../utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function getInitialState() {
  return {
    commoditys: [],
    offSales: [],
    editSkuData: {
      showEidtBox: false
    },
    diviner: [],
    footmark: [],
    couponData: {
      showCouponList: false
    },
    checkCartNum: 0,
    totalPrice: 0,
    checkAll: false,
    checkDelAll: false,
    isEditStatus: false,
    isFetching: false,
    isSub: false
  };
}

function handleCartData(data) {
  if (!data || !data.cartInfo) {
    return {
      commoditys: [],
      offSales: [],
      checkCartNum: 0,
      totalPrice: 0,
      checkAll: false
    };
  }

  var commoditysObj = {};
  var commoditys = [];
  var offSales = [];
  var checkCartNum = 0;
  var totalPrice = 0;
  var checkAll = data.cartNum !== 0;

  var cartInfo = data.cartInfo,
      shopMap = data.shopMap;

  var realShopMap = shopMap[0];

  // 结算总价格
  totalPrice = (0, _index4.parseMoney)(data.totalPrice);

  for (var venderId in realShopMap) {
    // 整理店铺的信息
    var toplifeShop = {
      fullLogoUri: 'https://img11.360buyimg.com/ling/jfs/t24292/40/1063566259/5338/454eb23d/5b4f2575N485ac2d0.jpg',
      logoUri: '/ling/jfs/t24292/40/1063566259/5338/454eb23d/5b4f2575N485ac2d0.jpg',
      title: 'TARO',
      venderId: ''
    };
    var shopObj = realShopMap[venderId] || toplifeShop;
    // 店铺是否全选
    shopObj.checkAll = true;
    // 店铺是否显示全选这个标题，有无货商品时不显示
    shopObj.showCheckAll = false;
    // 店铺是否全选删除
    shopObj.checkDelAll = false;

    var commodityObj = {};
    commodityObj.shop = shopObj;
    commodityObj.skus = [];

    commoditysObj[venderId] = commodityObj;
  }

  //   console.log(cartInfo, 'cartInfo')
  //   console.log(commoditysObj, 'commoditysObj')
  // 整理商品的信息
  cartInfo.forEach(function (item) {
    var venderId = item.venderId;
    var skusObj = commoditysObj[venderId].skus;
    var shopObj = commoditysObj[venderId].shop;

    // 显示全选
    shopObj.showCheckAll = true;

    var obj = {};
    obj.skuId = item.skuId;
    obj.num = item.num;
    obj.main = item.info;
    obj.isCheck = item.isCheck;
    obj.colorInfo = item.info.colorInfo;
    obj.sizeInfo = item.info.sizeInfo;
    // 商品是否选中删除
    obj.checkDel = false;

    // 增加商品数量
    obj.isCheck && (checkCartNum += obj.num);

    // 商品是否无货
    obj.isOutOfStock = false;

    // 是否全选
    if (!obj.isCheck) shopObj.checkAll = false;

    if (!shopObj.checkAll) checkAll = false;

    skusObj.push(obj);
  });

  checkCartNum > 99 && (checkCartNum = '99+');

  commoditys = Object.values(commoditysObj);

  return {
    commoditys: commoditys,
    offSales: offSales,
    checkCartNum: checkCartNum,
    totalPrice: totalPrice,
    checkAll: checkAll
  };
}