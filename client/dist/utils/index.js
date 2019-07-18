'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOpenId = undefined;

var getOpenId = exports.getOpenId = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var openId, res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            openId = void 0;

            try {
              openId = _index2.default.getStorageSync('taro_demo_openid');
            } catch (error) {
              // TODO:
              console.log(error);
            }

            if (!openId) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', openId);

          case 6:
            _context.next = 8;
            return _index2.default.cloud.callFunction({
              name: 'user',
              data: {
                $url: 'getOpenId'
              }
            });

          case 8:
            res = _context.sent;

            openId = res.result.data;
            _index2.default.setStorage({ key: 'taro_demo_openid', data: openId });
            return _context.abrupt('return', openId);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getOpenId() {
    return _ref.apply(this, arguments);
  };
}();

exports.getSystemInfo = getSystemInfo;
exports.parseMoney = parseMoney;
exports.throttle = throttle;

var _index = require('../npm/@tarojs/taro-weapp/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//获取当前系统信息
function getSystemInfo() {
  var systemInfo = _index2.default.getSystemInfoSync() || {
    model: ''
  };
  systemInfo.isIpx = systemInfo.model && systemInfo.model.indexOf('iPhone X') > -1 ? true : false;
  return systemInfo;
}
function parseMoney(num) {
  num = num.toString().replace(/\$|,/g, '');
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(num)) num = '0';

  num = Math.floor(num * 100 + 0.50000000001);
  var cents = num % 100;
  num = Math.floor(num / 100).toString();

  if (cents < 10) cents = '0' + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
  }

  return num + '.' + cents;
}

function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last = void 0,
      deferTimer = void 0;
  return function () {
    var context = scope || this;

    var now = +new Date();
    var args = arguments;
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}