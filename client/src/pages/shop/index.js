import Taro from '@tarojs/taro'
import {
  View,
  Text,
  Image,
  ScrollView,
  Swiper,
  SwiperItem
} from '@tarojs/components'
import AtBase from '../../bases/base'

import './index.scss'
import SearchInto from '../../components/search-into'
import { getSystemInfo } from '../../utils'

export const SEARCH_BAR_MORE_IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAGCAYAAADUtS5UAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAAlklEQVQoz8WRsQ6CMBRFD5X4S4Z/kTK5QjARWJyJ8gtO8jGELyJhAAeeSdOUIpNnvD19vekLouh0BBpAAxPQAkXX9SMODP8MBOLfNvwnEJt+KGFquJkUuOLmYfmp+PmKX8tM0x+UNLHRrKN3+okjuyj+hGL5c5vWc+f9Y+Y7e4VAwbJ0DczyaOkZVErh74q2/Ao4WP79A14CJJ7qixoSAAAAAElFTkSuQmCC'

export default class Shop extends AtBase {
  constructor () {
    super(...arguments)
    this.state = {
      isFirst: true,
      params: {},
      showMore: false,
      banner: [],
      floors: []
    }
  }

  config = {
    navigationBarTitleText: ''
  }

  async componentWillMount () {
    const params = (this.$router || this.context.$router).params
    let venderId = params.venderId || '1'
    const scene = decodeURIComponent(params.scene)
    if (scene) {
      const sceneParams = this.queryStringToJson(scene)
      if (sceneParams.venderId) {
        venderId = sceneParams.venderId
      }
    }
    await this.getShopData(venderId)
  }

  async getShopData (venderId) {
    const res = await Taro.cloud.callFunction({
      name: 'shop',
      data: {
        $url: 'getShop',
        data: venderId
      }
    })
    // 成功调用
    if (this.successCode(res)) {
      const afterData = this.getDataContent(res)
      this.setState({
        params: {
          venderId
        },
        showMore: false,
        isFirst: false,
        ...afterData
      })
      Taro.setNavigationBarTitle({
        title: afterData.title
      })
    } else {
      // TODO: 异常处理
    }
  }

  // 搜索框显示更多
  toggleShowMore () {
    //由于 this.setState 异步的缘故，可以通过给 this.setState 传入函数来确保拿到正确的值
    this.setState(prevState => ({ showMore: !prevState.showMore }))
  }

  // more里的联系客服
  connectService () {
    Taro.makePhoneCall({
      phoneNumber: '000000000000' //仅为示例，并非真实的电话号码
    })
  }

  onGotoPage (page) {
    this.jumpUrl(`/pages/${page}/index`)
  }

  onGotoDetail (skuId) {
    this.jumpUrl(`/pages/detail/index?skuId=${skuId}`)
  }

  render () {
    const { isFirst, banner, floors, showMore } = this.state
    const isIphonex = getSystemInfo().isIpx
    return (
      !isFirst && (
        <View
          className='shop_nocate'
          style={isIphonex ? 'padding-bottom: 164rpx;' : ''}
        >
          <View className='topbar'>
            <SearchInto cls='small' placeholder='搜索店铺内商品' type='shop' />
            <View className='topbar_search_action'>
              <View
                className='topbar_search_more'
                onClick={this.toggleShowMore.bind(this)}
              >
                <Image
                  className='topbar_search_icon topbar_search_icon_more'
                  src={SEARCH_BAR_MORE_IMAGE}
                />
                {showMore && (
                  <View className='topbar_search_more_container'>
                    <View className='topbar_search_more_container-inner'>
                      <View
                        className='topbar_search_more_connect'
                        onClick={this.connectService.bind(this)}
                      >
                        联系客服
                      </View>
                      <View
                        className='topbar_search_more_tohome'
                        onClick={this.onGotoPage.bind(this, 'index')}
                      >
                        回到首页
                      </View>
                      <View
                        className='topbar_search_more_tocart'
                        onClick={this.onGotoPage.bind(this, 'cart')}
                      >
                        购物车
                      </View>
                    </View>
                  </View>
                )}
              </View>
              {showMore && (
                <View
                  className='mask'
                  onClick={this.toggleShowMore.bind(this)}
                />
              )}
            </View>
          </View>
          <ScrollView scrollY className='shop_main-scroll'>
            <Swiper
              className='shop_main_swiper'
              indicatorDots
              indicatorColor='#ddd'
              indicatorActiveColor='#232323'
              current={0}
              interval='3000'
              duration='300'
              circular
              autoplay
            >
              {banner.map((item, index) => {
                return (
                  <SwiperItem key={index}>
                    <Image
                      src={item}
                      mode='widthFix'
                      className='shop_main_swiper_item_image'
                    />
                  </SwiperItem>
                )
              })}
            </Swiper>
            <View className='shop_floor'>
              {floors.map((floor, index) => {
                return (
                  <View key={index} className='shop_floor_item'>
                    <View className='shop_floor_title'>
                      <Image
                        className='shop_floor_title_img'
                        src={'http:' + floor.title}
                        mode='widthFix'
                      />
                    </View>
                    {floor.desc && (
                      <View className='shop_floor_desc'>
                        <Image
                          className='shop_floor_desc_img'
                          src={floor.desc}
                          mode='widthFix'
                        />
                      </View>
                    )}
                    {floor.commodities.map((item, floorIndex) => {
                      return (
                        <View
                          key={floorIndex}
                          className='goods_item'
                          onClick={this.onGotoDetail.bind(this, item.skuId)}
                        >
                          <View className='goods_img'>
                            <Image
                              className='goods_img_image'
                              src={item.images[0]}
                              mode='widthFix'
                              lazyLoad
                            />
                          </View>
                          <View className='goods_info'>
                            <Text
                              className='goods_name'
                              onClick={this.onGotoDetail.bind(this, item.skuId)}
                            >
                              {item.skuName}
                            </Text>
                            <Text
                              className='goods_price goods_price_new'
                              decode
                            >
                              ￥{item.price}
                            </Text>
                          </View>
                        </View>
                      )
                    })}
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
      )
    )
  }
}
