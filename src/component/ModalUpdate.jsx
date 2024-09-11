import React, { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useListcategoriesQuery } from "../redux/services/categories";
import axios from "axios";

function ModalUpdate(props) {
  const url = "http://localhost:8080";
  const { data, error, isLoading } = useListcategoriesQuery();
  const [location, setLocation] = useState([]);
  console.log(props.data);
  useEffect(() => {
    (async () => {
      const respont = await axios.get(`${url}/locations`);
      setLocation(respont.data.result);
    })();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${url}/event/${props.data.id}`,
        {
          image: e.target.img.value,
          title: e.target.name.value,
          date: e.target.date.value,
          description: e.target.detail.value,
          locationId: parseInt(e.target.location.value),
        },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );

      props.close(false);
    } catch (err) {
      console.log(err);
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
          <h2 className="text-xl font-semibold">Update Event</h2>
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
                defaultValue={props.data.title}
              />
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
                  <option
                    selected={props.data.locationId == i.id}
                    key={i.id}
                    value={i.id}
                  >
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
                defaultValue={props.data.date}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#373A42] text-sm" htmlFor="img">
                Image
              </label>
              <input
                type="text"
                name="img"
                id="img"
                placeholder="Chose File ..."
                className="h-[55px] border pl-6 rounded-2xl"
                autoComplete="off"
                defaultValue={props.data.image}
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
                defaultValue={props.data.description}
              ></textarea>
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

export default ModalUpdate;
