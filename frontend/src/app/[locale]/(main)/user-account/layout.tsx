import React from "react";
import SideBar from "./_component/SideBar";
import { Box, Center } from "@mantine/core";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Center>
      <Box className="flex items-center justify-center h-screen">
        <SideBar />
        {children}
      </Box>
    </Center>
  );
};

export default layout;
