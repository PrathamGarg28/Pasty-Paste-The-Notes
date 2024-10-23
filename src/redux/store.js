import { configureStore } from '@reduxjs/toolkit'
import pasterReducer from './pasteSlice'
export default configureStore({
  reducer: {
    paste:pasterReducer,
  },
})