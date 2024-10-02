import React, { useEffect, useState } from "react";
import Layout2 from "../component/layouts/Layout2";
import axios from "axios";
import AddLocation from "../component/AddLocation";

function Location() {
  const [data, setData] = useState([]);
  const url = "http://localhost:8080";
  const [addLocation, setAddLocation] = useState(false);
  useEffect(() => {
    (async () => {
      const location = await axios.get(`${url}/locations`);
      setData(location.data.result);
    })();
  }, []);
  return (
    <>
      {addLocation ? <AddLocation close={setAddLocation} /> : ""}
      <Layout2>
        <main className="flex flex-col gap-5">
          <div className="text-xl font-bold flex justify-between items-center">
            Location
            <button
              onClick={() => setAddLocation(true)}
              className="bg-[#EAF1FF] hidden h-[50px] w-[125px] md:flex items-center justify-center text-sm gap-3 text-[#180161] rounded-xl"
            >
              Add Location
            </button>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
            {data.map((i) => {
              return (
                <div
                  key={i.id}
                  className="w-60 flex flex-col gap-2 items-center"
                >
                  <div className=" bg-black overflow-hidden rounded-2xl flex items-center justify-center">
                    <img className="object-cover" src={i.image} alt="" />
                  </div>
                  <h5 className="font-semibold ">{i.name}</h5>
                </div>
              );
            })}
          </div>
        </main>
      </Layout2>
    </>
  );
}

export default Location;
