import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

function Layout2(props) {
  return (
    <>
      <Navbar />
      <section className="px-20 py-10 flex gap-10">
        <div className="flex basis-1/5">
          <Sidebar />
        </div>
        <div className="shadow-xl border p-10 w-full rounded-3xl">
          {props.children}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Layout2;
