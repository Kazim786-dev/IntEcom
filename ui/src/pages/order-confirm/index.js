

// export default function Component() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-12 space-y-4 text-center">
//       <div className="w-full max-w-[400px] space-y-2">
//         <div className="space-y-2">
//           <PackageIcon className="mx-auto h-12 w-12 text-gray-500 dark:text-gray-400" />
//           <h1 className="font-bold text-3xl">Thank you for your order!</h1>
//           <p className="text-gray-500 dark:text-gray-400">Your order has been confirmed and will be processed soon.</p>
//         </div>
//         <Card className="p-4 space-y-4">
//           <div className="grid grid-cols-2 gap-4 text-sm">
//             <div className="font-medium">Order number</div>
//             <div className="text-right">#1234567890</div>
//             <div className="font-medium">Date</div>
//             <div className="text-right">April 12, 2023, 10:30 AM</div>
//           </div>
//           {/* <Separator /> */}
//           <hr/>
//           <div className="space-y-2">
//             <h2 className="font-semibold text-lg">Items</h2>
//             <div className="grid grid-cols-3 gap-2 text-sm">
//               <div className="font-medium">2x T-Shirt</div>
//               <div className="text-right">$50.00</div>
//               <div className="col-span-2 text-gray-500 dark:text-gray-400">Comfortable and stylish t-shirt</div>
//             </div>
//           </div>
//           <hr/>
//           {/* <Separator /> */}
//           <div className="space-y-2">
//             <h2 className="font-semibold text-lg">Shipping address</h2>
//             <div className="grid grid-cols-2 gap-2 text-sm">
//               <div className="font-medium">John Doe</div>
//               <div className="text-right">+1 123 456 7890</div>
//               <div className="col-span-2">123 Street, City, Country</div>
//             </div>
//           </div>
//         </Card>
//         <div className="flex flex-col gap-1">
//           <Button>Track my order</Button>
//           <Link className="underline" href="#">
//             Return to shop
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// function PackageIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m7.5 4.27 9 5.15" />
//       <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
//       <path d="m3.3 7 8.7 5 8.7-5" />
//       <path d="M12 22V12" />
//     </svg>
//   )
// }

// === styles.css ===

// body {
//   font-family: var(--font-inter), sans-serif;
// }

// h1, h2, h3, h4, h5, h6 {
//   font-family: var(--font-inter), sans-serif;
// }


// import { Inter } from 'next/font/google'
// import { Inter } from 'next/font/google'
// import './styles.css'

// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-inter',
// })
// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-inter',
// })

// export default function Layout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.variable + inter.variable}>
//         {children}
//       </body>
//     </html>
//   )
// }



import React from "react";
import PackageIcon from "../../static/icons/package";
import { Card, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns'; // Import the format function from date-fns


const OrderConfirm = () => {

    const location = useLocation();
    const { shippingInfo, total, products, phone } = location.state
    const currentDate = new Date();
    // Format the current date and time into the desired format
    const formattedDateTime = format(currentDate, "MMMM d, yyyy, h:mm a");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 space-y-4 text-center">
            <div className="w-full max-w-[400px] space-y-2">
                <div className="space-y-2">
                    <PackageIcon className="mx-auto h-12 w-12 text-primary dark:text-primary" />
                    <h1 className="font-bold text-primary text-3xl">Thank you for your order!</h1>
                    <p className="text-gray-200 dark:text-gray-200">Your order has been confirmed and will be processed soon.</p>
                </div>
                <Card className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="font-medium">Order number</div>
                        <div className="text-right">#TVwNGxXBg</div>
                        <div className="font-medium">Total</div>
                        <div className="text-right">PKR {total.toFixed(2)}</div>
                        <div className="font-medium">Date</div>
                        {/* <div className="text-right">April 12, 2023, 10:30 AM</div> */}
                        <div className="text-right">{formattedDateTime}</div>
                    </div>
                    {/* <Separator /> */}
                    <hr />
                    <div className="space-y-2">
                        <h2 className="font-semibold text-lg text-primary">Items</h2>
                        {products.map((product) => (
                            <div key={product.id} className="gap-4 text-sm">
                                <Row className="">
                                    <Col md={'auto'} className="font-medium">
                                        <span>
                                            {product.quantity}x {product.name.substring(0, 20)}...
                                        </span>
                                    </Col>
                                    <Col className="text-right">PKR {(product.price * product.quantity).toFixed(2)}</Col>
                                </Row>
                                <Row className="text-gray-500 dark:text-gray-400">
                                    <Col className="text-left">
                                        {product.name.substring(0, 50)}..
                                    </Col>
                                </Row>

                            </div>
                        ))}
                    </div>
                    <hr />
                    {/* <Separator /> */}
                    <div className="space-y-2">
                        <h2 className="font-semibold text-lg text-primary">Shipping Details</h2>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="font-medium">{shippingInfo.name}</div>
                            <div className="text-right">{phone}</div>
                            <div className="col-span-2"> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.country}</div>
                        </div>
                    </div>
                </Card>
                <div className="flex flex-col gap-1">
                    <Link className="underline" to="/products">
                        Return to shop
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirm