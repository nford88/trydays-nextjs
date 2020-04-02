const faunadb = require('faunadb')

// your secret hash
const secret = process.env.FAUNADB_SECRET_KEY
const q = faunadb.query
const client = new faunadb.Client({ secret })

module.exports = async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const dbs = await client.query(
          q.Map(
            // iterate each item in result
            q.Paginate(
              // make paginatable
              q.Match(
                // query index
                q.Index('all_products') // specify source
              )
            ),
            ref => q.Get(ref) // lookup each result by its reference
          )
        )
        // ok
        res.status(200).json(dbs.data)
      } catch (e) {
        // something went wrong
        res.status(500).json({ error: e.message })
      }
      break
    case 'POST':
      res.status(200).json({ msg: 'THIS IS A POST' })
      break
    default:
      res.status(405).end() //Method Not Allowed
      break
  }


}