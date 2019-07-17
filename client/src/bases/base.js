import Taro, { Component } from '@tarojs/taro'

const PAGE_LEVEL_LIMIT = 10

export default class AtBase extends Component {
  jumpUrl (url, options = {}) {
    const pages = Taro.getCurrentPages()
    let method = options.method || 'navigateTo'

    const tabList = [
      'pages/index/index',
      'pages/cart/index',
      'pages/order/list/index',
    ]

    if (url && typeof url === 'string') {
      if (tabList.findIndex(x => '/' + x == url) != -1) {
        method = 'switchTab'
      }

      if (method == 'navigateTo' && pages.length == PAGE_LEVEL_LIMIT) {
        method = 'redirectTo'
      }

      Taro[method]({
        url
      })
    }
  }

  queryStringToJson (queryString) {
    if (queryString.indexOf('?') > -1) {
      queryString = queryString.split('?')[1]
    }
    const pairs = queryString.split('&')
    const result = {}
    pairs.forEach(pair => {
      pair = pair.split('=')
      result[pair[0]] = decodeURIComponent(pair[1] || '')
    })
    return result
  }

  successCode (res) {
    return res.result.code === 0
  }

  getDataContent (res) {
    return res.result.data
  }
}
