import React from "react";
import Logo from "./Logo";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="flex flex-col gap-10 px-20 py-20">
        <div className="flex">
          <div className="flex flex-col justify-center items-center flex-1">
            <div className="flex flex-col gap-5">
              <Logo />
              <p className="font-semibold">Find events you love with our</p>
              <div className="flex justify-center gap-4 text-xl text-gray-500">
                <FaFacebook />
                <FaInstagram />
                <FaWhatsapp />
                <FaTwitter />
              </div>
            </div>
          </div>
          <div className="flex-1 items-center flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold">Title</h3>
              <ul className="flex flex-col gap-2">
                <li>item</li>
                <li>item</li>
                <li>item</li>
                <li>item</li>
              </ul>
            </div>
          </div>
          <div className="flex-1 items-center flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold">Title</h3>
              <ul className="flex flex-col gap-2">
                <li>item</li>
                <li>item</li>
                <li>item</li>
                <li>item</li>
              </ul>
            </div>
          </div>
          <div className="flex-1 items-center flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold">Title</h3>
              <ul className="flex flex-col gap-2">
                <li>item</li>
                <li>item</li>
                <li>item</li>
                <li>item</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="font-semibold">
          &copy; 2024 FindYourTicker All Rights Reserved
        </div>
      </footer>
    </>
  );
}

export default Footer;
