'use client';

import { ReactNode } from 'react';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { theme as baseTheme } from '@/utils/theme';

interface Props {
  children: ReactNode;
}

export default function ClientProviders({ children }: Props) {
  const theme: Partial<MantineThemeOverride> = baseTheme;

  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <Notifications />
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
}
