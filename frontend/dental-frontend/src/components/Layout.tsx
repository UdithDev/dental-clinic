import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="max-w-7xl mx-auto py-10">{children}</div>;
};

export default Layout;
