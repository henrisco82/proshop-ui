import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'
import { extractErrorMessage } from '../../utils'

const initialState = {
    products: [],
    productTopRated: [],
    product: {},
    isLoading: false,
}

export const getTopProducts = createAsyncThunk(
    'product/getTopProducts',
    async () => {
        try {
            const response = await productService.getTop()
            return response
        } catch (error) {
            throw Error(extractErrorMessage(error))
        }
    }
)

export const getAllProducts = createAsyncThunk(
    'product/getAllProducts',
    async () => {
        try {
            const response = await productService.getAll();
            return response
        } catch (error) {
            throw Error(extractErrorMessage(error))
        }
    }
)

export const getProductById = createAsyncThunk(
    'product/getProductById',
    async (id) => {
        try {
            const response = await productService.getById(id)
            return response
        } catch (error) {
            throw Error(extractErrorMessage(error))
        }
    }
)

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (productData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            const response = await productService.create(productData, token)
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (productData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            const response = await productService.update(productData.id, productData, token)
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            const response = await productService.deleteById(id, token)
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const createProductReview = createAsyncThunk(
    'product/createProductReview',
    async (reviewData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            const response = await productService.createReview(reviewData.id, reviewData, token)
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getTopProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTopProducts.fulfilled, (state, action) => {
                state.productTopRated = action.payload
                state.isLoading = false
            })
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.isLoading = false
            })
            .addCase(getProductById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.product = action.payload
                state.isLoading = false
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.product = action.payload
                state.isLoading = false
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.product = action.payload
                state.isLoading = false
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(createProductReview.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProductReview.fulfilled, (state, action) => {
                state.isLoading = false
            })
    }
})

export default productSlice.reducer










        






