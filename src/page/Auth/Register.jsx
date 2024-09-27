import React, { useState } from "react";
import { HiEyeOff } from "react-icons/hi";
import { HiEye } from "react-icons/hi2";
import Logo from "../../component/Logo";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

function Register() {
  const url = "http://103.93.58.89:21216";
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [cPasswordShown, setCPasswordShown] = React.useState(false);
  const [accept, setACcept] = React.useState(true);
  const nav = useNavigate();
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const formix = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      fullName: yup
        .string()
        .min(2, "Mininum 2 characters")
        .max(50, "Maximum 50 characters")
        .required("Required!"),
      email: yup.string().email("Invalid email format").required("Required!"),
      password: yup
        .string()
        .min(6, "Minimum 6 characters")
        .required("Required!"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Password's not match")
        .required("Required!"),
    }),
  });

  async function handlerRegister(e) {
    e.preventDefault();

    try {
      const data = await axios.post(`${url}/auth/register`, {
        fullName: e.target.fullName.value,
        email: e.target.email.value,
        password: e.target.password.value,
        confirmPassword: e.target.confirmPassword.value,
      });
      nav("/auth/login");
      console.log(data.data.message);
    } catch (error) {
      setMsg(error.response.data.message);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
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
                type="text"
                name="fullName"
                className="outline-none"
                placeholder="Full Name"
                value={formix.values.fullName}
                onChange={formix.handleChange}
              />
            </div>
            {formix.errors.fullName && (
              <p className="text-red-500 text-sm">{formix.errors.fullName}</p>
            )}
            <div className="flex flex-col border px-5 py-2 rounded-xl shadow bg-white">
              <input
                type="email"
                name="email"
                className="outline-none"
                placeholder="Email"
                value={formix.values.email}
                onChange={formix.handleChange}
              />
            </div>
            {formix.errors.email && (
              <p className="text-red-500 text-sm">{formix.errors.email}</p>
            )}
            <div className="flex items-center border px-5 py-2 rounded-xl shadow bg-white">
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                className="outline-none"
                placeholder="Password"
                value={formix.values.password}
                onChange={formix.handleChange}
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
            {formix.errors.password && (
              <p className="text-red-500 text-sm">{formix.errors.password}</p>
            )}
            <div className="flex items-center border px-5 py-2 rounded-xl shadow bg-white">
              <input
                type={cPasswordShown ? "text" : "password"}
                name="confirmPassword"
                className="outline-none"
                placeholder="Confirm Password"
                value={formix.values.confirmPassword}
                onChange={formix.handleChange}
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
            {formix.errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {formix.errors.confirmPassword}
              </p>
            )}
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
        <div className="flex-1 bg-blue-900 hidden md:flex"></div>
        <div className="flex-1 bg-blue-900 hidden md:flex"></div>
      </section>
    </>
  );
}

export default Register;
