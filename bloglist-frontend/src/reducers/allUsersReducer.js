import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userlist: []
}

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    setAllUsers(state, action) {
      return {
        userlist: action.payload
      }
    }
  }
})

export const { setAllUsers } = allUsersSlice.actions

export default allUsersSlice.reducer