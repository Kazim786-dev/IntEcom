import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './endfooter.css'
const Footer = () => {
    return (
        <footer className="back text-white pt-4 pb-4">
            <div className="container">
                <div className="row">
                    {/* About Section */}
                    <div className="col-md-3">
                        <h5>About Us</h5>
                        <p>IntEcom offers the best shopping and selling plateform to its user. our 
                            best searching mechanism enhace the user experience for the user
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-3">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white">Home</a></li>
                            <li><a href="#" className="text-white">Shop</a></li>

                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-md-3">
                        <h5>Contact Us</h5>
                        <ul className="list-unstyled">
                            <li>Phone: +123 456 7890</li>
                            <li>Email: support@example.com</li>
                            <li>Address: 123 Street, City, Country</li>
                        </ul>
                    </div>

                    {/* Social Media Icons */}
                    <div className="col-md-3">
                        <h5>Follow Us</h5>
                        <a href="#" className="text-white me-2"><i className="bi bi-facebook"></i></a>
                        <a href="#" className="text-white me-2"><i className="bi bi-twitter"></i></a>
                        <a href="#" className="text-white me-2"><i className="bi bi-instagram"></i></a>
                        <a href="#" className="text-white"><i className="bi bi-linkedin"></i></a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="row mt-3">
                    <div className="col text-center">
                        © 2023 Your E-Commerce Store. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
