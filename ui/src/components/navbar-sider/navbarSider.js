// import React from 'react';
// import { Card, Nav, Form, Button, Badge } from 'react-bootstrap';
// import { SearchIcon, Package2Icon, HomeIcon, PackageIcon, BoxIcon, ShoppingCartIcon, UserIcon } from '../../static/icons/navicons.js'; // Assuming icons are imported from a local file
// import { NavLink } from 'react-router-dom';

// const NavbarSider = () => {

//     return (
//         <div className="flex min-h-screen">
//             {/* Sidebar */}
//             <Card className="rounded-0 p-4 flex flex-col">
//                 {/* Company Logo and Name */}
//                 <div className="flex items-center gap-2 font-semibold mb-5">
//                     <Package2Icon className="h-6 w-6" />
//                     <span>IntEcom</span>
//                 </div>

//                 {/* Sidebar Navigation */}
//                 <Nav className="flex flex-col p-0 gap-2 text-sm font-medium">
//                     {[
//                         { text: 'Home', link:'/', icon: <HomeIcon className="h-4 w-4" />, badge: '12' },
//                         { text: 'Products', link:'/products', icon: <PackageIcon className="h-4 w-4" /> },
//                         { text: 'Categories', link:'/', icon: <BoxIcon className="h-4 w-4" /> },
//                         { text: 'Cart', link:'/', icon: <ShoppingCartIcon className="h-4 w-4" /> },
//                         { text: 'Account', link:'/', icon: <UserIcon className="h-4 w-4" /> },
//                     ].map((item, index) => (
//                         <NavLink
//                             key={index}
//                             // className="flex items-center rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
//                             to={item.link}
//                             activeClassName="active-link" // Class to apply when link is active
//                             className="navbar-link p-2 text-decoration-none hover:text-black active:bg-gray-100 active:rounded"
//                         >
//                             <div className="flex items-center"> {/* Container for icon, text, and badge */}
//                                 {item.icon && (
//                                     <span className="mr-2">{item.icon}</span> /* Icon with right margin */
//                                 )}
//                                 <span className='text-black'>{item.text}</span> {/* Text */}
//                                 {item.badge && (
//                                     <Badge className='bg-black ml-auto rounded-circle p-1'><span className='p-0 m-0'>{item.badge}</span></Badge>
//                                     // <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 dark:bg-gray-50">
//                                     //     {item.badge}
//                                     // </span>
//                                 )}
//                             </div>
//                         </NavLink>
//                     ))}
//                 </Nav>
//             </Card>

//             {/* Main Content */}
//             <div className="w-full flex-1">
//                 {/* Header */}
//                 <header className="flex items-center justify-between gap-4 border-b bg-gray-100/50 p-2 ps-4">
//                     <div className='relative flex items-center' style={{width:'100%'}}>
//                         {/* <Package2Icon className="h-6 w-6 mr-5" /> */}
//                         <Form className="w-full md:w-1/3">
//                             <SearchIcon className="absolute left-7.5 top-2.5 ms-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
//                             <Form.Control
//                                 className=" bg-white shadow-none ps-5 dark:bg-gray-950"
//                                 // style={{width:'110%'}}
//                                 type="search"
//                                 placeholder="Search products..."
//                             />
//                         </Form>
//                     </div>
//                     <div>
//                         {/* Dropdown Menu */}
//                         <Button className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800" size="sm" variant="light">
//                             <img
//                                 alt="Avatar"
//                                 className="rounded-full"
//                                 height="32"
//                                 src="/placeholder.svg"
//                                 style={{ aspectRatio: '32/32', objectFit: 'cover' }}
//                                 width="32"
//                             />
//                             <span className="sr-only">Toggle user menu</span>
//                         </Button>
//                         {/* Dropdown Menu Content (to be implemented) */}
//                     </div>
//                 </header>

//                 {/* Main Content Area */}
//                 <main className="flex-1 p-4 md:p-6">
//                     {/* Main content goes here */}
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default NavbarSider;


import React from 'react';
import { Card, Nav, Form, Button, Badge, Dropdown } from 'react-bootstrap';
import { SearchIcon, Package2Icon } from '../../static/icons/navicons.js';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/slice/auth/user-slice'
import { empty } from '../../redux/slice/cart/cart-slice'
import { useState } from 'react';

