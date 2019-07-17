const wxServer = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

const { getCart: getCartService } = require('./cart')
const { editCart: editCartService } = require('./cart')

wxServer.init()

exports.main = async (event, context) => {
    const app = new TcbRouter({ event })
    const db = wxServer.database()

    app.router('getCart', async (ctx, next) => {
        const { data: cartData } = event
        const data = await getCartService(db, cartData)
        ctx.body = {
            code: 0,
            data
        }
    })
    app.router('editCart', async (ctx, next) => {
        const { data: editData } = event
        const data = await editCartService(db, editData)
        ctx.body = {
            code: 0,
            data
        }
    })
    return app.serve()
}
