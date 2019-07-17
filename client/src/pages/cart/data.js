import Taro from '@tarojs/taro'

import { operate } from '../../constants/index'
import { getOpenId, parseMoney } from '../../utils'

export function getInitialState () {
  return {
    commoditys: [],
    offSales: [],
    editSkuData: {
      showEidtBox: false
    },
    diviner: [],
    footmark: [],
    couponData: {
      showCouponList: false
    },
    checkCartNum: 0,
    totalPrice: 0,
    checkAll: false,
    checkDelAll: false,
    isEditStatus: false,
    isFetching: false,
    isSub: false
  }
}

export async function getCartData () {
  const _openId = await getOpenId()

  const res = await Taro.cloud.callFunction({
    name: 'cart',
    data: {
      $url: 'getCart',
      data: {
        _id: _openId
      }
    }
  })
  return handleCartData(res.result.data)
}

export async function editCart (skus, oper) {
  const _openId = await getOpenId()
  const res = await Taro.cloud.callFunction({
    name: 'cart',
    data: {
      $url: 'editCart',
      data: {
        _id: _openId,
        type: operate[oper],
        skus
      }
    }
  })
  return handleCartData(res.result.data)
}

export async function inverseCheckDelCart (commoditys, delSkus, boolean) {
  let commoditysCheckDelAll = true
  for (let commodity of commoditys) {
    const { shop, skus } = commodity
    let checkDelAll = true
    const newSkus = skus.map(sku => {
      const isChoose =
        delSkus.filter(delSku => {
          return delSku.skuId === sku.skuId
        }).length !== 0
      // 是否处于删除态
      if (isChoose) {
        sku = {
          ...sku,
          checkDel: boolean
        }
      }
      if (!sku.checkDel) checkDelAll = false
      return sku
    })
    commodity.skus = newSkus
    shop.checkDelAll = checkDelAll
    if (!shop.checkDelAll) commoditysCheckDelAll = false
  }
  // 返回新的数组
  const newCommoditys = commoditys.map(commodity => {
    return { ...commodity }
  })
  return { newCommoditys, commoditysCheckDelAll }
}

// 将拿到的数据进行处理
export function handleCartData (data) {
  if (!data || !data.cartInfo) {
    return {
      commoditys: [],
      offSales: [],
      checkCartNum: 0,
      totalPrice: 0,
      checkAll: false
    }
  }

  const commoditysObj = {}
  let commoditys = []
  const offSales = []
  let checkCartNum = 0
  let totalPrice = 0
  let checkAll = data.cartNum !== 0

  const { cartInfo, shopMap } = data
  const realShopMap = shopMap[0]

  // 结算总价格
  totalPrice = parseMoney(data.totalPrice)

  for (let venderId in realShopMap) {
    // 整理店铺的信息
    let toplifeShop = {
      fullLogoUri:
        'https://img11.360buyimg.com/ling/jfs/t24292/40/1063566259/5338/454eb23d/5b4f2575N485ac2d0.jpg',
      logoUri:
        '/ling/jfs/t24292/40/1063566259/5338/454eb23d/5b4f2575N485ac2d0.jpg',
      title: 'TARO',
      venderId: ''
    }
    let shopObj = realShopMap[venderId] || toplifeShop
    // 店铺是否全选
    shopObj.checkAll = true
    // 店铺是否显示全选这个标题，有无货商品时不显示
    shopObj.showCheckAll = false
    // 店铺是否全选删除
    shopObj.checkDelAll = false

    let commodityObj = {}
    commodityObj.shop = shopObj
    commodityObj.skus = []

    commoditysObj[venderId] = commodityObj
  }

  //   console.log(cartInfo, 'cartInfo')
  //   console.log(commoditysObj, 'commoditysObj')
  // 整理商品的信息
  cartInfo.forEach(item => {
    const venderId = item.venderId
    const skusObj = commoditysObj[venderId].skus
    const shopObj = commoditysObj[venderId].shop

    // 显示全选
    shopObj.showCheckAll = true

    let obj = {}
    obj.skuId = item.skuId
    obj.num = item.num
    obj.main = item.info
    obj.isCheck = item.isCheck
    obj.colorInfo = item.info.colorInfo
    obj.sizeInfo = item.info.sizeInfo
    // 商品是否选中删除
    obj.checkDel = false

    // 增加商品数量
    obj.isCheck && (checkCartNum += obj.num)

    // 商品是否无货
    obj.isOutOfStock = false

    // 是否全选
    if (!obj.isCheck) shopObj.checkAll = false

    if (!shopObj.checkAll) checkAll = false

    skusObj.push(obj)
  })

  checkCartNum > 99 && (checkCartNum = '99+')

  commoditys = Object.values(commoditysObj)

  return {
    commoditys,
    offSales,
    checkCartNum,
    totalPrice,
    checkAll
  }
}
