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
	
	return (
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
