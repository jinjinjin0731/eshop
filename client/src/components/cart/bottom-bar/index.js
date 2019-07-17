import Taro from '@tarojs/taro'
import { View, Text, Image, Label } from '@tarojs/components'
import classnames from 'classnames'
import AtBase from '../../../bases/base'

import Modal from '../../modal'

import { getOpenId } from '../../../utils'
import './index.scss'

export default class BottomBar extends AtBase {
  constructor () {
    super(...arguments)
    this.state = {
      showConfirm: false,
      delNum: 0
    }
    this.delSkusArr = []
  }

  checkAllCart () {
    const { isEditStatus, commoditys, checkAll, checkDelAll } = this.props
    const skusArr = []
    commoditys.forEach(commodity => {
      commodity.skus.forEach(sku => {
        skusArr.push({ skuId: sku.skuId })
      })
    })
    if (skusArr.length === 0) return
    if (isEditStatus) {
      checkDelAll
        ? Taro.eventCenter.trigger('onInverseCheckDelCart', skusArr)
        : Taro.eventCenter.trigger('onCheckDelCart', skusArr)
    } else {
      checkAll
        ? Taro.eventCenter.trigger('onFetchInvertCheckCart', skusArr)
        : Taro.eventCenter.trigger('onFetchCheckCart', skusArr)
    }
  }

  onHideDelPopup () {
    this.setState({ showConfirm: false })
  }

  delCart () {
    Taro.eventCenter.trigger('delCart', this.delSkusArr)
    this.setState({ showConfirm: false })
    Taro.eventCenter.trigger('setState', { isEditStatus: false })
  }

  handleDelbtn (hasDelCart) {
    if (!hasDelCart) return
    const { commoditys } = this.props
    let delNum = 0
    this.delSkusArr = []
    commoditys.forEach(commodity => {
      commodity.skus.forEach(sku => {
        if (sku.checkDel) {
          delNum++
          this.delSkusArr.push({ skuId: sku.skuId })
        }
      })
    })
    this.setState({
      showConfirm: true,
      delNum
    })
  }

  booleanDelCart () {
    const { commoditys = [] } = this.props
    let hasDelCart = false
    for (let i = 0; i < commoditys.length; i++) {
      const commodity = commoditys[i]
      for (let j = 0; j < commodity.skus.length; j++) {
        const sku = commodity.skus[j]
        if (sku.checkDel) {
          hasDelCart = true
          break
        }
      }
      if (hasDelCart) break
    }
    return hasDelCart
  }

  async gotoBalance () {
    const { checkCartNum } = this.props
    if (checkCartNum <= 0) return

    Taro.showLoading({ title: '提交中...' })
    const _openId = await getOpenId()
    Taro.cloud
      .callFunction({
        name: 'order',
        data: {
          func: 'addOrder',
          data: {
            _id: _openId,
            freightPrice: 14,
            payType: 4
          }
        }
      })
      .then(() => {
        Taro.hideLoading()
        this.jumpUrl('/pages/order/list/index')
      })
  }

  render () {
    const {
      isLogin,
      isSub,
      isEditStatus,
      checkCartNum,
      totalPrice,
      checkAll,
      checkDelAll,
      commoditys
    } = this.props

    const hasCommodity = commoditys.length !== 0

    const { showConfirm, delNum } = this.state
    const hasDelCart = this.booleanDelCart()
    const bottomClass = classnames('bottom_bar_wp', {
      hide: !hasCommodity && !isLogin
    })
    return (
      <View className={bottomClass} style={isSub ? 'margin-bottom: 0' : ''}>
        {isEditStatus ? (
          <View className='bottom_bar del'>
            <View className='bottom_bar_select'>
              <Label
                className='bottom_bar_select_wp'
                onClick={this.checkAllCart.bind(this)}
              >
                <Text
                  className={checkDelAll ? 'select_radio on' : 'select_radio'}
                />
                {checkDelAll ? (
                  <Image
                    className='select_radio_img'
                    src='http://storage.jd.com/o2images/select_icon_on.png'
                  />
                ) : (
                  <Image
                    className='select_radio_img'
                    src='http://storage.jd.com/o2images/select_icon_off.png'
                  />
                )}
                <Text className='select_radio_text' onClick={this.checkAllCart}>
                  全选
                </Text>
              </Label>
            </View>
            <View
              className={hasDelCart ? 'bottom_bar_btn' : 'bottom_bar_btn del'}
              data-component-className='BottomBar'
              onClick={this.handleDelbtn.bind(this, hasDelCart)}
            >
              <Text className='bottom_bar_text_del'>删除</Text>
            </View>
          </View>
        ) : (
          <View className='bottom_bar'>
            <View className='bottom_bar_select'>
              <Label
                className='bottom_bar_select_wp'
                onClick={this.checkAllCart}
              >
                <Text
                  className={checkAll ? 'select_radio on' : 'select_radio'}
                />
                {checkAll ? (
                  <Image
                    className='select_radio_img'
                    src='http://storage.jd.com/o2images/select_icon_on.png'
                  />
                ) : (
                  <Image
                    className='select_radio_img'
                    src='http://storage.jd.com/o2images/select_icon_off.png'
                  />
                )}
                <Text className='select_radio_text' onClick={this.checkAllCart}>
                  全选
                </Text>
              </Label>
            </View>
            <View className='bottom_bar_total'>
              <View className='bottom_bar_total_text'>
                <Text className='bottom_bar_total_text'>共计：</Text>
                <Text className='bottom_bar_total_small'>￥</Text>
                <Text className='bottom_bar_total_big'>{totalPrice}</Text>
              </View>
              <Text className='bottom_bar_total_desc'>不含运费</Text>
            </View>
            <View
              className={
                checkCartNum === 0
                  ? 'bottom_bar_btn bottom_bar_btn_none'
                  : 'bottom_bar_btn'
              }
              onClick={this.gotoBalance.bind(this)}
            >
              <Text
                onClick={this.gotoBalance.bind(this)}
                className='bottom_bar_text'
              >
                去结算({checkCartNum})
              </Text>
            </View>
          </View>
        )}
        {showConfirm ? (
          <Modal
            title='提示'
            contentText={`是否删除这${delNum}种商品`}
            onCancelCallback={this.onHideDelPopup.bind(this)}
            onConfirmCallback={this.delCart.bind(this)}
          />
        ) : null}
      </View>
    )
  }
}

BottomBar.defaultProps = {
  isLogin: true,
  isSub: false,
  isEditStatus: false,
  checkCartNum: 0,
  totalPrice: 0,
  checkAll: false,
  checkDelAll: false,
  commoditys: []
}
