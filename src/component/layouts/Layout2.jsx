import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

function Layout2(props) {
  return (
    <>
      <Navbar />
      <section className="md:px-20 px-5 py-10 flex flex-col md:flex-row gap-10">
        <div className="flex basis-1/5">
          <Sidebar />
        </div>
        <div className="md:shadow-xl md:border md:p-10 p-5 w-full rounded-3xl">
          {props.children}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Layout2;
