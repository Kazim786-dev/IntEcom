import axios from 'axios'

import { createSlice } from '@reduxjs/toolkit'

const cart = {
	products: [
	],
}


export const cartSlice = createSlice({
	name: 'cart',
	initialState: cart,
	reducers: {
		add: (state, action) => {
			const newProduct = action.payload
			newProduct.orderQuantity = 1
			state.products.push(newProduct)
		},
		remove: (state, action) => {
			const productID = action.payload
			const index = state.products.findIndex(
				(product) => product._id === productID
			)
			if (index !== -1) {
				state.products.splice(index, 1)
			}
		},
		increase: (state, action) => {
			const productID = action.payload
			const product = state.products.find((product) => product._id === productID)
			if (product && (product.orderQuantity + 1)<= product.quantity) {
				product.orderQuantity += 1
			}
		},
		decrease: (state, action) => {
			const productID = action.payload
			const product = state.products.find((product) => product._id === productID)
			if (product && product.orderQuantity > 1) {
				product.orderQuantity -= 1
			}
		},
		empty: (state) =>{
			state.products.length=0
		}
	}
})

export const placeOrder = (products, totalAmount, token, shippingDetails, paymentStatus) => async (dispatch) => {
	try {
		const response = await axios.post(
		`${process.env.REACT_APP_DEV_BACKEND_URL}/orders`,
		{
			products,
			totalAmount: totalAmount.toFixed(2),
			status: 'Pending',
			shippingDetails, // Include shipping details in the payload
			paymentStatus, // Include payment status in the payload
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
		);
		if (response.status === 201) {
		
		dispatch(empty()); // Assuming 'empty' is a function to clear the cart or similar
		return true; // Indicate successful order placement
		}
	} catch (error) {
		console.error(error);
	}
	return false; // Indicate order placement failure
  };
  


// Action creators are generated for each case reducer function
export const { add, remove, increase, decrease, empty } = cartSlice.actions

export default cartSlice.reducer