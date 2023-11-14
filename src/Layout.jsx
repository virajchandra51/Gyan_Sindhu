import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      {/* Common Header */}
      <Header />
      {/* Page Content */}
      <div>{children}</div>

      {/* Common Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
