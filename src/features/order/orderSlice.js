import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from './orderService'
import { extractErrorMessage } from '../../utils'

const initialState = {
    order: {},
    orders: [],
    myOrders: [],
    isLoading: false,
    error: '',
}

export const getAllOrders = createAsyncThunk(
    'order/getAllOrders',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token
            const response = await orderService.getAll(token)
            return response
        }
        catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const getMyOrders = createAsyncThunk(
    'order/getMyOrders',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token
            const response = await orderService.getMyOrders(token)
            return response
        }
        catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const getOrderDetails = createAsyncThunk(
    'order/getOrderDetails',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token
            const response = await orderService.getById(id, token)
            return response
        }
        catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (orderData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token
            const response = await orderService.create(orderData, token)
            return response
        }
        catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const payOrder = createAsyncThunk(
    'order/payOrder',
    async (orderData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token
            const response = await orderService.payOrder(orderData, token)
            return response
        }
        catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState,
    extraReducers: (builder) => {
        builder    
            .addCase(getAllOrders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.orders = action.payload
                state.isLoading = false
            })
            .addCase(getAllOrders.rejected, (state) => {
                state.isLoading = false
                state.error = 'Failed to get orders'
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.order = action.payload
                state.isLoading = false
            })
            .addCase(getOrderDetails.rejected, (state) => {
                state.isLoading = false
                state.error = 'Failed to get order details'
            })
            .addCase(getMyOrders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.myOrders = action.payload
                state.isLoading = false
            })
            .addCase(getMyOrders.rejected, (state) => {
                state.isLoading = false
                state.error = 'Failed to get my orders'
            })
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.order = action.payload
                state.isLoading = false
            })
            .addCase(createOrder.rejected, (state) => {
                state.isLoading = false
                state.error = 'Failed to create order'
            })
            .addCase(payOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(payOrder.fulfilled, (state, action) => {
                state.order = action.payload
                state.isLoading = false
            })
            .addCase(payOrder.rejected, (state) => {
                state.isLoading = false
                state.error = 'Failed to pay order'
            })
    }
})

export default orderSlice.reducer
