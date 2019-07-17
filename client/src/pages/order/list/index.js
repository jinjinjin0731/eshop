import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import AtBase from '../../../bases/base'

import { getOpenId, parseMoney } from '../../../utils'
import orderLoading from '../../../asset/order_loading.gif'
import icSearchTips from '../../../asset/ic_search_tips.png'
import './index.scss'

export default class OrderList extends AtBase {
  config = {
    navigationBarTitleText: '订单中心',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark'
  }

  constructor () {
    super(...arguments)
    this.state = {
      isFirst: true,
      orderList: []
    }
  }

  componentDidMount () {}

  componentDidShow () {
    this.initFetchData()
  }

  async initFetchData () {
    Taro.showLoading({ title: '加载中...' })
    const _openId = await getOpenId()
    Taro.cloud
      .callFunction({
        name: 'order',
        data: {
          func: 'getOrder',
          data: {
            _id: _openId
          }
        }
      })
      .then(res => {
        Taro.hideLoading()
        this.handleOrderData(res.result.data)
      })
  }

  handleOrderData (data) {
    const newOrderList = data.map(item => {
      const venderId = item.skuInfoList[0].venderId
      const newItem = { ...item }
      newItem.shopInfo = { ...newItem.shopInfo[venderId] }
      let totalGoodsCount = 0
      let isMulti = false
      newItem.skuInfoList.forEach(sku => {
        totalGoodsCount += sku.num
      })
      if (newItem.skuInfoList.length > 1) {
        isMulti = true
        newItem.skuInfoList.splice(2)
      } else {
        newItem.skuItem = newItem.skuInfoList[0]
      }
      newItem.isMulti = isMulti
      newItem.totalGoodsCount = totalGoodsCount
      newItem.statusClassName = 'orders_item_status'
      if (newItem.orderState === -1) {
        newItem.orderStateStr = '已取消订单'
        newItem.statusClassName = 'orders_item_status cancel'
      } else if (newItem.orderState === 1) {
        newItem.orderStateStr = '待支付'
        newItem.statusClassName = 'orders_item_status pay'
      }
      newItem.shouldPayPrice = parseMoney(newItem.shouldPayPrice)
      return newItem
    })

    this.setState({ orderList: newOrderList })
  }

  payOrder () {
    Taro.showToast({
      title: '你触发了去支付',
      duration: 2000
    })
  }

  onPullDownRefresh () {
    this.initFetchData()
    Taro.stopPullDownRefresh()
  }

  gotoBrand (venderId) {
    if (venderId) {
      this.jumpUrl(`/pages/shop/index?venderId=${venderId}`)
    }
  }

  gotoHome () {
    this.jumpUrl(`/pages/index/index`)
  }

  render () {
    const { isFirst, orderList } = this.state
    return (
      <View className='orders'>
        <View className='orders_list'>
          {orderList && orderList.length > 0 ? (
            orderList.map((item, index) => {
              return (
                <View className='orders_item' key={index}>
                  <View
                    className='orders_item_hd'
                    onClick={this.gotoBrand.bind(this, item.shopInfo.venderId)}
                  >
                    <View className='orders_item_avatar'>
                      <Image
                        src={'http:' + item.shopInfo.thumbnail}
                        mode='aspectFit'
                        className='orders_item_avatar_img'
                        lazyLoad
                      />
                    </View>
                    <View className='orders_item_shop'>
                      <Text className='orders_item_shop_name'>
                        {item.shopInfo.title}
                      </Text>
                      <Text className={item.statusClassName}>
                        {item.orderStateStr}
                      </Text>
                    </View>
                    {item.shopInfo.venderId && (
                      <Text className='orders_arrow'>{'>'}</Text>
                    )}
                  </View>
                  {item.isMulti ? (
                    <View className='orders_item_bd orders_item_bd_multi'>
                      {item.skuInfoList.map(sku => {
                        return (
                          <View className='orders_item_sku' key={sku.skuId}>
                            <Image
                              src={sku.info.images[0]}
                              mode='aspectFill'
                              className='orders_item_sku_img'
                              lazyLoad
                            />
                          </View>
                        )
                      })}
                      <View className='orders_item_count'>
                        <Text className='fontSize24 grey'>共</Text>
                        <Text className='fontSize24 orders_item_count_txt'>
                          {item.totalGoodsCount}
                        </Text>
                        <Text className='fontSize24 grey'>件</Text>
                      </View>
                      <Text className='orders_arrow'>{'>'}</Text>
                    </View>
                  ) : (
                    <View className='orders_item_bd'>
                      <View className='orders_item_sku'>
                        <Image
                          src={item.skuItem.info.images[0]}
                          mode='aspectFill'
                          className='orders_item_sku_img'
                          lazyLoad
                        />
                      </View>
                      <View className='orders_item_info'>
                        <Text className='orders_item_info_tit'>
                          {item.skuItem.info.skuName}
                        </Text>
                        <View className='orders_item_info_attr'>
                          {item.skuItem.info.colorInfo.value && (
                            <Text className='orders_item_info_attr_txt'>
                              {item.skuItem.info.colorInfo.name}：
                              {item.skuItem.info.colorInfo.value}
                            </Text>
                          )}
                          {item.skuItem.info.sizeInfo.value && (
                            <Text className='orders_item_info_attr_txt'>
                              {item.skuItem.info.sizeInfo.name}：
                              {item.skuItem.info.sizeInfo.value}
                            </Text>
                          )}
                        </View>
                        <Text className='orders_item_info_tip'>
                          支持7天无理由退换
                        </Text>
                        <View className='orders_item_info_buy'>
                          <View className='orders_item_info_price'>
                            <Text className='orders_item_symbol'>￥</Text>
                            <Text className='orders_item_info_price_txt'>
                              {item.skuItem.info.price}
                            </Text>
                          </View>
                          <Text className='orders_item_info_count'>
                            X{item.skuItem.num}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                  <View className='orders_item_ft'>
                    <View className='orders_item_total'>
                      <Text>支付金额：</Text>
                      <Text className='orders_item_symbol'>￥</Text>
                      <Text className='orders_item_total_price'>
                        {item.shouldPayPrice}
                      </Text>
                    </View>
                    {item.orderState === 1 && (
                      <View className='orders_item_op'>
                        <Text
                          className='orders_item_btn'
                          onClick={this.payOrder.bind(this, item)}
                        >
                          去支付
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )
            })
          ) : (
            <View className='orders_list_none'>
              <Image src={icSearchTips} className='orders_list_none_img' />
              <View className='orders_list_none_tip'>
                <Text className='orders_list_none_tip_tit'>很抱歉</Text>
                <Text className='orders_list_none_tip_txt'>没有相关订单</Text>
              </View>
              <Text className='orders_list_none_btn' onClick={this.gotoHome}>
                去首页逛逛
              </Text>
            </View>
          )}
          {orderList.isFetchingList && !isFirst && (
            <View className='orders_list_loading'>
              <Image className='orders_list_loading_img' src={orderLoading} />
            </View>
          )}
          {orderList && orderList.length && (
            <Text className='orders_list_end'>已加载完毕</Text>
          )}
        </View>
      </View>
    )
  }
}
