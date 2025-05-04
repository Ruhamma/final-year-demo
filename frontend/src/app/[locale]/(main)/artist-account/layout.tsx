import React from "react";
import SideBar from "./_component/SideBar";
import { Box } from "@mantine/core";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
      <Box className="flex  min-h-screen">
        <SideBar />
       <main className="flex-grow w-3/4  p-2 md:p-6 pr-0 min-h-screen h-full">{children}</main> 
      </Box>
  );
};

export default layout;
