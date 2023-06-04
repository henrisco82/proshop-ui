import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import UserList from './pages/UserList';
import UserEdit from './pages/UserEdit';
import ProductList from './pages/ProductList';
import ProductEdit from './pages/ProductEdit';
import OrderList from './pages/OrderList';

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/product/:productId' element={<Product />} />
              <Route path="/cart/:id?" element={<Cart />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/placeorder" element={<PlaceOrder />} />
              <Route path="/order/:orderId" element={<Order />} />
              <Route path='/admin/userlist' element={<UserList />} />
              <Route path='/admin/userlist/:userId/edit' element={<UserEdit />} />
              <Route path='/admin/productlist' element={<ProductList />} />
              <Route path='/admin/product/:productId/edit' element={<ProductEdit />} />
              <Route path='/admin/orderlist' element={<OrderList />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
