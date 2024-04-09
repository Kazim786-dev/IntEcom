/**
 * v0 by Vercel.
 * @see https://v0.dev/t/hL3ngUKXf4u
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="border border-gray-200 rounded-lg w-full max-w-sm p-0 overflow-hidden dark:border-gray-800">
      <div className="grid gap-4 p-4">
        <Link className="aspect-video overflow-hidden" href="#">
          <img
            alt="Product Image"
            className="aspect-video object-cover w-full overflow-hidden"
            height={400}
            src="/placeholder.svg"
            width={400}
          />
          <span className="sr-only">View</span>
        </Link>
        <div className="grid gap-2">
          <Link className="text-base font-medium line-clamp-2 hover:underline" href="#">
            WhimsiMug: Sip in Style and Magic
          </Link>
          <p className="text-base font-medium">$99</p>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="grid gap-4 p-4">
          <Button className="w-full" size="md">
            <ShoppingCartIcon className="w-4 h-4 mr-2" />
            Add to cart
          </Button>
          <Button className="w-full" size="md" variant="outline">
            <HeartIcon className="w-4 h-4 mr-2" />
            Add to wishlist
          </Button>
        </div>
      </div>
    </div>
  )
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
