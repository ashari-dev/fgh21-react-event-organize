import React from "react";
import { HiEyeOff } from "react-icons/hi";
import { HiEye } from "react-icons/hi2";
import Logo from "../../component/Logo";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

function Register() {
  const url = "http://localhost:8080";
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [cPasswordShown, setCPasswordShown] = React.useState(false);
  const [accept, setACcept] = React.useState(true);
  const nav = useNavigate();
  async function handlerRegister(e) {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    try {
      const data = await axios.post(`${url}/auth/register`, {
        fullName,
        email,
        password,
        confirmPassword,
      });
      nav("/auth/login")
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  function handlerAccept() {
    setACcept(!accept);
  }
  return (
    <>
      <section className="h-screen flex">
        <div className="relative flex-1 bg-blue-200 flex flex-col gap-10 justify-center items-center shadow-lg shadow-slate-200">
          <button
            onClick={() => {
              nav("/auth/login");
            }}
            className=" p-3 rounded-xl shadow bg-red-500 hover:bg-red-600 text-white absolute top-2 right-2"
          >
            <FaArrowRight />
          </button>
          <div className="flex flex-col gap-5">
            <Logo />
            <div>
              <h1 className="text-2xl font-semibold">Register</h1>
              <h4 className="text-sm">
                Already have an account?{" "}
                <Link className="underline text-blue-500" to={"/auth/login"}>
                  Log in
                </Link>
              </h4>
            </div>
          </div>
          <form
            onSubmit={handlerRegister}
            className="flex flex-col gap-5 px-20"
          >
            <div className="flex flex-col border px-5 py-2 rounded-xl shadow bg-white">
              <input
                type="text"
                name="fullName"
                className="outline-none"
                placeholder="Full Name"
              />
            </div>
            <div className="flex flex-col border px-5 py-2 rounded-xl shadow bg-white">
              <input
                type="email"
                name="email"
                className="outline-none"
                placeholder="Email"
              />
            </div>
            <div className="flex items-center border px-5 py-2 rounded-xl shadow bg-white">
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                className="outline-none"
                placeholder="Password"
              />
              {passwordShown ? (
                <HiEye
                  onClick={() => {
                    setPasswordShown(false);
                  }}
                />
              ) : (
                <HiEyeOff
                  onClick={() => {
                    setPasswordShown(true);
                  }}
                />
              )}
            </div>
            <div className="flex items-center border px-5 py-2 rounded-xl shadow bg-white">
              <input
                type={cPasswordShown ? "text" : "password"}
                name="confirmPassword"
                className="outline-none"
                placeholder="Confirm Password"
              />
              {cPasswordShown ? (
                <HiEye
                  onClick={() => {
                    setCPasswordShown(false);
                  }}
                />
              ) : (
                <HiEyeOff
                  onClick={() => {
                    setCPasswordShown(true);
                  }}
                />
              )}
            </div>
            <div className="flex gap-3 items-center">
              <input type="checkbox" onChange={handlerAccept} id="acc" />{" "}
              <label htmlFor="acc" className="text-xs">
                Accept terms and condition
              </label>
            </div>
            <div className="w-full flex justify-center">
              <button
                className="shadow-md font-semibold px-5 py-1 rounded-lg bg-red-500 text-white"
                disabled={accept}
              >
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="flex-1 bg-blue-900"></div>
        <div className="flex-1 bg-blue-900"></div>
      </section>
    </>
  );
}

export default Register;
