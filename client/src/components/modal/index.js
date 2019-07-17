import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

import './index.scss'

class Modal extends Component {
  constructor () {
    super(...arguments)
    this.state = {}
  }

  onConfirmClick () {
    this.props.onConfirmCallback()
  }

  onCancelClick () {
    this.props.onCancelCallback()
  }

  onAuthConfirmClick (e) {
    this.props.onConfirmCallback(e.detail)
  }

  preventTouchMove (e) {
    e.stopPropagation()
  }

  render () {
    const { title, contentText, cancelText, confirmText } = this.props
    return (
      <View
        className='toplife_modal'
        onTouchMove={this.preventTouchMove.bind(this)}
      >
        <View className='toplife_modal_content'>
          <View className='toplife_modal_title'>{title}</View>
          <View className='toplife_modal_text'>{contentText}</View>
          <View className='toplife_modal_btn'>
            <Button
              className='toplife_modal_btn_cancel'
              onClick={this.onCancelClick.bind(this)}
            >
              {cancelText}
            </Button>
            <Button
              className='toplife_modal_btn_confirm'
              onClick={this.onConfirmClick.bind(this)}
            >
              {confirmText}
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

Modal.defaultProps = {
  title: '',
  contentText: '',
  cancelText: '取消',
  confirmText: '确定',
  onCancelCallback: () => {},
  onConfirmCallback: () => {}
}

export default Modal
