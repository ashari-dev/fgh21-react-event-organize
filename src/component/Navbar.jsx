import React from "react";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useSelector } from "react-redux";

function Navbar() {
  const nav = useNavigate();
  const dataProfile = useSelector((state) => state.profile.data);
  function login() {
    nav("/auth/login");
  }
  function signup() {
    nav("/auth/register");
  }

  return (
    <>
      <nav className="flex w-full  items-center px-20 py-2 shadow">
        <ScrollRestoration />
        <div className="flex flex-1">
          <Logo />
        </div>
        <ul className="flex flex-1 justify-center gap-10 text-black">
          <Link
            className="hover:underline hover:-skew-y-3 hover:font-semibold hover:text-lg hover:text-gray-300"
            to={"/"}
          >
            Home
          </Link>
          <Link
            className="hover:underline hover:-skew-y-3 hover:font-semibold hover:text-lg hover:text-gray-300"
            to={"/create-event"}
          >
            Create Event
          </Link>
          <li className="hover:underline hover:-skew-y-3 hover:font-semibold hover:text-lg hover:text-gray-300">
            Location
          </li>
        </ul>
        {dataProfile == null ? (
          <div className="flex flex-1 justify-end gap-5">
            <button
              onClick={login}
              className="border px-5 py-2 rounded-lg text-sm bg-blue-700 text-white font-semibold shadow shadow-blue-500 "
            >
              Login
            </button>
            <button
              onClick={signup}
              className="border px-5 py-2 rounded-lg text-sm bg-blue-700 text-white font-semibold shadow shadow-blue-500"
            >
              Register
            </button>
          </div>
        ) : (
          <div className="flex flex-1 justify-end gap-5">
            <Link
              to={"/profile/edit-profile"}
              className="flex items-center gap-2 "
            >
              <div className="h-12 w-12 rounded-full border-2 border-[#180161] overflow-hidden">
                <img
                  src={
                    dataProfile?.picture !== null
                      ? dataProfile?.picture
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
                  }
                  alt="Profile"
                  className="h-12 w-auto"
                />
              </div>
              <div className="text-[#373A42] font-bold text-sm">
                {dataProfile?.fullname}
              </div>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
