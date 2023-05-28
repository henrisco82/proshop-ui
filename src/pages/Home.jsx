import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../features/product/productSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import ProductCarousel from '../components/ProductCarousel'

function Home() {
  const dispatch = useDispatch()

  const { products, isLoading, error} = useSelector((state) => state.product)
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])
  return (
    <>
      <ProductCarousel />
      <h1>Latest Products</h1>
      {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
      <>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      </>
      }
    </>
  )
}

export default Home