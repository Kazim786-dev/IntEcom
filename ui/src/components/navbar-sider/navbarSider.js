
import React from 'react';
import { Card, Nav, Form, Button, Badge, Dropdown } from 'react-bootstrap';
import { SearchIcon, Package2Icon } from '../../static/icons/navicons.js';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/slice/auth/user-slice'
import { empty } from '../../redux/slice/cart/cart-slice'
import { useState } from 'react';

const NavbarSider = ({ children, user, onChange, value, ref }) => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        dispatch(empty())
    }

    return (
        <div className=" flex min-h-screen">
            {/* Sidebar */}
            {/* <Card className="rounded-0 p-4 flex flex-col"> */}
            
            {/* sider */}

            {/* Main Content */}
            <div className="w-full flex-1">
                {/* Header */}
                <header className="flex items-center justify-between gap-4 border-b bg-gray-100/50 p-2 ps-4">
                    {/* {user.role=='customer' && (
                        <div className="relative flex items-center w-full">
                            <Form className="w-full md:w-1/3">
                                <SearchIcon className="absolute left-7.5 top-2.5 ms-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <Form.Control
                                    className="bg-white shadow-none ps-5 dark:bg-gray-950"
                                    type='text'
                                    value={value}
                                    onChange={onChange}
                                    ref={ref}
                                    placeholder="Search products..."
                                />
                            </Form>
                        </div>
                    )} */}
                    {/* {!showSearch && (
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
                    )} */}
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
