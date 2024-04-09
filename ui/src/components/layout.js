// Layout.js
import React from 'react'
import NavbarComp from '../components/navbar'
import NavbarSider from './navbar-sider/navbarSider'
import Footer from './endFooter/endFooter'

const Layout = ({ showNavbar, children, user, footer}) => {
	const userPicture='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'

	// const custNavLinks = [
	// 	// { text: 'Home', link:'/', icon: <HomeIcon className="h-4 w-4" />, badge: '12' },
	// 	{ text: 'Products', link:'/products', icon: <PackageIcon className="h-4 w-4" /> },
	// 	{ text: 'Categories', link:'/', icon: <BoxIcon className="h-4 w-4" />, badge: '12' },
	// 	{ text: 'Cart', link:'/', icon: <ShoppingCartIcon className="h-4 w-4"/>, badge: '12' },
	// 	{ text: 'Account', link:'/', icon: <UserIcon className="h-4 w-4" /> },
	// 	{ text: 'Wishlist', link:'/', icon: <HeartIcon className="h-4 w-4" /> },
	// ]

	// const isCustomer = user.role=='customer'
	// const navLinks = isCustomer ? custNavLinks : custNavLinks

	return (
		<>
			{/* {showNavbar && <NavbarComp user={user} userPicture={userPicture}/>} */}
			{children}
			<br/><br/>
			{footer && <Footer/>}
		</>
	)
}

export default Layout
