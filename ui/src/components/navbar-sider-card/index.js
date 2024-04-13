import React from 'react';
import { Card, Nav, Form, Button, Badge, Dropdown } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { Package2Icon, ShoppingBagIcon, ShoppingCartIcon, HeartIcon, UserIcon, HomeIcon } from '../../static/icons/navicons.js';
{/* <ShoppingBagIcon className="h-4 w-4" /> */}
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/slice/auth/user-slice'
import { empty } from '../../redux/slice/cart/cart-slice'

const NavBarSiderCard = ({user}) => {

    //redux state
	const dispatch = useDispatch()
    const cartProducts = useSelector((state) => state.cart.products)
    const cartLength = cartProducts.length;

    const handleLogout = () => {
        dispatch(logout())
        dispatch(empty())
    }

    const custNav = [
		// { text: 'Home', link:'/', icon: <HomeIcon className="h-4 w-4" />, badge: '12' },
		{ text: 'Home', link: '/products', icon: <HomeIcon className="h-4 w-4" /> },
		// {
		// 	text: 'Categories', icon: <BoxIcon className="h-4 w-4" />, checkbox: true,
		// 	dropdownItems: filters, checked: isChecked, onChange: handleFilterChange
		// },
		{ text: 'Cart', link: '/cart', icon: <ShoppingCartIcon className="h-4 w-4" />, badge: cartLength > 0 ? cartLength : null },
		{ text: 'Wishlist', link: '/wishlist', icon: <HeartIcon className="h-4 w-4" /> },
        { text: 'Orders', link: '/total-orders', icon: <ShoppingBagIcon className="h-4 w-4" /> },
		{ text: 'Account', dropdownItems: ['Logout'], to: '/login', icon: <UserIcon className="h-4 w-4" /> },
	]

    const navLinks = user.role=='customer' ? custNav : []


    return (
        <div className=" flex min-h-screen">
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
        </div>
    )
}


export default NavBarSiderCard