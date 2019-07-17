module.exports = async (db, venderId) => {
    const shopColl = db.collection('Shop')
    const commColl = db.collection('Commodity')
    const _ = db.command

    const res = await shopColl
        .where({
            venderId: _.eq(Number(venderId))
        })
        .get()

    const shopData = res.data[0]
    const floors = await Promise.all(
        shopData.floors.map(async floor => {
            let res = await commColl
                .where({
                    skuId: _.in(floor.commodities)
                })
                .get()
            floor.commodities = res.data
            return floor
        })
    )
    shopData.floors = floors

    return shopData
}
