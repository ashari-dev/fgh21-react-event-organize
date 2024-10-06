import React, { useState } from "react";
import { HiEyeOff } from "react-icons/hi";
import { HiEye } from "react-icons/hi2";
import Logo from "../../component/Logo";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/auth";
import profile, { addData } from "../../redux/reducers/profile";

function Login() {
  const url = "http://103.93.58.89:21216";
  const [passwordShown, setPasswordShown] = React.useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const [alert, setAlert] = useState(false);
  async function handlerLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const data = await axios.post(`${url}/auth/login`, {
        email,
        password,
      });

      const token = data.data.result.token;
      if (data.data.success) {
        dispatch(login(token));
        const profile = await axios.get(`${url}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(addData(profile.data.result));
        nav("/");
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  }
  return (
    <>
      <section className="h-screen flex">
        <div className="flex-1 bg-blue-900 hidden md:flex"></div>
        <div className="md:flex-1 w-full bg-blue-200 flex flex-col gap-10 justify-center items-center md:shadow-lg md:shadow-slate-200 relative">
          <button
            onClick={() => {
              nav("/auth/register");
            }}
            className=" p-3 rounded-xl shadow bg-red-500 hover:bg-red-600 text-white absolute top-2 left-2"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => {
              nav("/auth/forget-password");
            }}
            className=" p-3 rounded-xl shadow bg-red-500 hover:bg-red-600 text-white absolute top-2 right-2"
          >
            <FaArrowRight />
          </button>
          <div className="flex flex-col gap-5">
            <Logo />
            <div>
              <h1 className="text-2xl font-semibold">Login</h1>
              <h4 className="text-sm">Hi, Welcome back </h4>
            </div>
          </div>
          <form
            onSubmit={handlerLogin}
            className="flex flex-col gap-5 md:px-20"
          >
            {alert ? (
              <div className="bg-red-200 py-1 px-5 text-red-600 rounded-lg">
                {msg}
              </div>
            ) : (
              ""
            )}
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
            <div className="text-end font-semibold text-blue-600 underline">
              <Link to={"/auth/forget-password"}>Forget password?</Link>
            </div>
            <div className="w-full flex justify-center">
              <button className="shadow-md font-semibold px-5 py-1 rounded-lg bg-red-500 text-white">
                Login
              </button>
            </div>
          </form>
          <div>
            Don't have an account ?{" "}
            <Link className="underline text-blue-500" to={"/auth/register"}>
              register
            </Link>
          </div>
        </div>
        <div className="flex-1 bg-blue-900 hidden md:flex"></div>
      </section>
    </>
  );
}

export default Login;
