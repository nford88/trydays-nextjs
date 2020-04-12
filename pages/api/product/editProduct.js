import { client, q } from '../../config/db'


const editProduct = async (req, res) => {
  const { prodRef, values } = req.body;
  try {
    const dbs = await client.query(
      q.Update(
        q.Ref(q.Collection('products'), prodRef),
        { data: values },
      )
    )
    res.status(200).json({ message: 'Updated Succesfully', prodRef: prodRef, values: values })
  } catch (e) {
    res.status(500).json({ error: e.message, prodRef: prodRef })
  }
}

export default editProduct