import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_URL + '/api/products/'

export const getTop = async () => {
    const response = await axios.get(API_URL + 'top/')
    return response.data
}

export const getAll = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

export const getById = async (id) => {
    const response = await axios.get(API_URL + id)
    return response.data
}

export const create = async (productData, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, productData, config)
    return response.data
}

export const update = async (id, productData, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL + id, productData, config)
    return response.data
}

export const deleteById = async (id, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + id, config)
    return response.data
}

export const createReview = async (id, reviewData, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL + id + '/reviews/', reviewData, config)
    return response.data
}

const productService = {
    getTop,
    getAll,
    getById,
    create,
    update,
    deleteById,
    createReview,
}

export default productService


