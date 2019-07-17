import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import classnames from 'classnames'
import AtBase from '../../bases/base'

import './index.scss'
import searchIcon from '../../asset/ic_search.png'

const DEFAULT_PLACEHOLDER = '探索你的精致生活'

export default class SearchInto extends AtBase {
  constructor () {
    super(...arguments)
  }

  config = {
    navigationBarTitleText: '搜索'
  }

  render () {
    const { placeholder, cls } = this.props

    const _cls = classnames ('search-into', cls)
    return (
      <View className={_cls}>
        <Image mode='aspectFit' className='search-icon' src={searchIcon} />
        <Text className='search-text'>{placeholder}</Text>
      </View>
    )
  }
}

SearchInto.defaultProps = {
  placeholder: DEFAULT_PLACEHOLDER
}
