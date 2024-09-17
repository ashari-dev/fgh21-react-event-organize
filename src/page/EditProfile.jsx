import React, { useEffect, useState } from "react";
import Layout2 from "../component/layouts/Layout2";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addData } from "../redux/reducers/profile";
import Alert from "../component/Alert";

function EditProfile() {
  const url = "http://103.93.58.89:21216";
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [nationalities, setNationalities] = useState([]);
  const [msg, setMsg] = useState("");
  const [pic, setPic] = useState();
  function handleChange(e) {
    setPic(URL.createObjectURL(e.target.files[0]));
  }
  const data = useSelector((state) => state.profile.data);
  useEffect(() => {
    setPic(data.picture);
    (async () => {
      const result = await axios.get(`${url}/nationality`);
      setNationalities(result.data.result);
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await axios.patch(
        `${url}/profile`,
        {
          fullname: e.target.fullname.value,
          username: e.target.username.value,
          email: e.target.email.value,
          phoneNumber: e.target.phoneNumber.value,
          gender: parseInt(e.target.gender.value),
          profession: e.target.profession.value,
          nationality: parseInt(e.target.nationality.value),
          birthDate: e.target.birthdate.value,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setMsg(data.data.message);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      dispatch(addData(data.data.result));
    } catch (error) {
      console.error(error.response.data);
    }
  }

  async function uploadProfile(e) {
    e.preventDefault();
    const image = e.target.profilePic.files[0];
    const formData = new FormData();
    formData.append("profileImg", image);

    try {
      const data = await axios.patch(`${url}/profile/upload-image`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.data.success) {
        const profile = await axios.get(`${url}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(addData(profile.data.result));
      }
      setMsg(data.data.message);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      setTimeout(() => {}, 2000);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {success ? <Alert msg={msg} /> : ""}

      <Layout2>
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <div className="flex flex-col-reverse gap-5 md:flex-row ">
            <form
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col gap-10"
            >
              <div className="md:flex justify-between items-center">
                <label htmlFor="fullName">Full Name</label>
                <div className="border rounded-xl overflow-hidden flex">
                  <input
                    className="px-5 py-2 outline-none "
                    type="text"
                    id="fullname"
                    name="fullname"
                    defaultValue={data.fullname}
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
                  />
                </div>
              </div>

              <div className="md:flex justify-between items-center">
                <span>Gender</span>
                <div className="overflow-hidden flex gap-5">
                  <div className="flex gap-3 items-center">
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value={1}
                      defaultChecked={data.gender == 1 ? true : false}
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value={2}
                      defaultChecked={data.gender == 2 ? true : false}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
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
                  />
                </div>
              </div>
              <div>
                <button className="bg-red-500 py-2 px-16 rounded-xl shadow-md text-white font-semibold">
                  Save
                </button>
              </div>
            </form>
            <div className="flex-1 flex ">
              <div className="flex w-full  justify-center">
                <form
                  onSubmit={uploadProfile}
                  className="flex flex-col items-center gap-10"
                >
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
                      className="h-auto w-[115px] rounded-full brightness-50"
                    />
                    <FaCamera className="text-2xl text-white absolute " />
                  </label>
                  <input
                    onChange={handleChange}
                    type="file"
                    id="profilePic"
                    name="profilePic"
                    className="hidden"
                  />
                  <button className="border-2 text-red-500 border-red-500 py-2 px-16 rounded-xl shadow-md font-semibold">
                    Choose Photo
                  </button>
                  <div className="md:flex flex-col gap-3 hidden">
                    <span className="text-xs">Image size: max, 2 MB</span>
                    <span className="text-xs">
                      Image formats: .JPG, .JPEG, .PNG
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout2>
    </>
  );
}

export default EditProfile;
