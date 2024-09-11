import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CardEvent from "../CardEvent";
import { useListcategoriesQuery } from "../../redux/services/categories";

function HomeCategory() {
  const [category, setCategory] = useState([]);
  const { data, error, isLoading } = useListcategoriesQuery();
  return (
    <>
      <div className="flex flex-col gap-10 px-20">
        <div className="flex flex-col gap-5 items-center">
          <span className="bg-yellow-200 text-yellow-600 px-5 py-1 font-semibold rounded-full">
            &minus; Category
          </span>
          <h1 className="text-4xl font-semibold">Browse Events By Category</h1>
        </div>
        <div className="flex justify-center">
          <ul className="flex gap-10">
            {data?.result.map((i) => (
              <li
                key={i.id}
                className="hover:underline hover:-skew-y-3 hover:font-semibold hover:text-lg hover:text-gray-300"
              >
                {i.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <button className=" p-3 rounded-xl shadow bg-red-500 hover:bg-red-600 text-white">
              <FaArrowLeft />
            </button>
          </div>
          <div className="flex gap-10">
            <CardEvent />
            <CardEvent />
            <CardEvent />
          </div>
          <div className="flex items-center">
            <button className=" p-3 rounded-xl shadow bg-red-500 hover:bg-red-600 text-white">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeCategory;
