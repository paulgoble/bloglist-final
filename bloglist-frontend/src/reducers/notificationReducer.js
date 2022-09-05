import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null
  },
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload
      }
    },
    removeNotification() {
      return {
        message: null
      }
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer