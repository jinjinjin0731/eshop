import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import classnames from 'classnames'
import AtBase from '../../../bases/base'

import './index.scss'

export default class EditBox extends AtBase {
  constructor () {
    super(...arguments)
    this.state = {
      showColorValue: '',
      showSizeValue: '',
      isClose: false
    }
  }

  onAnimationEnd () {
    const { isClose } = this.state
    if (isClose) {
      this.setState({ isClose: false })
      this.props.onHideEditBox()
    }
  }

  runCloseAni () {
    this.setState({ isClose: true })
  }

  selectAttr (type, value) {
    if (type === 'color') {
      this.setState({ showColorValue: value })
    } else if (type === 'size') {
      this.setState({ showSizeValue: value })
    }
  }

  changeCartAttr () {
    const { editSkuData } = this.props
    const { showColorValue, showSizeValue } = this.state
    const { sku } = editSkuData
    const newSku = [
      {
        skuId: sku.skuId,
        color: showColorValue || sku.colorInfo.value,
        size: showSizeValue || sku.sizeInfo.value
      }
    ]

    this.runCloseAni()
    if (showColorValue || showSizeValue) {
      Taro.eventCenter.trigger('onFetchChangeAttr', newSku)
    }
  }

  render () {
    const { isClose, showColorValue, showSizeValue } = this.state
    const { editSkuData } = this.props
    const { showEidtBox, sku } = editSkuData
    const { colorInfo, sizeInfo } = sku || {}

    const colorValue = showColorValue || (colorInfo && colorInfo.value)
    const sizeValue = showSizeValue || (sizeInfo && sizeInfo.value)
    const wpClass = classnames(
      'editbox bg_shade',
      { show: showEidtBox },
      { fade: isClose }
    )
    const aniClass = classnames(
      'editbox_content',
      { show_wp: !isClose && showEidtBox },
      { hide_wp: isClose }
    )
    return (
      <View className={wpClass}>
        <View
          className={aniClass}
          onAnimationEnd={this.onAnimationEnd.bind(this)}
        >
          <View className='editbox_header'>
            <View className='editbox_header_img'>
              <Image src={sku.main.images[0]} mode='aspectFill' />
            </View>
            <View className='editbox_header_text'>
              <Text className='editbox_header_text_price'>
                <Text className='small'>￥</Text>
                {sku.main.price}
              </Text>
              <Text className='editbox_header_text_desc'>
                商品编号：{sku.skuId}
              </Text>
            </View>
            <Text
              className='editbox_header_close'
              onClick={this.runCloseAni.bind(this)}
            />
          </View>
          <View className='editbox_option'>
            <View className='editbox_option_title'>{colorInfo.name}：</View>
            <View className='editbox_option_wp'>
              {colorInfo.all.map((value, idx) => {
                return (
                  <Text
                    key={idx}
                    className={
                      value === colorValue
                        ? 'editbox_option_item on'
                        : 'editbox_option_item'
                    }
                    onClick={this.selectAttr.bind(this, 'color', value)}
                  >
                    {value}
                  </Text>
                )
              })}
            </View>
          </View>
          <View className='editbox_option size'>
            <View className='editbox_option_title'>{colorInfo.name}：</View>
            <View className='editbox_option_wp'>
              {sizeInfo.all.map((value, idx) => {
                return (
                  <Text
                    key={idx}
                    className={
                      value === sizeValue
                        ? 'editbox_option_item on'
                        : 'editbox_option_item'
                    }
                    onClick={this.selectAttr.bind(this, 'size', value)}
                  >
                    {value}
                  </Text>
                )
              })}
            </View>
          </View>
          {sku.isOutOfStock ? (
            <View className='editbox_offsale'>该商品补货中</View>
          ) : (
            <View
              className='editbox_btn'
              onClick={this.changeCartAttr.bind(this)}
            >
              确定
            </View>
          )}
        </View>
      </View>
    )
  }
}

EditBox.defaultProps = {
  editSkuData: {
    showEidtBox: false
  }
}