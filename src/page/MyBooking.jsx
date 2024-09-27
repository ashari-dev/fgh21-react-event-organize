import React, { useEffect, useState } from "react";
import Layout2 from "../component/layouts/Layout2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeDataSection } from "../redux/reducers/section";
import Loading from "../component/Loading";

function MyBooking() {
  const url = "http://103.93.58.89:21216";
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  dispatch(removeDataSection());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const respont = await axios.get(`${url}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(respont.data.result);
      setLoading(false);
    })();
  }, []);
  return (
    <>
      {loading ? <Loading /> : ""}
      <Layout2>
        <div className="text-xl font-bold flex justify-between items-center">
          My Booking
        </div>
        <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
          {data.length > 0 ? (
            data.map((i) => (
              <div key={i.id} className="border-b-2 pb-5 w-full">
                <div className="flex gap-8">
                  <div className="flex flex-col h-[75px] w-[50px] justify-center shadow items-center rounded-2xl text-sm text-[#FF8900] font-semibold ">
                    15
                    <span className="text-xs text-[#C1C5D0] font-normal">
                      Wed
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h2 className="text-2xl font-semibold text-[#373A42]">
                      {i.eventTitle}
                    </h2>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text[#373A42BF]">
                        {i.location}
                      </span>
                      <span className="text-xs text[#373A42BF]">{i.date}</span>
                      <a className="text-xs text-blue-500 mt-1">Detail</a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="text-2xl font-semibold">No tickets bought</div>
              <div className="w-[50%] flex text-[#B3B8B8] text-md text-center">
                It appears you haven't bought any tickets yet. Maybe try
                searching these?
              </div>
            </>
          )}
        </div>
      </Layout2>
    </>
  );
}

export default MyBooking;
