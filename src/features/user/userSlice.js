import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import userService from './userService'
// NOTE: use a extractErrorMessage function to save some repetition
import { extractErrorMessage } from '../../utils'

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

// NOTE: remove isSuccess from state as we can infer from
// presence or absence of user
// There is no need for a reset function as we can do this in our pending cases
// No need for isError or message as we can catch the AsyncThunkAction rejection
// in our component and we will have the error message there
const initialState = {
  user: user ? user : null,
  userDetails: {},
  users: [],
  isLoading: false,
  error: '',
}

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      const response = await userService.update(user, token)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      const response = await userService.getById(id, token)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      const response = await userService.getProfile(token)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  } 
)

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      const response = await userService.updateProfile(user, token)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      const response = await userService.getAll(token)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      const response = await userService.deleteById(id, token)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Register new user
export const register = createAsyncThunk(
  'user/register',
  async (user, thunkAPI) => {
    try {
      return await userService.register(user)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Login user
export const login = createAsyncThunk('user/login', async (user, thunkAPI) => {
  try {
    return await userService.login(user)
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

// Logout user
// NOTE: here we don't need a thunk as we are not doing anything async so we can
// use a createAction instead
export const logout = createAction('user/logout', () => {
  userService.logout()
  // return an empty object as our payload as we don't need a payload but the
  // prepare function requires a payload return
  return {}
})

// NOTE: in cases of login or register pending or rejected then user will
// already be null so no need to set to null in these cases

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload
        state.isLoading = false
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false
        state.error = 'Error getting users'
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false
        state.error = 'Error registering user'
      })
      .addCase(login.pending, (state) => {
        state.isLoading = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
        state.error = 'Error logging in user'
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userDetails = action.payload
        state.isLoading = false
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false
        state.error = 'Error updating user'
      })
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload
        state.isLoading = false
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.isLoading = false
        state.error = 'Error getting user details'
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.isLoading = false
        state.error = 'Error getting user profile'
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoading = false
        state.error = 'Error updating user profile'
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.userDetails = action.payload
        state.isLoading = false
      })

  },
})

export default userSlice.reducer