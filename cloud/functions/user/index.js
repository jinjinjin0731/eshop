const wxServer = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

const { addUser: addUserService } = require('./user')

wxServer.init()

exports.main = async (event, context) => {
    const app = new TcbRouter({ event })
    const db = wxServer.database()

    app.router('getOpenId', async (ctx, next) => {
        const data = await addUserService(db)
        ctx.body = {
            code: 0,
            data
        }
    })
    return app.serve()
}
