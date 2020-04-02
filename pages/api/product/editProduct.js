import { client, q } from '../../config/db'

const editProduct = (prodRef, newName) => client.query(
  q.Update(
    q.Ref(q.Collection('products'), prodRef),
    { data: { newName: newName } },
  )
)
.then((ret) => console.log(ret))
.catch(err => console.warn(err))

export default editProduct