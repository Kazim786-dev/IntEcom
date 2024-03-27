import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//pages
import AllProductsPage from '../pages/product/ProductsPage'
import CartPage from '../pages/cart/cart'

import ForgetPasswordPage from '../pages/auth/forget-password'
import LoginPage from '../pages/auth/login'
import NewPassPage from '../pages/auth/new-password'
import SignUpPage from '../pages/auth/signup'
import TotalOrders from '../pages/orders/cust-total-orders'
import Wishlist from '../pages/wishlist/wishlist'
import ProductDetailPage from '../pages/product/ProductDetails'
// admin pages
import AdminHome from '../pages/admin/home'

//seller pages
import SellerHome from '../pages/seller/home/sellerHomePage'  // Import your SellerHome component


//components
import Layout from '../components/layout'

const RouterLinks = ({
	user }) => {

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<Layout user={user} showNavbar={true}>
							{user.role === 'admin' ? <Navigate to='/admin' /> :
								user.role === 'seller' ? <Navigate to='/seller' /> :
									user.role === 'customer' ? <Navigate to='/products' /> :
										<Navigate to='/login' />}
						</Layout>
					}
				/>
				<Route
					path='/login'
					element={
						<Layout user={user} showNavbar={false} footer={false}>
							{!user.isLoggedIn ? <LoginPage /> : <Navigate to='/' />}
						</Layout>
					}
				/>
				<Route
					path='/signup'
					element={
						<Layout user={user} showNavbar={false} footer={false}>
							{!user.isLoggedIn ? <SignUpPage /> : <Navigate to='/' />}
						</Layout>
					}
				/>
				<Route
					path='/forget-pass'
					element={<ForgetPasswordPage />}
				/>
				<Route
					path='/new-pass/:token'
					element={<NewPassPage />}
				/>
				{user.role === 'customer' &&
					<>
						<Route
							path='/products'
							element={
								<Layout user={user} showNavbar={true} footer={true}>
									<AllProductsPage user={user} />
								</Layout>
							}
						/>
						<Route
							path='/cart'
							element={
								<Layout user={user} showNavbar={true} footer={true}>
									{user.isLoggedIn ? <CartPage user={user} /> : <Navigate to='/login' />}
								</Layout>
							}
						/>
						<Route
							path='/total-orders'
							element={
								<Layout user={user} showNavbar={true} footer={true}>
									{user.isLoggedIn ? <TotalOrders user={user} /> : <Navigate to='/login' />}
								</Layout>
							}
						/>
						<Route
							path='/wishlist'
							element={
								<Layout user={user} showNavbar={true} footer={true}>
									{user.isLoggedIn ? <Wishlist user={user} /> : <Navigate to='/login' />}
								</Layout>
							}
						/>
						<Route path="/product-detail/:productId"
							element={
								<Layout user={user} showNavbar={true} footer={true}>
									{user.isLoggedIn ? <ProductDetailPage user={user} /> : <Navigate to='/login' />}
								</Layout>
							}
						/>
					</>
				}
				{user.role === 'admin' &&
					<>
						<Route path='/admin'>
							<Route
								path=''
								element={
									<Layout user={user} showNavbar={true} footer={true}>
										{<AdminHome user={user} />}
									</Layout>
								}
							/>
						</Route>
					</>
				}
				{user.role === 'seller' &&
					<>
						<Route path='/seller'>
							<Route
								path=''
								element={
									<Layout user={user} showNavbar={true} footer={true}>
										{<SellerHome user={user} />}
									</Layout>
								}
							/>
						</Route>
					</>
				}
				<Route path='*' element={<h1>Page Not Found!</h1>} />
			</Routes>
		</BrowserRouter>
	)
}

export default RouterLinks
