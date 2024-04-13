import React from "react";
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

const SignIn = () => {
    return (
        <div className="w-full overflow-hidden">
            <div className="relative grid items-center justify-center w-full min-h-screen gap-10 lg:grid-cols-2 xl:gap-0">
                <div className="hidden lg:flex items-center justify-center">
                    <img
                        alt="Product"
                        className="aspect-[600/374] object-cover"
                        height="374"
                        src="/placeholder.svg"
                        width="600"
                    />
                </div>
                <div className="flex items-center justify-center p-6 lg:p-10">
                    <div className="mx-auto w-full max-w-md space-y-8">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold" style={{color: '#005A9C',
                            fontStyle: 'italic', }}>Welcome to IntEcom</h1>
                            <p className="text-gray-500 dark:text-gray-400">The best products delivered to your door</p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email">Email</label>
                                <input className="mt-1" id="email" placeholder="m@example.com" type="email" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password">Password</label>
                                <input className="mt-1" id="password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Button className="w-full">Sign in</Button>
                            </div>
                            <div className="flex items-center space-x-2">
                                {/* <Checkbox id="remember-me" /> */}
                                <label className="text-sm" htmlFor="remember-me">
                                    Remember me
                                </label>
                            </div>
                            <div className="grid gap-2">
                                <Link className="text-sm underline" href="#">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 grid gap-2 text-center dark:border-gray-800">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Don&apos;t have an account?
                                <Link className="underline underline-offset-2" href="#">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn