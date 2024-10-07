import { configureStore } from '@reduxjs/toolkit'
import pasterReducer from './redux/pasteSlice'
export default configureStore({
  reducer: {
    paste:pasterReducer,
  },
})