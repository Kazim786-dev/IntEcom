// Layout.js
import React from 'react'
import NavbarComp from '../components/navbar'
import Footer from './endFooter/endFooter'
import NavBarSiderCard from './navbar-sider-card'
const MemoizedNavBarSiderCard = React.memo(NavBarSiderCard)
import NavTag from './nav-tagline'
const MemoizedNavTag = React.memo(NavTag); // MemoizedNavTag: Memoize NavTag to prevent unnecessary re-renders
import Chatbot from './chatbot'
const Layout = ({ showNavbar, children, user, footer }) => {
	const userPicture = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'

	return (
		// <>
		// 	{/* {showNavbar && <NavbarComp user={user} userPicture={userPicture}/>} */}
		// 	<NavBarSiderCard user={user}/>
		// 	{children}
		// 	<br/><br/>
		// 	{footer && <Footer/>}
		// </>
		<>
			
			<div style={{ display: 'flex', maxHeight: '90%' }}>
				{/* Sidebar */}
                {user && user.role === 'customer' && <MemoizedNavBarSiderCard user={user} />}
				{/* Main Content Area */}
				<div style={{ flex: 1 }}>
					<MemoizedNavTag user={user} />
					{children}
					{user && user.role === 'customer' && <Chatbot/>}
				</div>
			</div>
			{/* Footer */}
			{footer && <Footer />}
		</>
	)
}

export default Layout
