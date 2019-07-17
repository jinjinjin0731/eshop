const wxServer = require('wx-server-sdk')

exports.addUser = async db => {
    const { OPENID } = wxServer.getWXContext()
    const collection = db.collection('User')
    const hasUser = await collection.where({ open_id: OPENID }).get()

    if (Array.isArray(hasUser.data) && hasUser.data.length === 0) {
        collection.add({ data: { open_id: OPENID } })
    }
    return OPENID
}
