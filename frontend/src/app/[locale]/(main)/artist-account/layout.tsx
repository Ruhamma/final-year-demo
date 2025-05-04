import React from "react";
import SideBar from "./_component/SideBar";
import { Box, Center, Container } from "@mantine/core";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
     <Center>
      <Box className="flex items-center justify-center h-screen">
         <SideBar />
        <main className="flex-grow w-full  p-2 md:p-6 pr-0 min-h-screen">{children}</main> 
      </Box>
    </Center>
  );
};

export default layout;
