"use client";
import { useState } from "react";
import { notify } from "@/shared/components/notification/notification";
import { useDeactivateAccountMutation } from "@/store/api/users/page";
import { useTranslations } from "next-intl";

const AccountDeactivationPage = () => {
  const [deactivateAccount] = useDeactivateAccountMutation();
  const [isConfirming, setIsConfirming] = useState(false);
  const t = useTranslations("common.accountDeactivation");

  const handleDeactivate = async () => {
    try {
      await deactivateAccount({}).unwrap();
      notify("Success", t("notifications.success"));
    } catch (error) {
      notify("Error", t("notifications.error"));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-[#606C38] rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        {t("pageTitle")}
      </h2>

      <div className="space-y-4 text-gray-600 dark:text-gray-300 mb-6">
        <p>{t("immediateEffects")}</p>
        <ul className="list-disc pl-5 space-y-2">
          {t.raw("effectsList").map((item: any, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{t("dataDeletion")}</p>
      </div>

      {!isConfirming ? (
        <button
          onClick={() => setIsConfirming(true)}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          {t("deleteButton")}
        </button>
      ) : (
        <div className="space-y-4">
          <p className="text-red-500 font-medium">{t("confirmation.title")}</p>
          <div className="flex space-x-4">
            <button
              onClick={handleDeactivate}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
            >
              {t("confirmation.confirmButton")}
            </button>
            <button
              onClick={() => setIsConfirming(false)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
            >
              {t("confirmation.cancelButton")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDeactivationPage;
