'use client';
import React, { useEffect } from 'react';
import { Card, Avatar, Badge, Button, Group, Text, ScrollArea, Grid, LoadingOverlay, Box } from '@mantine/core';
import { IconBellRinging, IconX } from "@tabler/icons-react";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useGetNotificationQuery, useMarkNotificationAsReadMutation } from '@/store/api/notification/notificationApi';
import { notify } from '@/shared/components/notification/notification';
import { useMediaQuery } from '@mantine/hooks';
import { useSearchParams } from 'next/navigation';

type Notification = {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export default function NotificationsPage() {
  const t = useTranslations('common');
  const searchParams = useSearchParams();
  const { data, isLoading, isError, refetch } = useGetNotificationQuery();
  const notifications: Notification[] = Array.isArray(data) ? data : [];
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
useEffect(() => {
  const selectedId = searchParams.get('selected');
  if (selectedId && notifications.length > 0) {
    const notificationToSelect = notifications.find(n => n.id === selectedId);
    if (notificationToSelect) {
      setSelectedNotification(notificationToSelect);
      
      // Auto-mark as read if not already read
      if (!notificationToSelect.is_read) {
        handleMarkAsRead(notificationToSelect.id);
      }
    }
  }
}, [searchParams, notifications]);
  // Auto-mark as read when notification is selected
  useEffect(() => {
    if (selectedNotification && !selectedNotification.is_read) {
      handleMarkAsRead(selectedNotification.id);
    }
  }, [selectedNotification]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      notify("Error", t('Notifications.markAsReadError'));
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const unreadNotifications = notifications?.filter(n => !n.is_read);
      await Promise.all(unreadNotifications.map(n => markAsRead(n.id).unwrap()));
      refetch();
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      notify("Error", t('Notifications.Error'));
    }
  };

  if (isLoading) return <LoadingOverlay visible/>;
  if (isError) return <div>{t('Notifications.Error2')}</div>;

  return (
    <div className="min-h-screen py-4 px-2 md:py-8 md:px-4">
      <div className="max-w-4xl mx-auto">
        <Group justify="space-between" mb="md">
          <Group>
            <Text size="xl" fw={700}>
              {t('Notifications.title')}
            </Text>
            <Badge color="#606C38" variant="filled">
              {notifications.filter((n) => !n.is_read).length} {t('Notifications.new')}
            </Badge>
          </Group>
          <Button 
            size="xs" 
            variant="outline" 
            onClick={handleMarkAllAsRead}
            disabled={notifications.filter(n => !n.is_read).length === 0}
            color="#606C38"
          >
            {t('Notifications.markAllAsRead')}
          </Button>
        </Group>

        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: selectedNotification ? 6 : 12 }}>
            <ScrollArea.Autosize mah={isMobile ? 400 : 500}>
              <div className="space-y-2 md:space-y-4">
                {notifications?.length === 0 && (
                  <Text color="dimmed" ta="center" py="md">
                    {t('Notifications.noNotifications')}
                  </Text>
                )}
                {notifications?.map((notification) => (
                  <Card
                    key={notification.id}
                    shadow="sm"
                    padding="sm"
                    radius="md"
                    className={
                      `transition-all cursor-pointer ${
                        !notification.is_read ? 'bg-#606C38-50 border-green-200 border' : 'bg-white'
                      } ${
                        selectedNotification?.id === notification.id ? 'ring-2 ring-green-500' : ''
                      }`
                    }
                    onClick={() => setSelectedNotification(notification)}
                  >
                    <Group align="flex-start" wrap="nowrap">
                      <Avatar color={notification.is_read ? 'gray' : 'green'} radius="xl">
                        <IconBellRinging size={20} />
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <Group justify="space-between" wrap="nowrap">
                          <Text fw={600} truncate="end">{notification.title}</Text>
                          <Text size="xs" color="dimmed" >
                            {new Date(notification.created_at).toLocaleDateString()}
                          </Text>
                        </Group>
                        <Text size="sm" color="gray.7" mt={4} lineClamp={2}>
                          {notification.message}
                        </Text>
                      </div>
                    </Group>
                  </Card>
                ))}
              </div>
            </ScrollArea.Autosize>
          </Grid.Col>

          {selectedNotification && (
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card shadow="sm" padding="md" radius="md" className="h-full">
                {isMobile && (
                  <Box mb="sm">
                    <Button 
                      variant="subtle" 
                      color="gray" 
                      size="sm" 
                      leftSection={<IconX size={16} />}
                      onClick={() => setSelectedNotification(null)}
                    >
                      Back to list
                    </Button>
                  </Box>
                )}
                <Group mb="md" justify="space-between">
                  <Text size="lg" fw={700}>
                    {selectedNotification.title}
                  </Text>
                  <Text size="xs" color="dimmed">
                    {new Date(selectedNotification.created_at).toLocaleDateString()}
                  </Text>
                </Group>
                <Text size="sm" className="whitespace-pre-line">
                  {selectedNotification.message}
                </Text>
              </Card>
            </Grid.Col>
          )}
        </Grid>
      </div>
    </div>
  );
}