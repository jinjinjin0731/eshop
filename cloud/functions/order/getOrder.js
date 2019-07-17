async function getOrder (db, data) {
  const { _id } = data
  const orderColl = db.collection('Order')
  const _ = db.command

  const res = await orderColl.where({
    ownerId: _.eq(_id)
  }).orderBy('dateSubmit', 'desc').get()

  const orderData = res.data

  return orderData
}

exports.getOrder = getOrder
