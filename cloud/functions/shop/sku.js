module.exports = async (db, skuId) => {
    const commColl = db.collection('Commodity')
    const res = await commColl.doc(skuId).get()
    return res.data
}
