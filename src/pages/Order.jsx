import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../features/order/orderSlice';

const Order = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order, isLoading, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (!order || order._id !== orderId || user._id !== order.user._id) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, navigate, orderId, order, user]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  const successPaymentHandler = (paymentResult) => {
    const orderData = {
        id: orderId,
        paymentResult: paymentResult,
    }
    dispatch(payOrder(orderData));
  }

  return (
    <>
      {order ? (
        <>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                    <strong>Name: </strong> {order?.user?.name}
                    </p>
                    <p>
                    <strong>Email: </strong>{' '}
                    <a href={`mailto:${order?.user?.email}`}>{order?.user?.email}</a>
                    </p>
                    <p>
                    <strong>Address:</strong>
                    {order?.shippingAddress?.address}, {order?.shippingAddress?.city}{' '}
                    {order?.shippingAddress?.postalCode},{' '}
                    {order?.shippingAddress?.country}
                    </p>
                    {order.isDelivered ? (
                    <Message variant='success'>
                        Delivered on {order.deliveredAt}
                    </Message>
                    ) : (
                    <Message variant='danger'>Not Delivered</Message>
                    )}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                    <Message variant='success'>Paid on {order.paidAt}</Message>
                    ) : (
                    <Message variant='danger'>Not Paid</Message>
                    )}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order?.orderItems?.length === 0 ? (
                    <Message>Order is empty</Message>
                    ) : (
                    <ListGroup variant='flush'>
                        {order?.orderItems?.map((item, index) => (
                        <ListGroup.Item key={index}>
                            <Row>
                            <Col md={1}>
                                <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                                />
                            </Col>
                            <Col>
                                <Link to={`/product/${item.product}`}>
                                {item.name}
                                </Link>
                            </Col>
                            <Col md={4}>
                                {item.qty} x ${item.price} = ${item.qty * item.price}
                            </Col>
                            </Row>
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                    )}
                </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col>Items</Col>
                        <Col>${order?.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col>Shipping</Col>
                        <Col>${order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col>Tax</Col>
                        <Col>${order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col>Total</Col>
                        <Col>${order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    {!order.isPaid && (
                        <ListGroup.Item>
                        <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: order.totalPrice,
                                                },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        successPaymentHandler(details);
                                    });
                                }}
                            />
                        </PayPalScriptProvider>
                        </ListGroup.Item>
                    )}
                    </ListGroup>
                </Card>
            </Col>
          </Row>
        </>
      ) : (
        <Message variant="info">Loading order details...</Message>
      )}
    </>
  );
};

export default Order;
