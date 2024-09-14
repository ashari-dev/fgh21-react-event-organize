import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CardEvent from "../CardEvent";
import { useListcategoriesQuery } from "../../redux/services/categories";
import axios from "axios";

function HomeCategory() {
  const url = "http://localhost:8080";
  const [category, setCategory] = useState([]);
  const { data, error, isLoading } = useListcategoriesQuery();
  console.log(category);
  const [eventId, setEventId] = useState(0);
  async function getEventByCategory(id) {
    setEventId(id);
    try {
      const respont = await axios.get(`${url}/event/category/${id}`);
      setCategory(respont.data.result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-10 md:px-20 px-5">
        <div className="flex flex-col gap-5 items-center">
          <span className="bg-yellow-200 text-yellow-600 px-5 py-1 font-semibold rounded-full">
            &minus; Category
          </span>
          <h1 className="text-4xl font-semibold">Browse Events By Category</h1>
        </div>
        <div className="flex justify-center">
          <ul className="flex gap-10 overflow-x-scroll md:overflow-auto">
            {data?.result.map((i) => (
              <button
                onClick={() => getEventByCategory(i.id)}
                key={i.id}
                className="hover:underline hover:-skew-y-3 hover:font-semibold hover:text-lg hover:text-gray-300"
              >
                {i.name}
              </button>
            ))}
          </ul>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <button className="hidden md:block p-3 rounded-xl shadow bg-red-500 hover:bg-red-600 text-white">
              <FaArrowLeft />
            </button>
          </div>
          <div className="flex gap-10 overflow-x-scroll  max-w-[860px]">
            {eventId == 0 ? (
              <div className="w-full h-96 flex items-center">
                <h1 className="text-4xl">please select a category</h1>
              </div>
            ) : category.length == 0 ? (
              <div className="w-full h-96 flex items-center">
                <h1 className="text-4xl">Data not found</h1>
              </div>
            ) : (
              category.map((data) => <CardEvent data={data} />)
            )}
          </div>
          <div className="flex items-center">
            <button className="hidden md:block p-3 rounded-xl shadow bg-red-500 hover:bg-red-600 text-white">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeCategory;
