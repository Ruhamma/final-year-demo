import React from "react";
import { Box } from "@mantine/core";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
const layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <Header />
      <Box className="flex h-screen">
        <Sidebar />
        {children}
      </Box>
    </>
  );
};

export default layout;
