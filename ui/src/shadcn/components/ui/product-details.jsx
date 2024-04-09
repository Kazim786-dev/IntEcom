/**
 * v0 by Vercel.
 * @see https://v0.dev/t/VcNKAK8i2LT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-3xl items-start mx-auto px-4 py-6">
      <div className="grid gap-4 items-start">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold leading-none">WhimsiMug: Sip in Style and Magic</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            </div>
          </div>
        </div>
        <div className="grid gap-4 text-sm leading-loose">
          <p>Introducing the WhimsiMug, a delightful companion for your daily sips of joy.</p>
          <p>
            The magic truly lies in the design - a burst of vibrant colors and whimsical patterns that dance across the
            mug's surface, telling a story of wonder and creativity. Every sip from the WhimsiMug is like stepping into
            a world of imagination, where the ordinary transforms into the extraordinary.
          </p>
        </div>
        <div className="text-4xl font-bold">$99</div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Button size="lg">Add to cart</Button>
          <Button size="lg" variant="outline">
            <HeartIcon className="w-4 h-4 mr-2" />
            Add to wishlist
          </Button>
        </div>
      </div>
      <div className="grid gap-6 md:gap-3 items-start">
        <div className="grid gap-4 text-sm leading-loose md:hidden">
          <p>Introducing the WhimsiMug, a delightful companion for your daily sips of joy.</p>
          <p>
            The magic truly lies in the design - a burst of vibrant colors and whimsical patterns that dance across the
            mug's surface, telling a story of wonder and creativity. Every sip from the WhimsiMug is like stepping into
            a world of imagination, where the ordinary transforms into the extraordinary.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <img
            alt="Product Image"
            className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
            height={600}
            src="/placeholder.svg"
            width={600}
          />
          <img
            alt="Product Image"
            className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
            height={600}
            src="/placeholder.svg"
            width={600}
          />
          <img
            alt="Product Image"
            className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
            height={600}
            src="/placeholder.svg"
            width={600}
          />
          <img
            alt="Product Image"
            className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
            height={600}
            src="/placeholder.svg"
            width={600}
          />
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


function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
