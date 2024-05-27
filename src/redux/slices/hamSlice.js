// sumit
import { createSlice } from "@reduxjs/toolkit";

const hamSlice = createSlice({
    name: 'ham',
    initialState:{
        hamActive:true
    },
    reducers :{
        setHamActive :(state,action)=>{
            state.hamSlice = action.payload
        }
    }
})

export default hamSlice.reducer;

export const {setHamActive} = hamSlice.actions;