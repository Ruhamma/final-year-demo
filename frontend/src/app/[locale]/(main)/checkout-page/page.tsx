"use client";

import { useAuth } from "@/context/useAuth";
import { notify } from "@/shared/components/notification/notification";
import { useGetCartQuery } from "@/store/api/artwork/cart";
import { useCreateOrderMutation } from "@/store/api/order/order";
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
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const checkoutSchema = z.object({
  payment_method: z.string().min(1, "Payment method is required"),
  shipping_address: z.object({
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
  }),
});

export default function CheckoutPage() {
  const t = useTranslations("common.Checkout");
  const router = useRouter();
  const { user } = useAuth();
  const { data: cart, isLoading } = useGetCartQuery({});
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
  const [submitOrder, { isLoading: isOrdering }] = useCreateOrderMutation();

  const onSubmit = async (data: any) => {
    console.log("Form submitted", data);
    try {
     const res =  await submitOrder(data).unwrap();
      notify("Success", t("notifications.orderPlaced"));
      if (data?.payment_method === "chapa") {
        router.push(`/user-account/orders/${res[0]?.id}`);
      } else {
        router.push("/user-account/orders/");
      }
    } catch (err) {
      notify("Error", t("notifications.orderFailed"));
    }
  };

  return (
    <div className="min-h-screen bg-[#fefae0] p-8">
      <LoadingOverlay visible={isLoading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Billing Details Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">{t("billingDetails")}</h2>
            <div className="space-y-4 text-[#858585]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <TextInput
                    label={t("firstName")}
                    placeholder={t("firstNamePlaceholder")}
                    disabled={user?.first_name !== null}
                    className="border border-[#D5D8DE] bg-amber-50 rounded px-3 py-2 w-full"
                    value={user?.first_name}
                    {...register("shipping_address.first_name")}
                    error={errors.shipping_address?.first_name?.message}
                  />
                </div>
                <div>
                  <TextInput
                    label={t("lastName")}
                    placeholder={t("lastNamePlaceholder")}
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
                      label={t("countryRegion")}
                      placeholder={t("countryPlaceholder")}
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
                      label={t("streetAddress")}
                      placeholder={t("streetPlaceholder")}
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
                      label={t("townCity")}
                      placeholder={t("townPlaceholder")}
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
                      label={t("province")}
                      placeholder={t("provincePlaceholder")}
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
                      label={t("zipCode")}
                      placeholder={t("zipPlaceholder")}
                      {...field}
                      error={errors.shipping_address?.zip_code?.message}
                    />
                  )}
                />
              </div>

              <div>
                <TextInput
                  label={t("phoneNumber")}
                  placeholder={t("phonePlaceholder")}
                  value={user?.phone_number}
                  disabled={user?.phone_number !== null}
                  {...register("shipping_address.phone_number")}
                  error={errors.shipping_address?.phone_number?.message}
                />
              </div>

              <div>
                <TextInput
                  label={t("email")}
                  placeholder={t("emailPlaceholder")}
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
                  label={t("additionalInfo")}
                  placeholder={t("additionalInfoPlaceholder")}
                  {...register("shipping_address.additional_info")}
                  error={errors.shipping_address?.additional_info?.message}
                />
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t("product")}</h2>
            {cart?.items?.map((item: any) => (
              <React.Fragment key={item.id}>
                <div className="flex justify-between mb-2">
                  <span>{item?.artwork?.title}</span>
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
                </div>
                <hr className="my-2" />
              </React.Fragment>
            ))}

            <div className="flex justify-between font-semibold text-[#b06c00]">
              <span>{t("total")}</span>
              <span>
                <NumberFormatter
                  value={cart?.total_price}
                  thousandSeparator
                  decimalScale={2}
                  fixedDecimalScale
                  prefix={"ETB "}
                  className="text-sm"
                />
              </span>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <Controller
                name="payment_method"
                control={control}
                render={({ field }) => (
                  <Radio.Group
                    label={t("paymentMethod")}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.payment_method?.message}
                  >
                    <Radio value="chapa" label={t("chapa")} className="pb-2" />
                    <Radio value="cash_on_delivery" label={t("cashOnDelivery")} />
                  </Radio.Group>
                )}
              />

              <p className="text-xs text-gray-600">
                {t.rich("privacyPolicy", {
                  privacyPolicy: (chunks) => (
                    <a href="#" className="underline">
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            </div>

            <Button
              type="submit"
              className="mt-6 w-full bg-[#b06c00] text-white py-2 rounded"
              loading={isOrdering}
            >
              {t("placeOrder")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}