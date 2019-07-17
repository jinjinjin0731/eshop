import Taro from '@tarojs/taro'
import { View, Image, Text, Label, Input, Button } from '@tarojs/components'
import AtBase from '../../../bases/base'

import Modal from '../../modal'
import './index.scss'

export default class Commondity extends AtBase {
  constructor () {
    super(...arguments)
    this.state = {
      showConfirm: false,
      changeNumMap: {}
    }
    this.lastIsFixedBar = false
    this.delSkuArr = []
  }

  componentWillReceiveProps (nextProps) {
    const { commoditys, isFetching, editSkuData, isFixedBar } = nextProps
    const { changeNumMap } = this.state
    if (isFetching || editSkuData.showEidtBox) return
    if (isFixedBar !== this.lastIsFixedBar) {
      this.lastIsFixedBar = isFixedBar
      return
    }
    commoditys.forEach(commodity => {
      commodity.skus.forEach(sku => {
        changeNumMap[sku.skuId] = sku.num
      })
    })
    this.setState({ changeNumMap })
  }

  hideDelPopup () {
    this.setState({ showConfirm: false })
  }

  delCart () {
    Taro.eventCenter.trigger('delCart', this.delSkuArr)
    this.setState({ showConfirm: false })
  }

  addCartNum (sku) {
    if (sku.isOutOfStock) return
    const { changeNumMap } = this.state
    let newNum = changeNumMap[sku.skuId] + 1
    if (newNum > 200) {
      Taro.showToast({
        icon: 'none',
        title: '最多只能买200件'
      })
      newNum = 200
    }
    this.setState({
      changeNumMap: {
        ...changeNumMap,
        [sku.skuId]: newNum
      }
    })
  }

  minusCartNum (sku) {
    if (sku.isOutOfStock) return
    const { changeNumMap } = this.state
    const newNum = changeNumMap[sku.skuId] - 1
    if (newNum > 0) {
      this.setState({
        changeNumMap: {
          ...changeNumMap,
          [sku.skuId]: newNum
        }
      })
    } else {
      this.setState({ showConfirm: true })
      this.delSkuArr = [{ skuId: sku.skuId }]
    }
  }

  getSkuAttr (sku) {
    this.changeAllCartNum()
    Taro.eventCenter.trigger('onShowEditBox', sku)
  }

  checkOneCart (sku, e) {
    e.stopPropagation()
    const { isEditStatus } = this.props
    const skusArr = [{ skuId: sku.skuId }]
    // 下架商品不给操作
    if (!isEditStatus && sku.isOutOfStock) return
    if (isEditStatus) {
      sku.checkDel
        ? Taro.eventCenter.trigger('onInverseCheckDelCart', skusArr)
        : Taro.eventCenter.trigger('onCheckDelCart', skusArr)
    } else {
      sku.isCheck
        ? Taro.eventCenter.trigger('onFetchInvertCheckCart', skusArr)
        : Taro.eventCenter.trigger('onFetchCheckCart', skusArr)
    }
  }

  checkShopCart (commodity) {
    const { shop, skus } = commodity
    const { isEditStatus } = this.props
    const skusArr = []
    if (isEditStatus) {
      skus.forEach(sku => {
        skusArr.push({ skuId: sku.skuId })
      })
      shop.checkDelAll
        ? Taro.eventCenter.trigger('onInverseCheckDelCart', skusArr)
        : Taro.eventCenter.trigger('onCheckDelCart', skusArr)
    } else {
      skus.forEach(sku => {
        if (!sku.isOutOfStock) {
          skusArr.push({ skuId: sku.skuId })
        }
      })
      shop.checkAll
        ? Taro.eventCenter.trigger('onFetchInvertCheckCart', skusArr)
        : Taro.eventCenter.trigger('onFetchCheckCart', skusArr)
    }
  }

  handleEditClick () {
    const { isEditStatus } = this.props
    let afterStatus = !isEditStatus
    if (!afterStatus) {
      this.changeAllCartNum()
    }
    Taro.eventCenter.trigger('setState', { isEditStatus: afterStatus })
  }

