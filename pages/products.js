import { useEffect, useState } from 'react'
import Head from 'next/head'
import TableRow from '../components/TableRow.js'
import { Container, Row, Col } from 'reactstrap';

export default () => {
  const [data, setData] = useState([])
  useEffect(() => {
    async function getData() {
      const res = await fetch('/api/products')
      const newData = await res.json()
      setData(newData)
    }
    getData()
  }, [])
  return (
    <main>
      <hr />
      <div className="container-scroll">
        <Container className="container">
          <h2>Products</h2>
          {/* <div className="table">
            <h4>name</h4>
            <h4 className="telephone">telephone</h4>
            <h4 className="credit-card">credit card</h4>
          </div> */}
          {data.length > 0 ?
            data.map((d, index) => {
              return <ProductRow info={d.data} key={index} />
            })
            : (
              <div>Loading Data</div>
            )}
        </Container>
      </div>
    </main>
  )
}

const ProductRow = (info) => {
  console.log('hit here', info)
  return (
    <div className="table table-row">
      <Row className="row-1">
        <Col>{info.info.name}</Col>
        <Col>{info.info.description}</Col>
        <Col>{info.info.price}</Col>
      </Row>
      {/* <p className={`telephone ${loading ? 'loading' : ''}`}>{telephone}</p>
      <p className={`credit-card credit-card-number ${loading ? 'loading' : ''}`}>
        {creditCard && <img src="/icons/visa.svg" />}
        {creditCard}
      </p> */}
    </div>
  )
}
