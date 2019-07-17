import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import './index.scss'

import { parseMoney, getOpenId } from '../../../utils'

export default class OrderDetail extends Component {
  config = {
    navigationBarTitleText: '确认订单',
    disableScroll: true
  }

  constructor () {
    super(...arguments)
    this.currentScrollTop = 0
    this.state = {
      showTip: true,
      showPayWay: false,
      aniShowPayWay: false,
      paymentType: 4
    }
  }

  componentWillMount () {
    this.firstIn = true
  }

  async componentDidShow () {
    Taro.showLoading({ title: '加载中...' })
    const _openId = await getOpenId()
    const res = await Taro.cloud.callFunction({
      name: 'order',
      data: {
        $url: 'getBalance',
        data: {
          _id: _openId
        }
      }
    })
    console.log(res)
    Taro.hideLoading()
  }

  onPageScroll (e) {
    if (!e.scrollTop && !this.state.reachTop) {
      this.setState({
        reachTop: true
      })
      return
    }
    if (this.state.reachTop) {
      this.setState({
        reachTop: false
      })
    }
  }

  componentDidUpdate (nextProps) {
    const { isNeedBanlance } = nextProps
    if (!isNeedBanlance) {
      this.backToCart()
    }
  }

  backToCart () {
    this.jumpUrl('/pages/cart/index')
  }

  onAnimationEnd () {
    if (!this.state.showPayWay) {
      this.setState({
        aniShowPayWay: false
      })
    }
  }

