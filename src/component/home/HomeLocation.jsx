import React, { useEffect, useState } from "react";
import bg from "../../assets/img/bg2.png";
import axios from "axios";

function HomeLocation() {
  const url = "http://localhost:8080";
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const respont = await axios.get(`${url}/locations`);
      setData(respont.data.result);
    })();
  }, []);
  return (
    <>
      <div className="md:mx-20 bg-red-500 p-14 rounded-3xl shadow-lg flex flex-col gap-10">
        <div>
          <span className="bg-red-100 text-red-600 px-5 py-1 font-semibold rounded-full">
            &minus; Location
          </span>
        </div>
        <div className="md:grid md:grid-cols-4 md:gap-y-10 flex flex-wrap">
          <div className="w-60 ">
            <h1 className="text-5xl font-semibold text-white leading-normal">
              Discover Events Near You
            </h1>
          </div>
          {data.map((i) => (
            <div className="w-60 flex flex-col gap-2 items-center">
              <div className=" bg-white overflow-hidden rounded-2xl flex items-center justify-center">
                <img className="object-cover" src={i.image} alt="" />
              </div>
              <h5 className="font-semibold text-white">{i.name}</h5>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button className=" px-16 py-1 rounded-xl shadow bg-red-100 hover:bg-red-200 text-red-500 font-semibold">
            See All
          </button>
        </div>
      </div>
    </>
  );
}

export default HomeLocation;
