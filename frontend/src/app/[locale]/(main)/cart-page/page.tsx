'use client'
import React from "react";
import { useGetCartQuery, useRemoveCartItemMutation } from "@/store/api/artwork/cart";
import { Image, LoadingOverlay, NumberFormatter } from "@mantine/core";
import { notify } from "@/shared/components/notification/notification";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const route= useRouter();
  const {data: cart, isLoading} = useGetCartQuery({});
  const [removeFromCat]=useRemoveCartItemMutation();
 
  const handleRemoveFromCart =async (id: string) => {
    try {
      await removeFromCat(id).unwrap();;
      notify('Success', 'Item removed from cart');
    } catch (error) {
      notify('Error', 'Failed to remove item from cart');
    }
  }
  return (
    <div className="min-h-screen bg-[#fdf8e6] p-8 text-[#2a2a2a] font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
   
        <div>
          <h1 className="text-3xl font-bold mb-2">Your cart</h1>
          <p className="mb-6 text-sm">
            Not ready to checkout?{" "}
            <span className="underline cursor-pointer" onClick={()=>route.push("/")}>Continue Shopping</span>
          </p>
          <div className="flex flex-col gap-8">
            <LoadingOverlay visible={isLoading} />
             {cart?.items?.map((item:any) => (
            <div className="flex items-start gap-4 border-t border-b pt-4 pb-6" key={item?.id}>
              <Image
                src={item?.artwork?.images[0]?.url} 
                alt={item?.artwork?.title}
                width={120}
                height={150}
                className="h-full"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item?.artwork?.title}</h2>
                <p className="text-sm">Size: {item?.artwork?.size?.width} x  {item?.artwork?.size?.height}  {item?.artwork?.size?.unit}</p>
                <p className="mt-2 font-semibold text-lg">
                  <NumberFormatter
                        value={item?.price_at_addition}
                        thousandSeparator
                        decimalScale={2}
                        fixedDecimalScale
                        prefix={'ETB '}
                        className='text-sm'
                    /></p>
                <p className="text-xs text-right">
                  by Bilen Assefa{" "}
                  <span className="ml-2 text-blue-500 cursor-pointer" onClick={() => handleRemoveFromCart(item?.id)}>
                    Remove
                  </span>
                </p>
              </div>
            </div>))}
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
            <span>ETB {item?.total_price}</span>
          </div>
          <div className="flex justify-between text-sm mb-2 border-b">
            <span>Total</span>
            <span>ETB {item?.total_price}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span>Shipping</span>
            <span className="text-gray-600">Calculated at the next step</span>
          </div>

          <button className="w-full bg-[#b5641b] hover:bg-[#9e5211] text-white font-semibold py-2 px-4 cursor-pointer" onClick={()=>route.push("/checkout-page")}>
            Continue to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
