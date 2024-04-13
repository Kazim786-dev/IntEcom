import React from 'react';
import { Card, Nav, Form, Button, Badge, Dropdown } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { UserIcon } from '../../static/icons/navicons.js';

import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slice/auth/user-slice'
import { empty } from '../../redux/slice/cart/cart-slice'

const NavTag = () => {

    //redux state
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        dispatch(empty())
    }

    return (
        <div className="w-full flex-1 mb-2">
            <header className="flex items-center justify-between gap-4 border-b bg-gray-100/50 p-2 px-3">
                <div className="">
                {/* text-2xl sm:text-3xl md:text-4xl */}
                    <h4 className="m-0 font-semibold tracking-tighter text-secondary">Fashion for Every Season <span className='blockquote-footer tracking-tighter animate-pulse text-primary'>where shopping meets technology</span>
                    </h4>
                    
                </div>
                <div>
                    {/* Dropdown Menu */}

                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800" size="sm" variant="light">
                            {/* <img
                                alt="Avatar"
                                className="rounded-full"
                                height="32"
                                src="/placeholder.svg"
                                style={{ aspectRatio: '32/32', objectFit: 'cover' }}
                                width="32"
                            /> */}
                            <Button className="rounded-full border border-gray-200 dark:border-gray-800 " size="icon" variant="light">
                                <UserIcon className="w-6 h-6" />
                            </Button>
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
        </div>
    )
}

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

export default NavTag