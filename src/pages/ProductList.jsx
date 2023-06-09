import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getAllProducts, createProduct, deleteProduct } from '../features/product/productSlice'
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa'

const ProductList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { products, isLoading, error } = useSelector((state) => state.product)
  const { user } = useSelector((state) => state.user)
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/login')
    }else{
      dispatch(getAllProducts())
    }
  }, [
    dispatch,
    navigate,
    user,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
       dispatch(deleteProduct(id))
        .unwrap()
        .then(() => {
          dispatch(getAllProducts())
          navigate('/admin/productlist')
        })
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
      .unwrap()
      .then((product) => {
        navigate(`/admin/product/${product._id}/edit`)
      })
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i><FaPlus /></i> Create Product
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i><FaEdit /></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i><FaTrash /></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default ProductList
