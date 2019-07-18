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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Commondity = (_temp2 = _class = function (_AtBase) {
  _inherits(Commondity, _AtBase);

  function Commondity() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Commondity);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Commondity.__proto__ || Object.getPrototypeOf(Commondity)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["loopArray8", "$compid__6", "commoditys", "isEditStatus", "changeNumMap", "hasCommodity", "showConfirm", "isNeedFixedBar", "isFixedBar", "isFetching", "editSkuData"], _this.customComponents = ["Modal"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Commondity, [{
    key: "_constructor",
    value: function _constructor() {
      _get(Commondity.prototype.__proto__ || Object.getPrototypeOf(Commondity.prototype), "_constructor", this).apply(this, arguments);
      this.state = {
        showConfirm: false,
        changeNumMap: {}
      };
      this.lastIsFixedBar = false;
      this.delSkuArr = [];
      this.$$refs = [];
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var commoditys = nextProps.commoditys,
          isFetching = nextProps.isFetching,
          editSkuData = nextProps.editSkuData,
          isFixedBar = nextProps.isFixedBar;
      var changeNumMap = this.state.changeNumMap;

      if (isFetching || editSkuData.showEidtBox) {
        return;
      }if (isFixedBar !== this.lastIsFixedBar) {
        this.lastIsFixedBar = isFixedBar;
        return;
      }
      commoditys.forEach(function (commodity) {
        commodity.skus.forEach(function (sku) {
          changeNumMap[sku.skuId] = sku.num;
        });
      });
      this.setState({ changeNumMap: changeNumMap });
    }
  }, {
    key: "hideDelPopup",
    value: function hideDelPopup() {
      this.setState({ showConfirm: false });
    }
  }, {
    key: "delCart",
    value: function delCart() {
      _index2.default.eventCenter.trigger('delCart', this.delSkuArr);
      this.setState({ showConfirm: false });
    }
  }, {
    key: "addCartNum",
    value: function addCartNum(sku) {
      if (sku.isOutOfStock) {
        return;
      }var changeNumMap = this.state.changeNumMap;

      var newNum = changeNumMap[sku.skuId] + 1;
      if (newNum > 200) {
        _index2.default.showToast({
          icon: 'none',
          title: '最多只能买200件'
        });
        newNum = 200;
      }
      this.setState({
        changeNumMap: _extends({}, changeNumMap, _defineProperty({}, sku.skuId, newNum))
      });
    }
  }, {
    key: "minusCartNum",
    value: function minusCartNum(sku) {
      if (sku.isOutOfStock) {
        return;
      }var changeNumMap = this.state.changeNumMap;

      var newNum = changeNumMap[sku.skuId] - 1;
      if (newNum > 0) {
        this.setState({
          changeNumMap: _extends({}, changeNumMap, _defineProperty({}, sku.skuId, newNum))
        });
      } else {
        this.setState({ showConfirm: true });
        this.delSkuArr = [{ skuId: sku.skuId }];
      }
    }
  }, {
    key: "getSkuAttr",
    value: function getSkuAttr(sku) {
      this.changeAllCartNum();
      _index2.default.eventCenter.trigger('onShowEditBox', sku);
    }
  }, {
    key: "checkOneCart",
    value: function checkOneCart(sku, e) {
      e.stopPropagation();
      var isEditStatus = this.props.isEditStatus;

      var skusArr = [{ skuId: sku.skuId }];
      // 下架商品不给操作
      if (!isEditStatus && sku.isOutOfStock) {
        return;
      }if (isEditStatus) {
        sku.checkDel ? _index2.default.eventCenter.trigger('onInverseCheckDelCart', skusArr) : _index2.default.eventCenter.trigger('onCheckDelCart', skusArr);
      } else {
        sku.isCheck ? _index2.default.eventCenter.trigger('onFetchInvertCheckCart', skusArr) : _index2.default.eventCenter.trigger('onFetchCheckCart', skusArr);
      }
    }
  }, {
    key: "checkShopCart",
    value: function checkShopCart(commodity) {
      var shop = commodity.shop,
          skus = commodity.skus;
      var isEditStatus = this.props.isEditStatus;

      var skusArr = [];
      if (isEditStatus) {
        skus.forEach(function (sku) {
          skusArr.push({ skuId: sku.skuId });
        });
        shop.checkDelAll ? _index2.default.eventCenter.trigger('onInverseCheckDelCart', skusArr) : _index2.default.eventCenter.trigger('onCheckDelCart', skusArr);
      } else {
        skus.forEach(function (sku) {
          if (!sku.isOutOfStock) {
            skusArr.push({ skuId: sku.skuId });
          }
        });
        shop.checkAll ? _index2.default.eventCenter.trigger('onFetchInvertCheckCart', skusArr) : _index2.default.eventCenter.trigger('onFetchCheckCart', skusArr);
      }
    }
  }, {
    key: "handleEditClick",
    value: function handleEditClick() {
      var isEditStatus = this.props.isEditStatus;

      var afterStatus = !isEditStatus;
      if (!afterStatus) {
        this.changeAllCartNum();
      }
      _index2.default.eventCenter.trigger('setState', { isEditStatus: afterStatus });
    }
  }, {
    key: "changeAllCartNum",
    value: function changeAllCartNum() {
      var commoditys = this.props.commoditys;
      var changeNumMap = this.state.changeNumMap;

      var skuArrs = [];
      commoditys.forEach(function (commodity) {
        commodity.skus.forEach(function (sku) {
          if (changeNumMap[sku.skuId] !== sku.num) {
            skuArrs.push({
              skuId: sku.skuId,
              num: changeNumMap[sku.skuId]
            });
          }
        });
      });
      skuArrs.length !== 0 && _index2.default.eventCenter.trigger('getChangeCartNum', skuArrs);
    }
  }, {
    key: "gotoDetail",
    value: function gotoDetail(skuId) {
      this.jumpUrl("../detail/index?skuid=" + skuId);
    }
  }, {
    key: "gotoShop",
    value: function gotoShop(venderId) {
      if (venderId === '8888' || venderId === 8888 || venderId === '') {
        return;
      }
      this.jumpUrl("../shop/index?venderId=" + venderId);
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      var $compid__6 = (0, _index.genCompid)(__prefix + "$compid__6");

      var _props = this.__props,
          isFixedBar = _props.isFixedBar,
          isEditStatus = _props.isEditStatus,
          commoditys = _props.commoditys;
      var _state = this.__state,
          showConfirm = _state.showConfirm,
          changeNumMap = _state.changeNumMap;

      var hasCommodity = commoditys.length !== 0;

      var isNeedFixedBar = isFixedBar && hasCommodity;
      var loopArray8 = commoditys.map(function (commodity, _anonIdx3) {
        commodity = {
          $original: (0, _index.internal_get_original)(commodity)
        };
        var $loopState__temp2 = (0, _index.internal_inline_style)(isEditStatus || commodity.$original.shop.showCheckAll ? 'visibility: visible' : 'visibility: hidden');
        return {
          $loopState__temp2: $loopState__temp2,
          $original: commodity.$original
        };
      });
      showConfirm && _index.propsManager.set({
        "title": "\u63D0\u793A",
        "contentText": "\u662F\u5426\u5220\u9664\u8BE5\u5546\u54C1",
        "onCancelCallback": this.hideDelPopup.bind(this),
        "onConfirmCallback": this.delCart.bind(this)
      }, $compid__6);
      Object.assign(this.__state, {
        loopArray8: loopArray8,
        $compid__6: $compid__6,
        commoditys: commoditys,
        isEditStatus: isEditStatus,
        hasCommodity: hasCommodity,
        isNeedFixedBar: isNeedFixedBar
      });
      return this.__state;
    }
  }]);

  return Commondity;
}(_base2.default), _class.$$events = ["gotoShop", "checkShopCart", "checkOneCart", "gotoDetail", "getSkuAttr", "minusCartNum", "addCartNum", "handleEditClick"], _class.$$componentPath = "components/cart/commodity/index", _temp2);


Commondity.defaultProps = {
  isEditStatus: false,
  commoditys: [],
  isFixedBar: false,
  isFetching: false,
  editSkuData: {
    showEidtBox: false
  }
};
exports.default = Commondity;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Commondity));