  render () {
    const {
      paymentType,
      showTip,
      aniShowPayWay,
      showPayWay,
      isShowUserAuth,
      freightPrice,
      totalPrice,
      payNum,
      allPrice
    } = this.state
    let { payCommodities = [] } = this.state
    payCommodities = payCommodities.map(item => {
      let price = 0
      let totalNum = 0
      const newSkus = item.skus.map(skuItem => {
        totalNum += parseInt(skuItem.num)
        price += totalNum * parseInt(skuItem.main.price)
        if (!/http:\/\/|https:\/\//.test(skuItem.main.images[0])) {
          skuItem.imgUrl = `https://${skuItem.main.images[0]}`
        } else {
          skuItem.imgUrl = skuItem.main.images[0]
        }
        return skuItem
      })
      item.skus = newSkus
      item.totalNum = totalNum
      item.totalPrice = parseMoney(price)
      return item
    })
    return (
      <View className='balance_page'>
        {showTip && (
          <View className='balance_tip'>
            <Text className='balance_tip_text'>
              温馨提示：订单中包含不支持7天无理由退货的商品，请确认相关商品信息后提交订单
            </Text>
            <View className='balance_tip_close' onClick={this.closeTip}>
              <Image
                className='balance_tip_close_image'
                src='https://static.360buyimg.com/tp-statics/2018-4-20/m/img/ic_close1@2x.png'
              />
            </View>
          </View>
        )}
        <ScrollView className='balance' scrollY>
          <View className='balance_good'>
            <View className='balance_tit'>
              <Text className='balance_tit_text'>商品与配送</Text>
            </View>
            <View className='balance_box balance_good'>
              <View className='balance_good_addr'>
                <Image
                  className='balance_good_addr_icon'
                  src='https://static.360buyimg.com/tp-statics/2018-4-20/m/img/ic_shdz46x60@2x.png'
                />
                <View className='addr_detail'>
                  <View className='addr_detail_header'>
                    <Text className='addr_detail_grey'>收货人A</Text>
                    <Text className='addr_detail_grey'>
                      &nbsp;123456789&nbsp;
                    </Text>
                    <Text className='addr_default'>&nbsp;默认</Text>
                  </View>
                  <Text className='addr_text'>
                    广东省深圳市宝安区龙光世纪大厦
                  </Text>
                </View>
                <Image
                  className='balance_box_arrow'
                  src='https://static.360buyimg.com/tp-statics/2018-4-20/m/img/ic_right_arrow@2x.png'
                />
              </View>
              <View className='balance_slice' />
              <View className='balance_good_express'>
                <Text className='balance_good_label'>配送</Text>
                <View className='val_wrap'>
                  <View className='val_express'>
                    <Text className='expredd_grey'>TARO商城配送</Text>
                    <Text className='express_fee'>
                      <Text className='express_fee_small'>¥</Text>
                      {freightPrice}
                    </Text>
                  </View>
                  <Text className='val_time'>TARO商城配送默认时间</Text>
                </View>
                <Image
                  className='balance_box_arrow'
                  src='https://static.360buyimg.com/tp-statics/2018-4-20/m/img/ic_right_arrow@2x.png'
                />
              </View>
            </View>

            <View className='balance_good_wrap balance_good'>
              {payCommodities.map(item => {
                return (
                  <View className='balance_box' key>
                    <View className='balance_good_shop'>
                      <Image
                        className='balance_good_shop_image'
                        src={'http:' + item.shop.thumbnail}
                        mode='aspectFill'
                      />
                    </View>
                    <View className='balance_slice' />
                    {item.skus.map(sku => {
                      return (
                        <View className='balance_good_items' key={sku.skuId}>
                          <View className='balance_good_item'>
                            <View className='balance_good_items_pic'>
                              <Image
                                className='balance_good_items_pic_image'
                                src={sku.imgUrl}
                                mode='aspectFill'
                              />
                            </View>
                            <View className='info_wrap'>
                              <View className='info'>
                                <Text className='info_name balance_grey'>
                                  {sku.main.skuName}
                                </Text>
                                <Text className='info_size balance_grey'>
                                  {sku.sizeInfo.name}: {sku.sizeInfo.value}
                                </Text>
                                <Text className='info_size balance_grey'>
                                  {sku.colorInfo.name}: {sku.colorInfo.value}
                                </Text>
                                <Text className='info_support balance_grey'>
                                  支持7天无理由退换
                                </Text>
                              </View>
                              <View className='price'>
                                <Text className='price_val'>
                                  ¥{sku.main.price}
                                </Text>
                                <Text className='price_num'>X{sku.num}</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      )
                    })}
                    <View className='balance_slice' />
                    <View className='balance_good_count'>
                      <Text className='count_text'>
                        共&nbsp;{item.totalNum}&nbsp;件商品
                      </Text>
                      <Text className='count_total_text'>
                        小计：<Text>¥{item.totalPrice}</Text>
                      </Text>
                    </View>
                  </View>
                )
              })}
            </View>
          </View>
          <View className='balance_pay'>
            <View className='balance_tit'>
              <Text className='balance_tit_text'>支付信息</Text>
            </View>
            <View className='balance_box'>
              <View
                className='balance_pay_info balance_pay_way'
                onClick={this.showPayWayBox}
              >
                <Text className='balance_pay_info_label'>支付</Text>
                <Text className='balance_pay'>
                  {paymentType === 4 ? '微信支付' : '货到付款'}
                </Text>
                <View className='arrow' />
              </View>
              <View className='balance_pay_info balance_pay_coupon'>
                <Text className='balance_pay_info_label'>优惠券</Text>
                <Text className='coupon_val balance_pay'>无可用</Text>
                <View className='arrow' />
              </View>
              <View className='balance_pay_info balance_pay_invoice'>
                <Text className='balance_pay_info_label'>发票</Text>
                <Text className='balance_pay_info_val balance_pay'>
                  个人-商品明细
                </Text>
                <View className='arrow' />
              </View>
            </View>
          </View>
          <View className='balance_amount'>
            <View className='balance_tit'>
              <Text className='balance_tit_text'>订单金额</Text>
            </View>
            <View className='balance_box'>
              <View className='balance_amount_info'>
                <Text className='label balance_grey'>商品金额：</Text>
                <Text className='val balance_grey'>+￥{totalPrice}</Text>
              </View>
              <View className='balance_amount_info'>
                <Text className='label balance_grey'>运费：</Text>
                <Text className='val balance_grey'>+￥{freightPrice}</Text>
              </View>
              <View className='balance_slice' />
              <Text className='balance_amount_total'>
                合计：¥{allPrice && <Text>{allPrice}</Text>}
              </Text>
            </View>
          </View>
          {aniShowPayWay && (
            <View
              className={
                showPayWay ? 'balance_pay_choose show' : 'balance_pay_choose'
              }
            >
              <View className='mask' onAnimationEnd={this.onAnimationEnd} />
              <View className='main'>
                <View className='choose_main'>
                  <View className='close_wrap'>
                    <View className='icon_close' onClick={this.closePayWay} />
                  </View>
                  <Text
                    className={paymentType === 4 ? 'method checked' : 'method'}
                    onClick={this.checkPayWay.bind(this, 4)}
                  >
                    微信支付
                  </Text>
                  <Text
                    className={paymentType === 1 ? 'method checked' : 'method'}
                    onClick={this.checkPayWay.bind(this, 1)}
                  >
                    货到付款
                  </Text>
                </View>
                <Text className='btn_close' onClick={this.closePayWay}>
                  关闭
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
        <View className='balance_footer'>
          <View className='balance_footer_info'>
            <Text className='balance_footer_info_text'>
              <Text>共计：</Text>
              <Text className='yan'>¥</Text>
              <Text className='money'>{allPrice}</Text>
            </Text>
            <Text className='balance_footer_info_text'>
              共{payNum && <Text className='num'>{payNum}</Text>}件商品
            </Text>
          </View>
          <View
            onClick={this.submitOrder.bind(this)}
            reportSubmit='true'
            className='balance_footer_btn'
          >
            {paymentType === 4 || !paymentType ? (
              isShowUserAuth ? (
                <View
                  className='balance_footer_btn'
                  onClick={this.showUserAuthModal}
                >
                  <Text className='balance_footer_btn_text'>微信支付</Text>
                </View>
              ) : (
                <View className='balance_footer_btn' formType='submit'>
                  <Text className='balance_footer_btn_text'>微信支付</Text>
                </View>
              )
            ) : (
              <View className='balance_footer_btn' formType='submit'>
                货到付款
              </View>
            )}
          </View>
        </View>
      </View>
    )
  }
}
