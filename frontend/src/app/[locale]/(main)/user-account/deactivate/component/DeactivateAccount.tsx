// components/account/DeactivateAccount.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeactivateAccountMutation } from "@/store/api/users/page";
import { notify } from "@/shared/components/notification/notification";

export const DeactivateAccount = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [password, setPassword] = useState("");
   const [deactivateAccount,{isLoading}] = useDeactivateAccountMutation();

  const router = useRouter();

 const handleSubmit = async () => {
    try {
      await deactivateAccount({}).unwrap();
      notify("Success", "Account deactivated, Your account will be permanently deleted after 10 days.");
    } catch (error) {
      notify("Error", "Deactivation failed, Could not deactivate your account.");
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Delete Your Account
      </h2>

      <div className="space-y-4 text-gray-600 dark:text-gray-300 mb-6">
        <p className="font-medium">This action cannot be undone. This will:</p>
        
        <ul className="list-disc pl-5 space-y-2">
          <li>Immediately deactivate your account</li>
          <li>Remove all your content from public view</li>
          <li>Schedule permanent deletion in 10 days</li>
        </ul>

        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
          <p className="text-red-600 dark:text-red-300 font-medium">
            Warning: After 10 days, all your data will be permanently erased.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="confirmation"
              type="checkbox"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <label
            htmlFor="confirmation"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I understand that this action is irreversible
          </label>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm your password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!isConfirmed || !password || isLoading}
          className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
            isConfirmed && password
              ? "bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              : "bg-gray-400 dark:bg-gray-500 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Permanently Delete Account"
          )}
        </button>
      </form>
    </div>
  );
};