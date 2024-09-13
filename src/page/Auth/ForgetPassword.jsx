import React from "react";
import { HiEyeOff } from "react-icons/hi";
import { HiEye } from "react-icons/hi2";
import Logo from "../../component/Logo";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function ForgetPassword() {
  const [passwordShown, setPasswordShown] = React.useState(false);

  function handlerLogin(e) {
    e.preventDefault();
  }
  const nav = useNavigate();
  return (
    <>
      <section className="h-screen flex">
        <div className="flex-1 bg-blue-900 hidden md:flex"></div>
        <div className="flex-1 bg-blue-900 hidden md:flex"></div>
        <div className="flex-1 bg-blue-200 flex flex-col gap-10 justify-center items-center shadow-lg shadow-slate-200 relative">
          <button
            onClick={() => {
              nav("/auth/login");
            }}
            className=" p-3 rounded-xl shadow bg-red-500 hover:bg-red-600 text-white absolute top-2 left-2"
          >
            <FaArrowLeft />
          </button>
          <div className="flex flex-col gap-5">
            <Logo />
            <div>
              <h1 className="text-2xl font-semibold">Forget Password</h1>
              <h4 className="text-sm">You’ll get mail soon on your email</h4>
            </div>
          </div>
          <form onSubmit={handlerLogin} className="flex flex-col gap-5 md:px-20">
            <div className="flex flex-col border px-5 py-2 rounded-xl shadow bg-white">
              <input
                type="email"
                name="email"
                className="outline-none"
                placeholder="Email"
              />
            </div>
            <div className="w-full flex justify-center">
              <button className="shadow-md font-semibold px-5 py-1 rounded-lg bg-red-500 text-white">
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default ForgetPassword;