const NavbarSider = ({ children, navLinks = [], showSearch = true, onChange, value, ref }) => {

    const dispatch = useDispatch()
    const cartProducts = useSelector((state) => state.cart.products)

    const location = useLocation();

    const handleLogout = () => {
        dispatch(logout())
        dispatch(empty())
    }

    return (
        <div className=" flex min-h-screen">
            {/* Sidebar */}
            {/* <Card className="rounded-0 p-4 flex flex-col"> */}
            <div className="rounded-0 p-4 border">
                {/* Company Logo and Name */}
                <div className="flex items-center gap-2 font-semibold mb-5">
                    <Package2Icon className="h-6 w-6" />
                    <span>IntEcom</span>
                </div>

                {/* Sidebar Navigation */}
                <Nav className="flex flex-col p-0 gap-2 text-sm font-medium">
                    {navLinks.map((item, index) => (
                        <NavLink
                        key={index}
                        to={item.link}
                        // activeClassName="active-link"
                        className="navbar-link p-2 text-decoration-none hover:text-black active:bg-gray-100 active:rounded"
                    >
                            {item.dropdownItems ? (
                                // <div className="flex items-center">
                                <Dropdown drop={'end'} className=''>
                                    {/* as={Nav.Link} */}
                                    <Dropdown.Toggle as={Nav.Link} className="p-0 custom-dropdown-toggle">
                                        {/* <div className='flex items-center'> */}
                                        <div className='d-inline-flex align-items-center'>
                                            {item.icon && (
                                                <span className="mr-2">{item.icon}</span> /* Icon with right margin */
                                            )}
                                            <span className='text-black'>{item.text}</span> {/* Text */}
                                            {item.badge && (
                                                <Badge className='bg-black ml-auto rounded-circle p-1'><span className='p-0 m-0'>{item.badge}</span></Badge>
                                            )}
                                        </div>
                                    </Dropdown.Toggle>
                                    {item.dropdownItems && item.dropdownItems.length > 0 &&
                                        <Dropdown.Menu className='py-1'>
                                            {/* Render dropdown menu items */}
                                            {item.dropdownItems.map((dropdownItem, subIndex) => (
                                                <Dropdown.Item key={subIndex} className=''>
                                                    {item.checkbox ? ( // Check if dropdownItem has checkbox property
                                                        <Form.Check
                                                            type="checkbox"
                                                            label={dropdownItem}
                                                            checked={() => item.checked(dropdownItem)} // Check if the filter is in selectedFilters
                                                            onChange={() => item.onChange(dropdownItem)}
                                                        />
                                                    ) : (
                                                        <Link to={item.to} className='text-decoration-none' onClick={handleLogout}>{dropdownItem}</Link>
                                                    )
                                                    }
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    }
                                </Dropdown>
                                // </div>
                            ) : (
                                <div className="flex items-center">
                                    {item.icon && (
                                        <span className="mr-2">{item.icon}</span>
                                    )}
                                    <span className="text-black mr-1">{item.text}</span>
                                    {/* {item.badge && console.log(item.badge>0)} */}
                                    {item.badge && (
                                        <Badge className="bg-black ml-auto rounded-circle p-1">
                                            <span className="p-0 m-0">{item.badge}</span>
                                        </Badge>
                                    )}
                                </div>
                            )
                            }
                        </NavLink>
                    ))}
                </Nav>
            </div>
            {/* </Card> */}

            {/* Main Content */}
            <div className="w-full flex-1">
                {/* Header */}
                <header className="flex items-center justify-between gap-4 border-b bg-gray-100/50 p-2 ps-4">
                    {showSearch && (
                        <div className="relative flex items-center w-full">
                            <Form className="w-full md:w-1/3">
                                <SearchIcon className="absolute left-7.5 top-2.5 ms-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <Form.Control
                                    className="bg-white shadow-none ps-5 dark:bg-gray-950"
                                    // type="search"
                                    type='text'
                                    value={value}
                                    onChange={onChange}
                                    ref={ref}
                                    placeholder="Search products..."
                                />
                            </Form>
                        </div>
                    )}
                    {!showSearch && (
                        <header 
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'center', 
                          alignItems: 'center', 
                          padding: '10px', 
                          fontSize: '15px',
                        }}
                      >
                        <h5 style={{ 
                            color: '#005A9C',
                            fontStyle: 'italic', 
                            margin: 0 
                          }}
                        >
                          Where Quality Meets Innovation
                        </h5>
                      </header>
                    )}
                    <div>
                        {/* Dropdown Menu */}

                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800" size="sm" variant="light">
                                <img
                                    alt="Avatar"
                                    className="rounded-full"
                                    height="32"
                                    src="/placeholder.svg"
                                    style={{ aspectRatio: '32/32', objectFit: 'cover' }}
                                    width="32"
                                />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='shadow-sm py-1' size="xs">
                                <Dropdown.Item as={Link} className='text-decoration-none' onClick={handleLogout} to="/login">
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>

                        </Dropdown>


                        {/* Dropdown Menu Content (to be implemented) */}
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-4 md:p-6" style={{ overflow: 'auto'}}>
                    {/* Render children components passed as props */}
                    <div style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'auto' }}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

// CustomToggle component to render the toggle without the arrow
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Button
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        style={{ border: 'none', background: 'none', padding: 0 }} // Customize the button styles
    >
        {children}
    </Button>
));

CustomToggle.displayName = 'CustomToggle';

export default NavbarSider;
