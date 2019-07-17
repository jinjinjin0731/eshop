const wxServer = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

const informationService = require('./information')
const getShopService = require('./shop')
const getSkuService = require('./sku')

wxServer.init()

exports.main = async (event, context) => {
    const app = new TcbRouter({ event })
    const db = wxServer.database()

    app.router('getInformation', async (ctx, next) => {
        const data = await informationService(db)
        ctx.body = {
            code: 0,
            data
        }
    })
    app.router('getShop', async (ctx, next) => {
        const { data: venderId } = event
        const data = await getShopService(db, venderId)
        ctx.body = {
            code: 0,
            data
        }
    })
    app.router('getSku', async (ctx, next) => {
        const { data: skuId} = event
        const data = await getSkuService(db, skuId)
        ctx.body = {
            code: 0,
            data
        }
    })
    return app.serve()
}
