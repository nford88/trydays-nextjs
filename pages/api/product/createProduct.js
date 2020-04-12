import { client, q } from '../../config/db'

const createProduct =  async (req, res) => {
  const { name, description, price, quantity } = req.body
  try {
    if(validateFields(req.body)) {
      const dbs = await client.query(
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
      // ok
      res.status(200).json({prodRef: name, message: 'Create Successfully' })
    }else{
      res.status(500).json({ product: req.body,  error:  "Required fields not present or invalid"})
    }
  } catch (e) {
    // something went wrong
    res.status(500).json({ product: req.body, error: e.message })
  }
} 

function validateFields(data) {
  const nameValid = data.hasOwnProperty('name') && data.name.length != 0;
  const descriptionValid = data.hasOwnProperty('description') && data.description.length != 0;
  const priceValid = data.hasOwnProperty('price') && data.price > 0;
  const quantityValid = data.hasOwnProperty('quantity') && data.quantity >= 0;

  if(nameValid && descriptionValid && priceValid && quantityValid) {
    return true;
  }
  return false;
}

export default createProduct
