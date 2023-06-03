import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_URL + '/api/orders/'

export const getAll = async (token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

export const getById = async (id, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + id, config)
    return response.data
}

export const create = async (orderData, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, orderData, config)
    return response.data
}

export const getMyOrders = async (token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + 'myorders/', config)
    return response.data
}

export const payOrder = async (orderData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL + orderData.id + '/pay/', orderData.paymentResult, config)
    return response.data
}

export const deliverOrder = async (orderId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL + orderId + '/deliver', {}, config)
    return response.data
}

export const getClientId = async () => {
    const response = await axios.get(process.env.REACT_APP_BASE_URL + '/api/config/paypal')
    return response.data
}

const orderService = {
    getAll,
    getById,
    create,
    getMyOrders,
    payOrder,
    deliverOrder,
    getClientId,
}

export default orderService