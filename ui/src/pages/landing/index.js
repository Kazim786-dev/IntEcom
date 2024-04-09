import React from "react";
import Button from 'react-bootstrap/Button';
import { Form, Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <>
            <section className="w-full pt-8 md:pt-16 lg:pt-24 border-t">
                <div className="container space-y-4 px-4 text-center md:px-6">
                    <div className="space-y-2">
                        <h1
                            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none lg:text-6xl">
                            Welcome to IntEcom
                        </h1>
                        <p
                            className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            The best place to find amazing deals on your favorite products.
                        </p>
                    </div>
                    <div className="space-y-4 mt-4">
                        <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Lets get started. Sign in or create your account
                        </p>
                    </div>
                    <div className="grid max-w-sm gap-2 mx-auto">
                        <Link className="btn btn-primary" to={'/login'}>
                        Sign in
                        </Link>
                        <Link className="btn" to={'/signup'}>
                        Create an account
                        </Link>
                    </div>
                </div>
            </section>
            <section className="w-full py-8 md:py-16 lg:py-24">
                <div
                    className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why choose IntEcom?</h2>
                        <p
                            className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            We are dedicated to providing the best shopping experience. Here is what sets us apart.
                        </p>
                    </div>
                    <div
                        className="mx-auto grid max-w-5xl items-start gap-6 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3">
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <ShoppingCartIcon className="w-20 h-20 rounded-full bg-gray-100 p-2 dark:bg-gray-800" />
                            <div className="space-y-2">
                                <h3 className="font-bold text-primary">Fast Shipping</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Get your items quickly with our expedited shipping options.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <CreditCardIcon className="w-20 h-20 rounded-full bg-gray-100 p-2 dark:bg-gray-800" />
                            <div className="space-y-2">
                                <h3 className="font-bold text-primary">Secure Payments</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Shop with confidence. Your payments are always secure with us.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <HelpCircleIcon className="w-20 h-20 rounded-full bg-gray-100 p-2 dark:bg-gray-800" />
                            <div className="space-y-2">
                                <h3 className="font-bold text-primary">24/7 Support</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Need help? Our customer service team is available around the clock.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 border-t">
                <div className="container space-y-4 px-4 text-center md:px-6">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            Experience the workflow the customers love the most.
                        </h2>
                        <p
                            className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Let our team focus on shipping
                        </p>
                    </div>
                    <div className="mx-auto w-full max-w-sm space-y-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Sign up to get notified when we launch.
                            <Link className="underline underline-offset-2" href="#">
                                Terms & Conditions
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
            <footer
                className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Acme Inc. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </>
    )
}


function MountainIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>)
    );
}


function ShoppingCartIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path
                d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>)
    );
}


function CreditCardIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
        </svg>)
    );
}


function HelpCircleIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
        </svg>)
    );
}

export default LandingPage