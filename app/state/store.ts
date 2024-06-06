import { configureStore } from '@reduxjs/toolkit';
import User from './user/userSlice';
const store=configureStore({
    reducer:{
        User
    },
  
})

export default store;
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch