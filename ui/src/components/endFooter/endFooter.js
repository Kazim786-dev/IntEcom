import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './endfooter.css'
import facebookIcon from '../../static/images/twitter.png';
import instagramIcon from '../../static/images/insta.png';
import linkedinIcon from '../../static/images/in.png';
const Footer = () => {
    return ( //rgb(117, 36, 36)
        <footer className="main-footer text-white pt-4 pb-4">
            <div className="container">
                <div className="row">
                    {/* About Section */}
                    <div className="col-md-3">
                        <h5>About Us</h5>
                        <p>IntEcom offers the best shopping and selling platform to its users. Our 
                            best searching mechanism enhancing the user experience.
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
                            <li>Email: i202310@nu.edu.pk</li>
                            <li>Address: 123 Street, Islamabad, Pakistan</li>
                        </ul>
                    </div>

                    {/* Social Media Icons */}
                    <div className="col-md-3">
                    <h5>Follow Us</h5>
                    <a href="https://twitter.com/?lang=en" className="text-white me-2">
                        <img style={{height:'45px'}} src={facebookIcon} alt="Facebook" />
                    </a>
                    <a href="https://www.instagram.com/" className="text-white me-2">
                        <img style={{height:'45px'}} src={instagramIcon} alt="Instagram" />
                    </a>
                    <a href="https://pk.linkedin.com/" className="text-white">
                        <img style={{height:'45px'}} src={linkedinIcon} alt="LinkedIn" />
                    </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="row mt-3">
                    <div className="col text-center">
                        © 2023 IntECom Store. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
