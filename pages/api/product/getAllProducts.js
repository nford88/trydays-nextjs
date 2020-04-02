import { client, q } from '../../config/db'

const getAllProducts = client.query(
  q.Paginate(
    q.Match(
      q.Ref('all_products')))
)
  .then(response => {
    const prodRefs = response.data
    const getAllProductDataQuery = prodRefs.map((ref) => {
      return q.Get(ref)
    })
    // query the refs
    return client.query(getAllProductDataQuery).then((data) => data)
  })
  .catch(error => console.warn('error', error.message))

export default getAllProducts;