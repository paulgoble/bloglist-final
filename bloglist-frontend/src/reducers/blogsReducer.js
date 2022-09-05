import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bloglist: []
}

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return {
        ...state,
        bloglist: action.payload
      }
    }
  }
})

export const { setBlogs } = blogsSlice.actions

export default blogsSlice.reducer