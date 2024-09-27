import React, { useState } from "react";
import CardEvent from "../CardEvent";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useListEventsQuery } from "../../redux/services/event";

function HomeEvent(props) {
  const [search, setSearch] = useState("");
  const { data, error, isLoading } = useListEventsQuery(search);
  props.setLoading(isLoading);
  return (
    <>
      <section className="md:px-20 px-5 flex flex-col gap-10">
        <div className="flex flex-col gap-5 items-center">
          <span className="bg-yellow-200 text-yellow-600 px-5 py-1 font-semibold rounded-full">
            &minus; Event
          </span>
          <h1 className="text-4xl font-semibold">Events For You</h1>
        </div>
        <form className="flex justify-end">
          <input
            className="border rounded-xl px-5 py-2 outline-none"
            type="text"
            placeholder="Search events by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="flex gap-5 overflow-x-scroll">
          {isLoading || error
            ? ""
            : data.result.map((item) => (
                <CardEvent key={item.id} data={item} />
              ))}
        </div>
        <div className="flex gap-3 justify-center">
          <button className=" p-3 rounded-xl shadow bg-red-500 hover:bg-red-600 text-white">
            <FaArrowLeft />
          </button>
          <button className=" p-3 rounded-xl shadow bg-red-500 hover:bg-red-600 text-white">
            <FaArrowRight />
          </button>
        </div>
      </section>
    </>
  );
}

export default HomeEvent;
