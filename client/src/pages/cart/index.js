import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import classnames from 'classnames'

import EditBox from '../../components/cart/edit-box'
import Goods from '../../components/cart/goods'
import BottomBar from '../../components/cart/bottom-bar'
import Commondity from '../../components/cart/commodity'

import { throttle } from '../../utils'
import {
  getInitialState,
  getCartData,
  editCart,
  inverseCheckDelCart
} from './data'
import './index.scss'

export default class Cart extends Component {
  config = {
    navigationBarTitleText: '购物车',
    backgroundColor: '#f2efef',
    disableScroll: true
  }

  constructor () {
    super(...arguments)
    this.state = {
      isLogin: true,
      isFixedBar: false,
      ...getInitialState()
    }

    this.scrollTop = 0
    this.pageScrollFn = throttle(this.isNeedFixedBar, 200, this)
  }

  componentWillMount () {}

  componentDidMount () {
    Taro.eventCenter.on('setState', this.setNewData.bind(this))
    Taro.eventCenter.on('getChangeCartNum', this.getChangeCartNum.bind(this))
    Taro.eventCenter.on('delCart', this.delCart.bind(this))
    Taro.eventCenter.on('onShowEditBox', this.onShowEditBox.bind(this))
    Taro.eventCenter.on(
      'onInverseCheckDelCart',
      this.onInverseCheckDelCart.bind(this)
    )
    Taro.eventCenter.on('onCheckDelCart', this.onCheckDelCart.bind(this))
    Taro.eventCenter.on(
      'onFetchInvertCheckCart',
      this.onFetchInvertCheckCart.bind(this)
    )
    Taro.eventCenter.on('onFetchCheckCart', this.onFetchCheckCart.bind(this))
    Taro.eventCenter.on('onFetchChangeAttr', this.onFetchChangeAttr.bind(this))
  }

  setNewData (data) {
    this.setState({ ...data })
  }

  async getChangeCartNum (skuArrs) {
    const newData = await editCart(skuArrs, 'CHANGE_NUM')
    this.setState({
      ...newData
    })
  }

  async delCart (skuArrs) {
    const newData = await editCart(skuArrs, 'DEL')
    this.setState({
      ...newData
    })
  }

  onShowEditBox (sku) {
    const { editSkuData } = this.state
    const newEditSkuData = {
      ...editSkuData,
      sku,
      showEidtBox: true
    }
    this.setState({ editSkuData: newEditSkuData })
  }

  onHideEditBox () {
    const { editSkuData } = this.state
    const newEditSkuData = {
      ...editSkuData,
      showEidtBox: false
    }
    console.log()
    this.setState({ editSkuData: newEditSkuData })
  }

  async onInverseCheckDelCart (skusArr) {
    const newData = await inverseCheckDelCart(
      this.state.commoditys,
      skusArr,
      false
    )
    this.setState({
      commoditys: newData.newCommoditys,
      checkDelAll: newData.commoditysCheckDelAll
    })
  }

  async onCheckDelCart (skusArr) {
    const newData = await inverseCheckDelCart(
      this.state.commoditys,
      skusArr,
      true
    )
    this.setState({
      commoditys: newData.newCommoditys,
      checkDelAll: newData.commoditysCheckDelAll
    })
  }

  async onFetchInvertCheckCart (skusArr) {
    const newData = await editCart(skusArr, 'INVERT_CHECK')
    this.setState({
      ...newData
    })
  }

  async onFetchCheckCart (skusArr) {
    console.log(skusArr)
    const newData = await editCart(skusArr, 'CHECK')
    this.setState({
      ...newData
    })
  }

  async onFetchChangeAttr (skusArr) {
    const newData = await editCart(skusArr, 'CHANGE_ATTR')
    this.setState({
      ...newData
    })
  }

  componentWillUnmount () {}

  async componentDidShow () {
    const newData = await getCartData()
    this.setState({
      ...newData
    })
  }

  onViewScroll (e) {
    this.pageScrollFn && this.pageScrollFn(e.detail.scrollTop)
  }

  isNeedFixedBar (top) {
    const { isFixedBar } = this.state
    this.scrollTop = top
    let needTop = 45
    if (top > needTop) {
      !isFixedBar && this.setState({ isFixedBar: true })
    } else {
      isFixedBar && this.setState({ isFixedBar: false })
    }
  }

  render () {
    const {
      isLogin,
      isFixedBar,
      editSkuData,
      commoditys,
      isFetching,
      isEditStatus,
      checkCartNum,
      totalPrice,
      checkAll,
      checkDelAll,
      isSub
    } = this.state
    const showEidtBox = editSkuData.showEidtBox
    const hasCommodity = commoditys.length !== 0

    const cartClass = classnames('cart-scroll', {
      no_bottom: !hasCommodity && !isLogin
    })

    return (
      <View className='cart'>
        <ScrollView
          className={cartClass}
          scrollY={!showEidtBox}
          onScroll={this.onViewScroll.bind(this)}
          enableBackToTop
        >
          <Commondity
            isFixedBar={isFixedBar}
            isEditStatus={isEditStatus}
            commoditys={commoditys}
            isFetching={isFetching}
            editSkuData={editSkuData}
          />
          <Goods footmark={editSkuData.footmark} />
        </ScrollView>
        {showEidtBox && (
          <EditBox
            onHideEditBox={this.onHideEditBox.bind(this)}
            editSkuData={editSkuData}
          />
        )}
        <View className='cart_bottom'>
          <BottomBar
            isLogin={isLogin}
            isSub={isSub}
            isEditStatus={isEditStatus}
            checkCartNum={checkCartNum}
            totalPrice={totalPrice}
            checkAll={checkAll}
            checkDelAll={checkDelAll}
            commoditys={commoditys}
          />
        </View>
      </View>
    )
  }
}
