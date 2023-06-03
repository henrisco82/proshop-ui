import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { useParams, useNavigate } from 'react-router-dom'
import { getUserDetails, updateUser } from '../features/user/userSlice'

const UserEdit = () => {
  const { userId } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const { userDetails, error, isLoading } = useSelector((state) => state.user)

  useEffect(() => {
      if (!userDetails.name || userDetails._id !== userId) {
        dispatch(getUserDetails(userId))
      }else {
        setName(userDetails.name)
        setEmail(userDetails.email)
        setIsAdmin(userDetails.isAdmin)
      }
  }, [dispatch, navigate, userId, userDetails,])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
      .unwrap()
      .then((user) => {
        console.log(user)
        navigate('/admin/userlist')
      })
  }

  if (error) {
    return <Message variant='danger'>{error}</Message>
  }

  if (isLoading) {
    return <Loader />
   }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
      </FormContainer>
    </>
  )
}

export default UserEdit
