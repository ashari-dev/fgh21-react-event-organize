import React, { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useListcategoriesQuery } from "../redux/services/categories";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Loading from "./Loading";

function Modal(props) {
  const url = "http://localhost:8080";
  const { data, error, isLoading } = useListcategoriesQuery();
  const [location, setLocation] = useState([]);
  const [alert, setAlert] = useState(false);
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      const respont = await axios.get(`${url}/locations`);
      setLocation(respont.data.result);
    })();
  }, []);

  function handlerChange(e) {
    setImage(e.target.files[0]);
  }
  const formix = useFormik({
    initialValues: {
      img: "",
      name: "",
      date: "",
      detail: "",
      location: "",
      price: "",
      category: "",
    },
    validationSchema: yup.object({
      name: yup.string().min(2, "minimum 2 characters").required("Required!"),
      price: yup.string().required("Required!"),
      date: yup.date().required("Required!"),
      detail: yup
        .string()
        .min(20, "minimum 20 characters")
        .required("Required!"),
      location: yup.string().required("Required!"),
      category: yup.string().required("Required!"),
    }),
  });
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", e.target.name.value);
    formData.append("date", e.target.date.value);
    formData.append("description", e.target.detail.value);
    formData.append("locationId", parseInt(e.target.location.value));
    try {
      const response = await axios.post(`${url}/event`, formData, {
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      if (response.data.success) {
        try {
          const respon = await axios.post(
            `${url}/event/category`,
            {
              eventId: response.data.result.id,
              categoryId: parseInt(e.target.category.value),
            },
            {
              headers: {
                Authorization: `Bearer ${props.token}`,
              },
            }
          );
          const response2 = await axios.post(
            `${url}/event/section`,
            {
              name: "reguler",
              price: parseInt(e.target.price.value),
              quantity: 50,
              eventId: response.data.result.id,
            },
            {
              headers: {
                Authorization: `Bearer ${props.token}`,
              },
            }
          );
          console.log(respon);
          console.log(response2);
          props.close(false);
        } catch (error) {
          console.log(error);
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 2000);
        }
      }
    } catch (err) {
      console.log(err);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  }
  return (
    <>
    
      <div className="md:h-full w-full bg-[#00000047] fixed top-0">
        <div className="bg-white p-16 m-20 rounded-3xl flex flex-col relative gap-10">
          <button
            onClick={() => {
              props.close(false);
            }}
            className="absolute right-16 top-10 text-2xl"
          >
            <IoMdCloseCircleOutline />
          </button>
          <h2 className="text-xl font-semibold">Create Event</h2>
          {alert ? (
            <p className="text-red-500">Event data is not complete</p>
          ) : (
            ""
          )}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-6"
          >
            <div className="flex flex-col gap-2">
              <label className="text-[#373A42] text-sm" htmlFor="name">
                Title
              </label>

              <input
                type="text"
                name="name"
                id="name"
                placeholder="Input Name Event"
                className="h-[55px] border pl-6 rounded-2xl"
                autoComplete="off"
                value={formix.values.name}
                onChange={formix.handleChange}
              />
              {formix.errors.name && (
                <p className="text-red-500 text-sm">{formix.errors.name}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#373A42] text-sm" htmlFor="category">
                Category
              </label>

              <select
                name="category"
                id="category"
                className="h-[55px] border pl-6 rounded-2xl"
              >
                <option>-</option>
                {data?.result.map((i) => (
                  <option value={i.id}>{i.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#373A42] text-sm" htmlFor="location">
                Location
              </label>

              <select
                name="location"
                id="location"
                className="h-[55px] border pl-6 rounded-2xl"
              >
                <option>-</option>
                {location.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#373A42] text-sm" htmlFor="date">
                Date Time Show
              </label>
              <input
                type="date"
                name="date"
                id="date"
                placeholder="01/01/2022"
                className="h-[55px] border pl-6 rounded-2xl"
                value={formix.values.date}
                onChange={formix.handleChange}
              />
              {formix.errors.name && (
                <p className="text-red-500 text-sm">{formix.errors.date}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#373A42] text-sm" htmlFor="price">
                Price
              </label>

              <input
                type="number"
                name="price"
                id="price"
                placeholder="Input Event Price"
                className="h-[55px] border pl-6 rounded-2xl"
                autoComplete="off"
                value={formix.values.price}
                onChange={formix.handleChange}
              />
              {formix.errors.name && (
                <p className="text-red-500 text-sm">{formix.errors.price}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#373A42] text-sm" htmlFor="img">
                Image
              </label>
              <input
                type="file"
                name="img"
                id="img"
                className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-gray-50 file:text-gray-700-700
      hover:file:bg-gray-100"
                onChange={handlerChange}
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[#373A42] text-sm" htmlFor="detail">
                Detail
              </label>
              <textarea
                name="detail"
                id="detail"
                className="h-[100px] border px-6 py-3 rounded-2xl"
                placeholder="input detail"
                value={formix.values.detail}
                onChange={formix.handleChange}
              ></textarea>
              {formix.errors.detail && (
                <p className="text-red-500 text-sm">{formix.errors.detail}</p>
              )}
            </div>
            <div className="md:col-span-2 flex md:justify-end">
              <button className="h-[61px] w-full md:w-[315px] bg-[#180161] rounded-2xl text-white font-semibold shadow-xl">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modal;
