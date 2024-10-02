import React, { useEffect, useState } from "react";
import Layout2 from "../component/layouts/Layout2";
import { useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";
import axios from "axios";

function Profile() {
  const url = "http://localhost:8080";
  const data = useSelector((state) => state.profile.data);
  const [pic, setPic] = useState();
  const [nationalities, setNationalities] = useState([]);
  useEffect(() => {
    setPic(data.picture);
    (async () => {
      const result = await axios.get(`${url}/nationality`);
      setNationalities(result.data.result);
    })();
  }, []);

  return (
    <>
      <Layout2>
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <div className="flex flex-col-reverse gap-5 md:flex-row ">
            <form className="flex-1 flex flex-col gap-10">
              <div className="md:flex justify-between items-center">
                <label htmlFor="fullName">Full Name</label>
                <div className="border rounded-xl overflow-hidden flex">
                  <input
                    className="px-5 py-2 outline-none "
                    type="text"
                    id="fullname"
                    name="fullname"
                    defaultValue={data.fullname}
                    disabled
                  />
                </div>
              </div>

              <div className="md:flex justify-between items-center">
                <label htmlFor="username">Username</label>
                <div className="border rounded-xl overflow-hidden flex">
                  <input
                    className="px-5 py-2 outline-none "
                    type="text"
                    id="username"
                    name="username"
                    defaultValue={data.username}
                    disabled
                  />
                </div>
              </div>

              <div className="md:flex justify-between items-center">
                <label htmlFor="email">Email</label>
                <div className="border rounded-xl overflow-hidden flex">
                  <input
                    className="px-5 py-2 outline-none "
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={data.email}
                    disabled
                  />
                </div>
              </div>

              <div className="md:flex justify-between items-center">
                <label htmlFor="phoneNumber">Phone Numbar</label>
                <div className="border rounded-xl overflow-hidden flex">
                  <input
                    className="px-5 py-2 outline-none "
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    defaultValue={data.phoneNumber}
                    disabled
                  />
                </div>
              </div>

              <div className="md:flex justify-between items-center">
                <span>Gender</span>
                <div className="border rounded-xl overflow-hidden flex">
                  <input
                    className="px-5 py-2 outline-none "
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    defaultValue={data.gender == 1 ? "Male" : "Female"}
                    disabled
                  />
                </div>
              </div>
              <div className="md:flex justify-between items-center">
                <label htmlFor="profession">Profession</label>
                <div className="border rounded-xl overflow-hidden flex">
                  <input
                    className="px-5 py-2 outline-none "
                    type="text"
                    id="profession"
                    name="profession"
                    defaultValue={data.profession}
                    disabled
                  />
                </div>
              </div>
              <div className="md:flex justify-between items-center">
                <label htmlFor="nationality">Nationality</label>
                <div className="border rounded-xl overflow-hidden flex md:w-[245px] px-3">
                  <select
                    className="bg-white py-2 outline-none w-full"
                    name="nationality"
                    id="nationality"
                    disabled
                  >
                    <option>Select</option>
                    {nationalities.map((item) => (
                      <option
                        key={item.id}
                        value={item.id}
                        selected={item.id === data.nationalityId}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="md:flex justify-between items-center">
                <label htmlFor="birthdate">Birthdate</label>
                <div className="border rounded-xl overflow-hidden flex md:w-[245px] px-3">
                  <input
                    type="date"
                    name="birthdate"
                    id="birthdate"
                    className="py-2 w-full outline-none"
                    defaultValue={data.birthDate}
                    disabled
                  />
                </div>
              </div>
              <div className="md:flex justify-between items-center">
                <label htmlFor="profession">Role</label>
                <div className="border rounded-xl overflow-hidden flex">
                  <input
                    className="px-5 py-2 outline-none "
                    type="text"
                    id="profession"
                    name="profession"
                    defaultValue={data.roleId == 1 ? "Admin" : "User"}
                    disabled
                  />
                </div>
              </div>
            </form>
            <div className="flex-1 flex ">
              <div className="flex w-full  justify-center">
                <form className="flex flex-col items-center gap-10">
                  <label
                    htmlFor="profilePic"
                    className="overflow-hidden border-4 border-red-500 h-[137px] w-[137px] rounded-full  flex justify-center items-center "
                  >
                    <img
                      src={
                        pic == undefined
                          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
                          : url + pic
                      }
                      alt="Profile"
                      className="h-auto w-[115px] rounded-full"
                    />
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout2>
    </>
  );
}

export default Profile;
