'use client'
import { useState } from "react";
import { notify } from "@/shared/components/notification/notification";
import { useDeactivateAccountMutation } from "@/store/api/artist/profile";
import { Button } from "@mantine/core";
import { IconTrash, IconX } from "@tabler/icons-react";

const AccountDeactivationPage = () => {
  const [deactivateAccount, { isLoading: isDeleting }] = useDeactivateAccountMutation();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDeactivate = async () => {
    try {
      await deactivateAccount({}).unwrap();
      notify("Success", "Account deactivated, Your account will be permanently deleted after 10 days.");
    } catch (error) {
      notify("Error", "Deactivation failed, Could not deactivate your account.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-[#606C38]/80 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Delete Your Account
      </h2>
      
      <div className="space-y-4 text-gray-600 dark:text-gray-300 mb-6">
        <p>This will immediately:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Deactivate your account</li>
          <li>Remove your profile from public view</li>
          <li>Prevent you from logging in</li>
        </ul>
        <p>Your data will be <span className="font-semibold">permanently deleted after 10 days</span>.</p>
      </div>

      {!isConfirming ? (
        <button
          onClick={() => setIsConfirming(true)}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          Delete My Account
        </button>
      ) : (
        <div className="space-y-4">
          <p className="text-white font-medium">Are you absolutely sure?</p>
          <div className="flex space-x-4">
            <Button
              onClick={handleDeactivate}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
              loading={isDeleting}
              color="red"
              leftSection={<IconTrash size={16}/>}
            >
              Yes, Delete Account
            </Button>
            <Button
              onClick={() => setIsConfirming(false)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
              disabled={isDeleting}
              leftSection={<IconX size={16}/>}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDeactivationPage;