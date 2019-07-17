import Taro from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'

import AtBase from '../../bases/base'
import './index.scss'

import SearchInto from '../../components/search-into'

import { getOpenId } from '../../utils'

export default class Index extends AtBase {
  constructor () {
    super(...arguments)
    this.state = {
      floorList: []
    }
  }

  config = {
    navigationBarTitleText: '首页'
  }

  async componentWillMount () {
    const res = await Taro.cloud.callFunction({
      name: 'shop',
      data: {
        $url: 'getInformation'
      }
    })
    // 成功调用
    if (this.successCode(res)) {
      this.setState({
        floorList: this.getDataContent(res)
      })
    } else {
      // TODO: 异常处理
    }

    getOpenId()
  }

  onGotoPage (venderId) {
    this.jumpUrl(`/pages/shop/index?venderId=${venderId}`)
  }

  render () {
    return (
      <View className='index'>
        <View className='index-search_into'>
          <SearchInto placeholder='搜索框' type='index' />
        </View>
        <ScrollView scrollY className='index-list'>
          {this.state.floorList.map((floor, index) => {
            return (
              <View
                key={index}
                onClick={this.onGotoPage.bind(this, floor.venderId)}
              >
                <Image
                  mode='widthFix'
                  className='index-item_img'
                  src={floor.image}
                  lazyLoad
                />
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}
