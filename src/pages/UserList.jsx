import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getAllUsers, deleteUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { FaTimes, FaCheck, FaTrash, FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'


const UserList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { users, user, isLoading, error } = useSelector((state) => state.user)

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(getAllUsers())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, user])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id)).unwrap().then(() => {
        toast.success('User deleted successfully')
        dispatch(getAllUsers())
        navigate('/admin/userlist')
      }).catch((err) => {
        toast.error(err.message)
      })
    }
  }

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i style={{ color: 'green' }}><FaCheck /></i>
                  ) : (
                    <i style={{ color: 'red' }}>< FaTimes/></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/userlist/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i><FaEdit/></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i><FaTrash /></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserList
