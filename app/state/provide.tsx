"use client";
import {Provider} from "react-redux";
import store from './store'
import React, { ReactNode } from "react";

const provider =({children}:{children:ReactNode})=>{
	return(
		<Provider store={store}>
			{children}
		</Provider>
	)
}
export default provider