import React from "react";
import CardEvent from "../CardEvent";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useListEventsQuery } from "../../redux/services/event";

function HomeEvent(props) {
  const { data, error, isLoading } = useListEventsQuery();
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

        <div className="flex gap-10 overflow-x-scroll justify-center">
          <div className="flex flex-col  items-center border-2 p-2 rounded-xl font-semibold">
            13 <span>Sen</span>
          </div>
          <div className="flex flex-col  items-center border-2 p-2 rounded-xl font-semibold">
            13 <span>Sen</span>
          </div>
          <div className="flex flex-col  items-center border-2 p-2 rounded-xl font-semibold">
            13 <span>Sen</span>
          </div>
          <div className="flex flex-col  items-center border-2 p-2 rounded-xl font-semibold">
            13 <span>Sen</span>
          </div>
          <div className="flex flex-col  items-center border-2 p-2 rounded-xl font-semibold">
            13 <span>Sen</span>
          </div>
        </div>

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
