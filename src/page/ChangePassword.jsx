import React, { useState } from "react";
import Layout2 from "../component/layouts/Layout2";
import axios from "axios";
import { useSelector } from "react-redux";
import Alert from "../component/Alert";

function ChangePassword() {
  const url = "http://103.93.58.89:21216";
  const token = useSelector((state) => state.auth.token);
  const [oldPass, setOldPass] = useState(false);
  const [newPass, setNewPass] = useState(false);
  const [conftPass, setCOnftPass] = useState(false);
  const [msg, setMsg] = useState("");
  const [alert, setAlert] = useState(false);
  async function handlerChangePassword(e) {
    e.preventDefault();

    try {
      const respont = await axios.patch(
        `${url}/users/update-password`,
        {
          oldPassword: e.target.oldPass.value,
          newPassword: e.target.newPass.value,
          confirmPassword: e.target.conftPass.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg(respont.data.message);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    } catch (error) {
      setMsg(error.response.data.message);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
    e.target.reset();
  }
  return (
    <>
      {alert ? <Alert msg={msg} /> : ""}

      <Layout2>
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl font-semibold">Change Password</h1>
          <div>
            <form
              onSubmit={handlerChangePassword}
              className="flex flex-col gap-10"
            >
              <div className="md:flex items-center justify-between">
                <label htmlFor="oldPass">Old Password</label>
                <div className="border py-2 md:w-2/3 rounded-xl outline-none px-3">
                  <input
                    id="oldPass"
                    name="oldPass"
                    type={oldPass ? "text" : "password"}
                    className="w-full outline-none"
                  />
                </div>
              </div>
              <div className="md:flex items-center justify-between">
                <label htmlFor="newPass">New Password</label>
                <div className="border py-2 md:w-2/3 rounded-xl outline-none px-3">
                  <input
                    id="newPass"
                    name="newPass"
                    type={newPass ? "text" : "password"}
                    className="w-full outline-none"
                  />
                </div>
              </div>
              <div className="md:flex items-center justify-between">
                <label htmlFor="conftPass">Confirm Password</label>
                <div className="border py-2 md:w-2/3 rounded-xl outline-none px-3">
                  <input
                    id="conftPass"
                    name="conftPass"
                    type={conftPass ? "text" : "password"}
                    className="w-full outline-none"
                  />
                </div>
              </div>
              <button className="bg-red-500 py-2 w-full rounded-xl shadow-md text-white font-semibold">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </Layout2>
    </>
  );
}

export default ChangePassword;
