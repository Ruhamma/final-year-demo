import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";
import type { ReactNode } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="w-full h-full  ">
      <Header />
      <main className="container min-h-screen mt-6">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
