import React, { useState } from "react";
import Layout1 from "../../component/layouts/Layout1";
import { FaHeadSideCough, FaRegClock, FaRegHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Attendess from "../../component/Attendess";
import { useNavigate, useParams } from "react-router-dom";
import { useGetEventQuery } from "../../redux/services/event";
import axios from "axios";
import { useSelector } from "react-redux";
import Loading from "../../component/Loading";
import Alert from "../../component/Alert";

function EventPage() {
  const url = "http://103.93.58.89:21216";
  const token = useSelector((state) => state.auth.token);
  const nav = useNavigate();
  const id = useParams().id;
  const { data, error, isLoading } = useGetEventQuery(id);
  const eventId = useParams().id;

  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState();
  async function handlerWishlist() {
    try {
      const data = await axios.post(
        `${url}/wishlist`,
        {
          eventId: parseInt(eventId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      setMsg(err.response.data.message);
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  }
  return (
    <>
      {isLoading ? <Loading /> : ""}
      {err ? <Alert msg={msg} /> : ""}
      <Layout1>
        <div className="md:p-10 p-5 md:m-10 border md:rounded-3xl md:shadow-lg flex flex-col md:flex-row">
          <div className="flex-1 flex flex-col gap-5 items-center">
            <div className="w-[375px] h-[490px] flex overflow-hidden rounded-3xl bg-red-500 shadow-xl bg-gradient-to-t from-zinc-900 to-zinc-50 relative ">
              <div className=" bg-gradient-to-t from-zinc-900 to-transparent absolute w-full h-full opacity-100"></div>
              <img
                className="object-cover w-full"
                src={data?.result?.image}
                alt=""
              />
            </div>
            {token == null ? (
              ""
            ) : (
              <button
                onClick={handlerWishlist}
                className=" md:flex absolute md:relative right-8 mt-5 md:mt-0 gap-3 items-center text-xl text-white md:text-black"
              >
                <FaRegHeart />{" "}
                <span className="font-semibold hidden md:block">
                  Add to Wishlist
                </span>
              </button>
            )}
          </div>
          <div className="flex-1 flex mt-5 md:mt-0 flex-col gap-7">
            <h1 className="text-2xl font-semibold">
              Sights & Sounds Exhibition
            </h1>
            <div className="flex justify-between w-2/3">
              <span className="flex gap-3 items-center">
                <FaLocationDot /> {data?.result?.location}
              </span>
              <span className="flex gap-3 items-center">
                <FaRegClock /> {data?.result?.date}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-lg font-semibold">Attendees</span>
              <Attendess />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold">Event Detail</h3>
              <p className="w-2/3 text-xs">{data?.result?.description}</p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold">Location</h3>
              <div className="w-80 h-36 bg-blue-900 rounded-xl"></div>
            </div>
            <div>
              <button
                onClick={() => nav("/event/booking/" + data?.result?.id)}
                className="bg-red-500 py-2 px-16 rounded-xl shadow-md text-white font-semibold"
              >
                Buy Tickets
              </button>
            </div>
          </div>
        </div>
      </Layout1>
    </>
  );
}

export default EventPage;
