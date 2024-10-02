import React, { useEffect, useState } from "react";
import CardEvent from "../CardEvent";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useListEventsQuery } from "../../redux/services/event";

function HomeEvent(props) {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState({});
  useEffect(() => {
    setQuery({ search, limit, page });
  }, [search, limit, page]);
  const { data, error, isLoading } = useListEventsQuery(query);
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

        <div>
          <div className="flex gap-5 overflow-x-scroll">
            {isLoading || error
              ? ""
              : data.result.map((item) => (
                  <CardEvent key={item.id} data={item} />
                ))}
          </div>
          <div className="flex justify-between">
            <p>Total Pages : {data?.pageInfo?.totalPage}</p>
            <p>Total Event : {data?.pageInfo?.totalData}</p>
          </div>
        </div>
        <div className="flex gap-3 items-center justify-center">
          {data?.pageInfo?.prev == 0 ? (
            <button
              disabled
              className=" p-3 rounded-xl shadow bg-red-500 hover:bg-red-600 text-white"
            >
              <FaArrowLeft />
            </button>
          ) : (
            <button
              onClick={() => setPage(page - 1)}
              className=" p-3 rounded-xl shadow bg-red-500 hover:bg-red-600 text-white"
            >
              <FaArrowLeft />
            </button>
          )}
          {data?.pageInfo?.page}
          {data?.pageInfo?.next == 0 ? (
            <button
              disabled
              className=" p-3 rounded-xl shadow bg-red-500 hover:bg-red-600 text-white"
            >
              <FaArrowRight />
            </button>
          ) : (
            <button
              onClick={() => setPage(page + 1)}
              className=" p-3 rounded-xl shadow bg-red-500 hover:bg-red-600 text-white"
            >
              <FaArrowRight />
            </button>
          )}
        </div>
      </section>
    </>
  );
}

export default HomeEvent;
