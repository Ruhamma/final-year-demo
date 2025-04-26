import React from "react";
import Image from "next/image";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#fdf8e6] p-8 text-[#2a2a2a] font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
   
        <div>
          <h1 className="text-3xl font-bold mb-2">Your cart</h1>
          <p className="mb-6 text-sm">
            Not ready to checkout?{" "}
            <span className="underline cursor-pointer">Continue Shopping</span>
          </p>
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4 border-t border-b pt-4 pb-6">
              <Image
                src="/images/image 1.png"
                alt="Grand Canal"
                width={120}
                height={150}
                className="h-full"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-lg">Grand Canal</h2>
                <p className="text-sm">Size: 120 X 150 cm</p>
                <p className="text-sm">Quantity: 1</p>
                <p className="mt-2 font-semibold text-lg">ETB 5,000</p>
                <p className="text-xs text-right">
                  by Bilen Assefa{" "}
                  <span className="ml-2 text-blue-500 cursor-pointer">
                    Remove
                  </span>
                </p>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-bold text-lg mb-2 border-b ">
                Order Information
              </h3>

              <div className="mb-4">
                <details className="border-b border-gray-300">
                  <summary className="cursor-pointer px-4 py-2 font-medium">
                    Return Policy
                  </summary>
                  <p className="px-4 py-2 text-sm text-gray-700">
                    This is our example return policy which is everything you
                    need to know about our returns.
                  </p>
                </details>
              </div>

              <div className="mb-4">
                <details className="border-b border-gray-300">
                  <summary className="cursor-pointer px-4 py-2 font-medium">
                    Shipping Options
                  </summary>
                </details>
              </div>

              <div>
                <details className="border-b border-gray-300">
                  <summary className="cursor-pointer px-4 py-2 font-medium">
                    Shipping Options
                  </summary>
                </details>
              </div>
            </div>
          </div>
        </div>

     
        <div className=" p-6 rounded-md h-fit">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>

          <input
            type="text"
            placeholder="Enter coupon code here"
            className="w-full border border-gray-300 bg-amber-50 rounded-md px-4 py-2 mb-4"
          />

          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>ETB 5000</span>
          </div>
          <div className="flex justify-between text-sm mb-2 border-b">
            <span>Total</span>
            <span>ETB 5000</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span>Shipping</span>
            <span className="text-gray-600">Calculated at the next step</span>
          </div>

          <button className="w-full bg-[#b5641b] hover:bg-[#9e5211] text-white font-semibold py-2 px-4">
            Continue to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
