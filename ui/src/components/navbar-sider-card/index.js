import React, { useEffect, useState } from 'react';
import { Card, Nav, Form, Button, Badge, Dropdown } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { Package2Icon, ShoppingBagIcon, ShoppingCartIcon, HeartIcon, UserIcon, HomeIcon } from '../../static/icons/navicons.js';
{/* <ShoppingBagIcon className='h-5 w-5' /> */ }
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/slice/auth/user-slice'
import { empty } from '../../redux/slice/cart/cart-slice'

import './index.css'

const NavBarSiderCard = ({ user }) => {

    //redux state
    const dispatch = useDispatch()
    const cartProducts = useSelector((state) => state.cart.products)
    const cartLength = cartProducts.length;

    const handleLogout = () => {
        dispatch(logout())
        dispatch(empty())
    }

    useEffect(() => {
        console.log('rendered')
        console.log(activeLink)
    })

    const custNav = [
        // { text: 'Home', link:'/', icon: <HomeIcon className='h-5 w-5' />, badge: '12' },
        { text: 'Home', link: '/products', icon: <HomeIcon className='h-5 w-5' /> },
        // {
        // 	text: 'Categories', icon: <BoxIcon className='h-5 w-5' />, checkbox: true,
        // 	dropdownItems: filters, checked: isChecked, onChange: handleFilterChange
        // },
        { text: 'Cart', link: '/cart', icon: <ShoppingCartIcon className='h-5 w-5' />, badge: cartLength > 0 ? cartLength : null },
        { text: 'Wishlist', link: '/wishlist', icon: <HeartIcon className='h-5 w-5' /> },
        { text: 'Orders', link: '/total-orders', icon: <ShoppingBagIcon className='h-5 w-5' /> },
        { text: 'Account', dropdownItems: ['Logout'], to: '/login', icon: <UserIcon className='h-5 w-5' /> },
    ]

    const navLinks = user.role == 'customer' ? custNav : []

    const [activeLink, setActiveLink] = useState(null);

    return (
        <div className=' flex min-h-screen bg-slate-100'>
            <div className='rounded-0 p-4 border'>
                {/* Company Logo and Name */}
                <div className='flex items-center gap-2 font-semibold mb-5'>
                    <Package2Icon className='h-6 w-6' />
                    <span>IntEcom</span>
                </div>

                {/* Sidebar Navigation */}
                <div className='flex flex-col p-0 gap-1 text-md font-medium pe-4'>
                    {navLinks.map((item, index) => (
                        <>

                            <Link
                                key={index}
                                to={item.link}
                                className={`navbar-link px-2 text-decoration-none rounded  ${activeLink === index ? 'cust-nav-active-link' : ''
                                    }`}
                                onClick={() => setActiveLink(index)}
                            >
                                {item.dropdownItems ? (
                                    // <div className='flex items-center'>
                                    <Dropdown className=''>
                                        {/* as={Nav.Link} */}
                                        <Dropdown.Toggle as={Nav.Link} className='p-0 custom-dropdown-toggle'>
                                            {/* <div className='flex items-center'> */}
                                            <div className={`flex gap-3 items-center`}>
                                                {item.icon && (
                                                    item.icon
                                                )}
                                                <span className='text-black'>{item.text}</span>

                                                {item.badge && (
                                                    <Badge className='bg-primary ml-auto rounded-circle p-1'>
                                                        {item.badge}
                                                    </Badge>
                                                )}
                                            </div>

                                        </Dropdown.Toggle>
                                        {item.dropdownItems && item.dropdownItems.length > 0 &&
                                            <Dropdown.Menu className='py-1 w-25'>
                                                {/* Render dropdown menu items */}
                                                {item.dropdownItems.map((dropdownItem, subIndex) => (
                                                    <Dropdown.Item key={subIndex} className=''>
                                                        {item.checkbox ? ( // Check if dropdownItem has checkbox property
                                                            <Form.Check
                                                                type='checkbox'
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
                                    <div className={`flex gap-3 items-center`}>
                                        {item.icon && (
                                            item.icon
                                        )}
                                        <span className='text-black'>{item.text}</span>

                                        {item.badge && (
                                            <Badge className='bg-primary ml-auto rounded-circle p-1'>
                                                {item.badge}
                                            </Badge>
                                        )}
                                    </div>
                                )}
                            </Link>
                            <hr className='my-2' />
                        </>
                    ))}
                </div>
            </div>
            {/* </Card> */}
        </div>
    )
}


export default NavBarSiderCard