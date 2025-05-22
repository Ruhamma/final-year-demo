import React from "react";
import { Box } from "@mantine/core";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-10">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
