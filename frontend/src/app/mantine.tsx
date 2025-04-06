import { theme as baseTheme } from "@/utils/theme";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
// import { Notifications } from "@mantine/notifications";
import React from "react";

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme: Partial<MantineThemeOverride> = baseTheme;
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        {/* <Notifications> */}
        {children}
        {/* </Notifications> */}
      </ModalsProvider>
    </MantineProvider>
  );
}
