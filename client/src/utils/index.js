import Taro from '@tarojs/taro'

//获取当前系统信息
export function getSystemInfo () {
  const systemInfo = Taro.getSystemInfoSync() || {
    model: ''
  }
  systemInfo.isIpx =
    systemInfo.model && systemInfo.model.indexOf('iPhone X') > -1 ? true : false
  return systemInfo
}
export function parseMoney (num) {
  num = num.toString().replace(/\$|,/g, '')
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(num)) num = '0'

  num = Math.floor(num * 100 + 0.50000000001)
  let cents = num % 100
  num = Math.floor(num / 100).toString()

  if (cents < 10) cents = '0' + cents
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num =
      num.substring(0, num.length - (4 * i + 3)) +
      ',' +
      num.substring(num.length - (4 * i + 3))
  }

  return num + '.' + cents
}

export function throttle (fn, threshhold, scope) {
  threshhold || (threshhold = 250)
  let last, deferTimer
  return function () {
    let context = scope || this

    let now = +new Date()
    let args = arguments
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(() => {
        last = now
        fn.apply(context, args)
      }, threshhold)
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}

export async function getOpenId () {
  let openId
  try {
    openId = Taro.getStorageSync('taro_demo_openid')
  } catch (error) {
    // TODO:
    console.log(error)
  }
  if (openId) {
    return openId
  } else {
    const res = await Taro.cloud.callFunction({
      name: 'user',
      data: {
        $url: 'getOpenId'
      }
    })
    openId = res.result.data
    Taro.setStorage({ key: 'taro_demo_openid', data: openId })
    return openId
  }
}
