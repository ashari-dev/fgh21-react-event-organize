import React from "react";
import { HiOutlineTicket } from "react-icons/hi2";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to={"/"}>
      <div className="flex flex-col items-center text-red-700">
        <HiOutlineTicket className="text-4xl" />
        <h1 className="text-xl font-bold -mt-3">
          Find<span className="text-blue-700">Your</span>Event
        </h1>
      </div>
    </Link>
  );
}

export default Logo;
