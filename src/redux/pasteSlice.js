import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState= {
  pastes: ( ()=>{
    try {
      const pasteFromStorage= localStorage.getItem("pastes");
      return pasteFromStorage ? JSON.parse(pasteFromStorage) : [];
    } catch (error) {
      console.error("Error parsing localstorage",error);
      return [];
    }
  })()
};
export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste added")
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item)=> item._id === paste._id);
      if(index >=0){
        state.pastes[index]=paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Updated");
      }
    },
    resetAllPastes: (state) => {
      state.pastes=[];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      console.log(pasteId);
      const index = state.pastes.findIndex((item)=>item._id === pasteId);
      if(index>=0){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Deleted");
      }
    },
  },
})
export const { addToPastes, updateToPastes, resetAllPastes,removeFromPastes } = pasteSlice.actions
export default pasteSlice.reducer