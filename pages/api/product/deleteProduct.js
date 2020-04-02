import { client, q } from '../../config/db'


const deleteProduct = async (req, res) => {
  const { prodRef } = req.body;
  try {
    const dbs = await client.query(
      q.Delete(
        q.Ref(
          q.Collection('products'), prodRef
        )
      )
    )
    res.status(200).json({ prodRef: prodRef, message: 'Deleted Succesfully' })
  } catch (e) {
    res.status(500).json({ error: e.message, prodRef: prodRef })
  }
}

export default deleteProduct