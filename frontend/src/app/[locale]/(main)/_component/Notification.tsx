import React from 'react';
import { Avatar, Text } from '@mantine/core';
import { IconEye ,IconBellRinging} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NotificationItem {
  id: string;
  title: string;
  created_at: Date;
  is_read?: boolean;
}

const Notification = ({ notifications }: { notifications: NotificationItem[] }) => {
  const router = useRouter();

  const handleNotificationClick = (notificationId: string) => {
    // Redirect to notifications page with the notification ID as a query parameter
    router.push(`/user-account/notifications?selected=${notificationId}`);
  };

  return (
    <>
      <div
        className={`w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow`}
        style={{ minWidth: '300px', maxHeight: '400px', overflowY: 'auto' }}
      >
        <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50">
          Notifications
        </div>
        {notifications && notifications.length > 0 ? (
          <>
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  className={`flex px-4 py-3 hover:bg-gray-100 cursor-pointer ${
                    !notification.is_read ? 'bg-green-50' : ''
                  }`}
                >
                  <div className="flex-shrink-0">
                    <Avatar color={notification.is_read ? 'gray' : 'green'} radius="xl">
                      <IconBellRinging size={16} />
                    </Avatar>
                  </div>
                  <div className="w-full ps-3">
                    <div className="text-gray-500 text-sm mb-1.5 line-clamp-2">
                      {notification.title}
                    </div>
                    <div className="text-xs text-green-600">
                      {new Date(notification.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {notifications && notifications.length > 5 && (
              <Link
                href="/user-account/notifications"
                className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100"
              >
                <div className="inline-flex items-center">
                  <IconEye size={16} className="mr-1" />
                  View all
                </div>
              </Link>
            )}
          </>
        ) : (
          <Text size="sm" p={'md'}>
            No notifications
          </Text>
        )}
      </div>
    </>
  );
};

export default Notification;