  changeAllCartNum () {
    const { commoditys } = this.props
    const { changeNumMap } = this.state
    const skuArrs = []
    commoditys.forEach(commodity => {
      commodity.skus.forEach(sku => {
        if (changeNumMap[sku.skuId] !== sku.num) {
          skuArrs.push({
            skuId: sku.skuId,
            num: changeNumMap[sku.skuId]
          })
        }
      })
    })
    skuArrs.length !== 0 &&
      Taro.eventCenter.trigger('getChangeCartNum', skuArrs)
  }

  gotoDetail (skuId) {
    this.jumpUrl(`../detail/index?skuid=${skuId}`)
  }

  gotoShop (venderId) {
    if (venderId === '8888' || venderId === 8888 || venderId === '') {
      return
    }
    this.jumpUrl(`../shop/index?venderId=${venderId}`)
  }

  render () {
    const { isFixedBar, isEditStatus, commoditys } = this.props
    const { showConfirm, changeNumMap } = this.state
    const hasCommodity = commoditys.length !== 0

    const isNeedFixedBar = isFixedBar && hasCommodity
    const commoditysDom = commoditys.map(commodity => {
      return (
        <View className='cart_commodity' key={commodity.shop.venderId}>
          <View
            className='cart_commodity_header'
            onClick={this.gotoShop.bind(this, commodity.shop.venderId)}
          >
            <Image
              className='cart_commodity_header_image'
              src={'http:' + commodity.shop.thumbnail}
              mode='widthFix'
              lazyLoad
            />
          </View>
          <View className='cart_commodity_content'>
            <Label
              className='cart_commodity_choose'
              style={
                isEditStatus || commodity.shop.showCheckAll
                  ? 'visibility: visible'
                  : 'visibility: hidden'
              }
              onClick={this.checkShopCart.bind(this, commodity)}
            >
              {/* 这里逻辑判断有点多，因为不能定义变量。主要是要区分是否在编辑态，在编辑态下，选中代表的是是否要删除 */}
              {(isEditStatus ? (
                commodity.shop.checkDelAll
              ) : (
                commodity.shop.checkAll
              )) ? (
                <Image
                  className='radio_icon_img'
                  src='http://storage.jd.com/o2images/radio_icon_on.png'
                />
              ) : (
                <Image
                  className='radio_icon_img_off'
                  src='http://storage.jd.com/o2images/radio_icon_off.png'
                />
              )}
              <Text className='cart_radio_text'>全选</Text>
            </Label>
            {commodity.skus.map(sku => {
              return (
                <View className='cart_commodity_item' key={sku.skuId}>
                  <Label
                    className='cart_commodity_item_choose'
                    onClick={this.checkOneCart.bind(this, sku)}
                  >
                    {/* 这里逻辑判断有点多，因为不能定义变量。主要是要区分是否在编辑态，在编辑态下，选中代表的是是否要删除 */
                    isEditStatus ? (
                      sku.checkDel ? (
                        <Image
                          className='radio_icon_img'
                          src='http://storage.jd.com/o2images/radio_icon_on.png'
                        />
                      ) : (
                        <Image
                          className='radio_icon_img_off'
                          src='http://storage.jd.com/o2images/radio_icon_off.png'
                        />
                      )
                    ) : sku.isCheck ? (
                      <Image
                        className='radio_icon_img'
                        src='http://storage.jd.com/o2images/radio_icon_on.png'
                      />
                    ) : (
                      <Image
                        className='radio_icon_img_off'
                        src='http://storage.jd.com/o2images/radio_icon_off.png'
                      />
                    )}
                  </Label>
                  <View
                    className='cart_commodity_item_img'
                    onClick={this.gotoDetail.bind(this, sku.skuId)}
                  >
                    <Image
                      className='cart_commodity_item_img_image'
                      src={sku.main.images[0]}
                      mode='aspectFill'
                      lazyLoad
                    />
                  </View>
                  {!isEditStatus ? (
                    <View className='cart_commodity_item_wp cciw'>
                      <Text
                        className='cciw_title'
                        onClick={this.gotoDetail.bind(this, sku.skuId)}
                      >
                        {sku.main.skuName}
                      </Text>
                      <Text className='cciw_info gray'>
                        <Text style='margin-right: 20rpx'>
                          {sku.colorInfo ? '颜色：' + sku.colorInfo.value : ''}
                        </Text>
                        {sku.sizeInfo ? '尺码：' + sku.sizeInfo.value : ''}
                      </Text>
                      <View className='cciw_space'></View>
                      <View className='cciw_price'>
                        <Text className='cciw_price_small'>￥</Text>
                        <Text className='cciw_price_price'>
                          {sku.main.price}
                        </Text>
                        <Text className='cciw_price_num flex1'>X{sku.num}</Text>
                      </View>
                    </View>
                  ) : (
                    <View className='cart_commodity_item_edit ccie'>
                      <View
                        className={
                          !sku.colorInfo && !sku.sizeInfo
                            ? 'ccie_form hide'
                            : 'ccie_form'
                        }
                        onClick={this.getSkuAttr.bind(this, sku)}
                      >
                        <View className='ccie_form_left'>
                          <Text className='ccie_form_text'>
                            {sku.colorInfo
                              ? '颜色：' + sku.colorInfo.value
                              : ''}
                          </Text>
                          <Text className='ccie_form_text'>
                            {sku.sizeInfo ? '尺码：' + sku.sizeInfo.value : ''}
                          </Text>
                        </View>
                        <View className='ccie_form_right'>
                          <Text className='ccie_form_icon' />
                        </View>
                      </View>
                      <View
                        className={
                          sku.isOutOfStock
                            ? 'ccie_operation off'
                            : 'ccie_operation'
                        }
                      >
                        <View
                          className='ccie_operation_wp'
                          onClick={this.minusCartNum.bind(this, sku)}
                        >
                          <Text className='ccie_operation_icon ccie_operation_minus' />
                        </View>
                        <Input
                          className='ccie_operation_num cciw_price_num'
                          confirm-type='done'
                          disabled={sku.isOutOfStock}
                          type='number'
                          maxlength='3'
                          value={changeNumMap[sku.skuId]}
                          // eslint-disable-next-line react/jsx-no-duplicate-props
                          disabled
                        />
                        <View
                          className='ccie_operation_wp right'
                          onClick={this.addCartNum.bind(this, sku)}
                        >
                          <Text className='ccie_operation_icon ccie_operation_add' />
                        </View>
                      </View>
                      <View className='ccie_btn cciw_btn end_start hide'>
                        <Button className='ccie_btn_item cciw_btn_item' plain>
                          选择服务
                        </Button>
                      </View>
                    </View>
                  )}
                </View>
              )
            })}
          </View>
        </View>
      )
    })
    const commoditysNone = (
      <View className='cart_commodity_none'>
        <View className='cart_commodity_none_img'>
          <Image
            className='cart_commodity_none_icon'
            src='http://storage.jd.com/o2images/emptycart_icon.png'
          />
        </View>
        <View className='cart_commodity_none_text'>
          <Text>哎呀，购物车还没有东西~</Text>
        </View>
      </View>
    )
    const Nav = (
      <View className='cart_nav'>
        <Text
          className='cart_nav_edit cart_nav_text'
          onClick={this.handleEditClick.bind(this)}
        >
          {isEditStatus ? '完成' : '编辑'}
        </Text>
      </View>
    )
    const FixNav = (
      <View className='cart_nav_fix'>
        {/* <View className={isLogin ? 'cart_nav_fix_login hide' : 'cart_nav_fix_login'} onClick={this.gotoLogin}>去登录 ></View> */}
        <Text
          className={
            hasCommodity ? 'cart_nav_fix_edit' : 'cart_nav_fix_edit hide'
          }
          onClick={this.handleEditClick.bind(this)}
        >
          {isEditStatus ? '完成' : '编辑'}
        </Text>
      </View>
    )
    return (
      <View className='cart_commoditys'>
        {isNeedFixedBar && FixNav}
        {/* {!isLogin && loginTip} */}
        {hasCommodity && Nav}
        {hasCommodity ? commoditysDom : commoditysNone}
        {showConfirm ? (
          <Modal
            title='提示'
            contentText='是否删除该商品'
            onCancelCallback={this.hideDelPopup.bind(this)}
            onConfirmCallback={this.delCart.bind(this)}
          />
        ) : null}
      </View>
    )
  }
}
Commondity.defaultProps = {
  isEditStatus: false,
  commoditys: [],
  isFixedBar: false,
  isFetching: false,
  editSkuData: {
    showEidtBox: false
  }
}
