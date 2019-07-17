module.exports = async db => {
    const collection = db.collection('Information')
    const res = await collection.get()
    return res.data
}
