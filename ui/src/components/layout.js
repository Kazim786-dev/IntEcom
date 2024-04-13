// Layout.js
import React from 'react'
import NavbarComp from '../components/navbar'
import Footer from './endFooter/endFooter'
import NavBarSiderCard from './navbar-sider-card'
import NavTag from './nav-tagline'
const MemoizedNavTag = React.memo(NavTag); // MemoizedNavTag: Memoize NavTag to prevent unnecessary re-renders

const Layout = ({ showNavbar, children, user, footer }) => {
	const userPicture = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'

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
		// <>
		// 	{/* {showNavbar && <NavbarComp user={user} userPicture={userPicture}/>} */}
		// 	<NavBarSiderCard user={user}/>
		// 	{children}
		// 	<br/><br/>
		// 	{footer && <Footer/>}
		// </>
		<>
			{/* <NavBarSiderCard user={user}/> */}
			
			<div style={{ display: 'flex', minHeight: '100vh' }}>
				{/* Sidebar */}
				<NavBarSiderCard user={user} />
				{/* Main Content Area */}
				<div style={{ flex: 1 }}>
					<MemoizedNavTag/>
					{children}
				</div>
			</div>
			{/* Footer */}
			{footer && <Footer />}
		</>
	)
}

export default Layout
