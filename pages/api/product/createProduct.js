import { client, q } from '../config/db'

const createProduct = text => client.query(
  q.Create(
    q.Collection('products'),
    {
      data: {
        name,
        description,
        price,
        quantity
      },
    },
  )
)
.then(ret => ret)
.catch(err => console.warn(err))


export default createProduct