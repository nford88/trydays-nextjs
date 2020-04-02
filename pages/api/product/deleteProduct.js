import { client, q } from '../config/db'

const deleteProduct = prodRef => client.query(
  q.Delete(q.Ref(q.Collection('products'), prodRef))
)
.then(res => res)
.catch(err => console.warn(err.message))

export default deleteProduct