import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      {children}
    </main>
  );
};

export default Layout;
