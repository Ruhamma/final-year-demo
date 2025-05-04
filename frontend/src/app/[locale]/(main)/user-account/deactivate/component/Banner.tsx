// components/account/DeletionBanner.tsx
import Link from "next/link";

interface DeletionBannerProps {
  deletionDate: string;
}

export const DeletionBanner = ({ deletionDate }: DeletionBannerProps) => {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400 dark:text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Your account is scheduled for deletion on {deletionDate}.{" "}
            <Link href="/account/cancel-deletion" className="font-medium underline text-yellow-700 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-300">
              Click here to cancel
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};