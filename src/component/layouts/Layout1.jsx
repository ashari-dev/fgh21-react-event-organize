import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

function Layout1(props) {
  return (
    <>
    
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
}

export default Layout1;
