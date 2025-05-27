"use client";

import { useAuth } from "@/context/useAuth";
import { notify } from "@/shared/components/notification/notification";
import { useGetCartQuery } from "@/store/api/artwork/cart";
import {
  useCreateDirectOrderMutation,
  useCreateOrderMutation,
} from "@/store/api/order/order";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  LoadingOverlay,
  NumberFormatter,
  Radio,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useParams, useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const checkoutSchema = z.object({
  payment_method: z.string().min(1, "Payment method is required"),
  shipping_address: z
    .object({
      street: z.string().min(1, "Street address is required"),
      city: z.string().min(1, "City is required"),
      province: z.string().min(1, "Province is required"),
      zip_code: z.string().min(1, "ZIP code is required"),
      country: z.string().default("Ethiopia"),
      email: z.string().nullable(),
      phone_number: z.string().optional().nullable(),
      additional_info: z.string().optional().nullable(),
      first_name: z.string().optional().nullable(),
      last_name: z.string().optional().nullable(),
    })
    .optional(),
});
export default function CheckoutPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const isDigital = searchParams.get("is_digital") === "true";
  const { user } = useAuth();
  const { data: cart, isLoading } = useGetCartQuery({});
  const filteredItems = cart?.items?.filter(
    (item: any) => item.artwork_id === id
  );
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shipping_address: {
        street: "",
        city: "",
        province: "",
        zip_code: "",
        country: "Ethiopia",
        email: "",
        phone_number: "",
        additional_info: "",
        first_name: user?.first_name ?? "",
        last_name: user?.last_name ?? "",
      },
      payment_method: "",
    },
  });
  const [submitOrder, { isLoading: isOrdering }] =
    useCreateDirectOrderMutation();

  const onSubmit = async (data: any) => {
    if (!filteredItems?.length) {
      notify("Error", "No items found for this artist in cart");
      return;
    }
    const payload: any = {
      payment_method: data.payment_method,
      items: filteredItems.map((item: any) => ({
        artwork_id: item.artwork_id,
        quantity: item.quantity ?? 1,
        price_at_addition: item.price_at_addition,
      })),
    };

    if (!isDigital) {
      payload.shipping_address = data.shipping_address;
    }

    try {
      const res = await submitOrder(payload).unwrap();
      notify("Success", "Order placed successfully");
      if (data?.payment_method === "chapa") {
        router.push(`/user-account/orders/${res[0]?.id}`);
      } else {
        router.push("/user-account/orders/");
      }
    } catch (err) {
      notify("Error", `Failed to place order`);
    }
  };

  return (
    <div className="min-h-screen bg-[#fefae0] p-8">
      <LoadingOverlay visible={isLoading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Billing details</h2>
            <div className="space-y-4 text-[#858585]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <TextInput
                    label="First Name"
                    placeholder="Enter your first name"
                    disabled={user?.first_name !== null}
                    className="border border-[#D5D8DE] bg-amber-50 rounded px-3 py-2 w-full"
                    value={user?.first_name}
                    {...register("shipping_address.first_name")}
                    error={errors.shipping_address?.first_name?.message}
                  />
                </div>
                <div>
                  <TextInput
                    label="Last Name"
                    placeholder="Enter your last name"
                    disabled={user?.last_name !== null}
                    className="border border-[#D5D8DE] bg-amber-50 rounded px-3 py-2 w-full"
                    value={user?.last_name}
                    {...register("shipping_address.last_name")}
                    error={errors.shipping_address?.last_name?.message}
                  />
                </div>
              </div>

              <div>
                <Controller
                  name="shipping_address.country"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Country / Region"
                      placeholder="Select your country"
                      {...field}
                      error={errors.shipping_address?.country?.message}
                      disabled
                      data={["Ethiopia"]}
                      className="border border-[#D5D8DE] rounded bg-amber-50 px-3 py-2 w-full"
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name="shipping_address.street"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      label="Street Address"
                      placeholder="Enter your street address"
                      {...field}
                      error={errors.shipping_address?.street?.message}
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name="shipping_address.city"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      label="Town/City"
                      placeholder="Enter your town or city"
                      {...field}
                      error={errors.shipping_address?.city?.message}
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name="shipping_address.province"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      label="Province"
                      placeholder="Enter your province"
                      {...field}
                      error={errors.shipping_address?.province?.message}
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name="shipping_address.zip_code"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      label="Zip code"
                      placeholder="Enter your zip code"
                      {...field}
                      error={errors.shipping_address?.zip_code?.message}
                    />
                  )}
                />
              </div>
              <div>
                <TextInput
                  label="Phone number"
                  placeholder="Enter your phone number"
                  value={user?.phone_number}
                  disabled={user?.phone_number !== null}
                  {...register("shipping_address.phone_number")}
                  error={errors.shipping_address?.phone_number?.message}
                />
              </div>

              <div>
                <TextInput
                  label="Email"
                  placeholder="Enter your email"
                  className="border border-[#D5D8DE] bg-amber-50 rounded px-3 py-2 w-full"
                  type="email"
                  value={user?.email}
                  disabled
                  {...register("shipping_address.email")}
                  error={errors.shipping_address?.email?.message}
                />
              </div>

              <div>
                <Textarea
                  label="Additional Information"
                  placeholder="Write any additional information if there are any..."
                  {...register("shipping_address.additional_info")}
                  error={errors.shipping_address?.additional_info?.message}
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Product</h2>
            {filteredItems?.map((item: any) => (
              <>
                <div className="flex justify-between mb-2">
                  <span>{item?.artwork?.title} </span>
                  <span>
                    <NumberFormatter
                      value={item?.price_at_addition}
                      thousandSeparator
                      decimalScale={2}
                      fixedDecimalScale
                      prefix={"ETB "}
                      className="text-sm"
                    />{" "}
                  </span>
                </div>
                <hr className="my-2" />
              </>
            ))}

            <div className="flex justify-between font-semibold text-[#b06c00]">
              <span>Total</span>
              {filteredItems?.map((item: any) => (
                <>
                  <span>
                    <NumberFormatter
                      value={item?.price_at_addition}
                      thousandSeparator
                      decimalScale={2}
                      fixedDecimalScale
                      prefix={"ETB "}
                      className="text-sm"
                    />
                  </span>
                </>
              ))}
            </div>
            <div className="mt-6 space-y-4 text-sm">
              <Controller
                name="payment_method"
                control={control}
                render={({ field }) => (
                  <Radio.Group
                    label="Select Payment Method"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.payment_method?.message}
                  >
                    <Radio value="chapa" label="Chapa" className="pb-2" />
                    <Radio value="cash_on_delivery" label="Cash on Delivery" />
                  </Radio.Group>
                )}
              />

              <p className="text-xs text-gray-600">
                Your personal data will be used to support your experience
                throughout the website. Read our{" "}
                <a href="#" className="underline">
                  privacy policy
                </a>
                .
              </p>
            </div>

            <Button
              type="submit"
              className="mt-6 w-full bg-[#b06c00] text-white py-2 rounded"
              loading={isOrdering}
            >
              Place Order
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
