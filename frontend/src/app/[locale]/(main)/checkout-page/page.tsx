"use client";

import React from "react";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#fefae0] p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
       
        <div>
          <h2 className="text-2xl font-semibold mb-6">Billing details</h2>
          <form className="space-y-4 text-[#858585]">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-1 text-sm font-medium text-black"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  className="border border-[#D5D8DE] bg-amber-50 rounded px-3 py-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-1 text-sm font-medium text-black"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="border border-[#D5D8DE] bg-amber-50 rounded px-3 py-2 w-full"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="company"
                className="block mb-1 text-sm font-medium text-black"
              >
                Company Name (Optional)
              </label>
              <input
                id="company"
                type="text"
                placeholder="Company Name (Optional)"
                className="border border-[#D5D8DE] bg-amber-50 rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label
                htmlFor="country"
                className="block mb-1 text-sm font-medium text-black"
              >
                Country / Region
              </label>
              <select
                id="country"
                className="border border-[#D5D8DE] rounded bg-amber-50 px-3 py-2 w-full"
              >
                <option>Ethiopia</option>
                <option>Kenya</option>
                <option>USA</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="street"
                className="block mb-1 text-sm font-medium text-black"
              >
                Street Address
              </label>
              <input
                id="street"
                type="text"
                placeholder="Street address"
                className="border border-[#D5D8DE] bg-amber-50 rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label htmlFor="city" className="block mb-1 text-sm font-medium text-black">
                Town / City
              </label>
              <input
                id="city"
                type="text"
                placeholder="Town / City"
                className="border border-[#D5D8DE] bg-amber-50 rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label
                htmlFor="province"
                className="block mb-1 text-sm font-medium text-black"
              >
                Province
              </label>
              <input
                id="province"
                type="text"
                placeholder="Province"
                className="border border-[#D5D8DE] bg-amber-50 rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label htmlFor="zip" className="block mb-1 text-sm font-medium text-black">
                ZIP Code
              </label>
              <input
                id="zip"
                type="text"
                placeholder="ZIP code"
                className="border border-[#D5D8DE] bg-amber-50 rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-1 text-sm font-medium text-black">
                Phone
              </label>
              <input
                id="phone"
                type="text"
                placeholder="Phone"
                className="border border-[#D5D8DE] bg-amber-50 rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-black">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                className="border border-[#D5D8DE] bg-amber-50 rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block mb-1 text-sm font-medium text-black">
                Additional Information
              </label>
              <textarea
                id="notes"
                placeholder="Additional Information"
                className="border border-[#D5D8DE] bg-amber-50 rounded px-3 py-2 w-full"
                rows={3}
              ></textarea>
            </div>
          </form>
        </div>

      
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Product</h2>
          <div className="flex justify-between mb-2">
            <span>Grand Canal × 1</span>
            <span>ETB 5000</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between mb-1">
            <span className="text-sm">Subtotal</span>
            <span className="text-sm">ETB 5000</span>
          </div>
          <div className="flex justify-between font-semibold text-[#b06c00]">
            <span>Total</span>
            <span>ETB 5000.00</span>
          </div>
          <div className="mt-6 space-y-4 text-sm">
            <label className="flex items-start gap-2">
              <input
                type="radio"
                name="payment"
                defaultChecked
                className="mt-1"
              />
              <span>
                <strong>Direct Bank Transfer</strong>
                <br />
                Make your payment directly into our bank account. Your order
                won’t be shipped until funds are cleared.
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" className="mt-1" />
              Check Bank Transfer
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" className="mt-1" />
              Cash on Delivery
            </label>

            <p className="text-xs text-gray-600">
              Your personal data will be used to support your experience
              throughout the website. Read our{" "}
              <a href="#" className="underline">
                privacy policy
              </a>
              .
            </p>
          </div>

          <button className="mt-6 w-full bg-[#b06c00] text-white py-2 rounded">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
