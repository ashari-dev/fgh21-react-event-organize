import React, { useState } from "react";
import {
  FaBars,
  FaCreditCard,
  FaHeart,
  FaListUl,
  FaPen,
  FaUnlock,
  FaUser,
} from "react-icons/fa";
import { FaArrowUpFromBracket, FaCirclePlus, FaGear } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeData } from "../redux/reducers/profile";
import { removeToken } from "../redux/reducers/auth";

function Sidebar() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const dataProfile = useSelector((state) => state.profile.data);
  function logout() {
    setConfirmLogout(false);
    dispatch(removeToken());
    dispatch(removeData());
    nav("/auth/login");
  }
  return (
    <>
      {confirmLogout ? (
        <div className=" fixed top-0 left-0 flex w-screen h-screen items-center justify-center bg-[#00000060]">
          <div className="p-10 border rounded-xl bg-white flex flex-col gap-5">
            <h4 className="text-xl font-semibold">
              Are you sure you want to log out?
            </h4>
            <div className="w-full flex gap-5 justify-center">
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-500 rounded-lg text-xl font-semibold text-white"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmLogout(false)}
                className="px-3 py-1 bg-blue-500 rounded-lg text-xl font-semibold text-white"
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-[55px] w-[55px]  rounded-full overflow-hidden border-[#180161] border-2">
              <img
                src={
                  dataProfile?.picture !== null
                    ? dataProfile?.picture
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
                }
                alt="Profile"
                className="h-auto w-[45px] rounded-full"
              />
            </div>
            <h3 className="flex flex-col text-sm font-semibold gap-1">
              {dataProfile?.fullname ? dataProfile?.fullname : ""}
              <span className="text-xs font-normal">
                {dataProfile?.profession ? dataProfile?.profession : ""}
              </span>
            </h3>
          </div>
        </div>
        <div>
          <ul className="flex flex-col gap-8">
            <li className="flex gap-6 hover:text-blue-500">
              <FaUser />
              <span className="font-semibold text-sm ">Profile</span>
            </li>
            <li className="flex gap-6 pl-8 hover:text-blue-500">
              <FaCreditCard />
              <span className="font-semibold text-sm ">Card</span>
            </li>
            <Link to={"/profile/edit-profile"}>
              <li className="flex gap-6 pl-8 hover:text-blue-500">
                <FaPen />
                <span className="font-semibold text-sm ">Edit Profile</span>
              </li>
            </Link>
            <Link to={"/profile/change-password"}>
              <li className="flex gap-6 pl-8 hover:text-blue-500">
                <FaUnlock />
                <span className="font-semibold text-sm ">Change Password</span>
              </li>
            </Link>
            <Link to={"/create-event"}>
              <li className="flex gap-6 hover:text-blue-500">
                <FaCirclePlus />
                <span className="font-semibold text-sm ">Create Event</span>
              </li>
            </Link>
            <Link to={"/my-booking"}>
              <li className="flex gap-6 hover:text-blue-500">
                <FaListUl />
                <span className="font-semibold text-sm ">My Booking</span>
              </li>
            </Link>
            <Link to={"/my-wishlist"}>
              <li className="flex gap-6 hover:text-blue-500">
                <FaHeart />
                <span className="font-semibold text-sm ">My Wishlist</span>
              </li>
            </Link>
            <li className="flex gap-6 hover:text-blue-500">
              <FaGear />
              <span className="font-semibold text-sm ">Settings</span>
            </li>
            <li className="flex gap-6 text-red-600">
              <button
                onClick={() => setConfirmLogout(true)}
                className="flex gap-6 w-full"
              >
                <FaArrowUpFromBracket />
                <span className="font-semibold text-sm ">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
