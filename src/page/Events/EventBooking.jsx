import React, { useEffect, useState } from "react";
import Layout1 from "../../component/layouts/Layout1";
import Section from "../../component/Event/Section";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useGetEventQuery } from "../../redux/services/event";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addDataSection } from "../../redux/reducers/section";
import Loading from "../../component/Loading";

function EventBooking() {
  const url = "http://103.93.58.89:21216";
  const nav = useNavigate();
  const id = useParams().id;
  const { data, error, isLoading } = useGetEventQuery(id);
  const [section, setSection] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    (async () => {
      const data = await axios.get(`${url}/event/section/${id}`);
      setSection(data.data.result);
    })();
  }, []);

  const ticketSection = selectedSection.reduce((prev, curr) => {
    const arr = prev;
    if (curr.quantity != 0) {
      arr.push(`${curr.name}(${curr.quantity})`);
    }
    return arr;
  }, []);

  const total = selectedSection.reduce((prev, curr) => prev + curr.price, 0);
  const quantity = selectedSection.reduce(
    (prev, curr) => prev + curr.quantity,
    0
  );

  const qtyArr = selectedSection.reduce((prev, curr) => {
    const arr = prev;
    if (curr.quantity != 0) {
      arr.push(curr.quantity);
    }
    return arr;
  }, []);
  const sectionArr = selectedSection.reduce((prev, curr) => {
    const arr = prev;
    if (curr.quantity != 0) {
      arr.push(curr.id);
    }
    return arr;
  }, []);
  const dataSection = {
    eventId: data?.result?.id,
    section: ticketSection,
    quantity,
    total,
    qtyArr,
    sectionArr,
  };

  dispatch(addDataSection(dataSection));
  return (
    <>
      {isLoading ? <Loading /> : ""}

      <Layout1>
        <div className="md:p-10 p-5 md:m-10 border md:rounded-3xl md:shadow-lg flex flex-col md:flex-row">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-[375px] h-[490px] flex overflow-hidden rounded-3xl bg-red-500 shadow-xl bg-gradient-to-t from-zinc-900 to-zinc-50 relative ">
              <div className="bg-gradient-to-t from-zinc-900 to-transparent absolute w-full h-full opacity-100"></div>
              <img
                className="object-cover w-full"
                src={data?.result?.image}
                alt=""
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-10 mt-5 md:mt-0">
            <div className="text-xl font-bold flex items-center justify-between">
              <span>{data?.result?.title}</span>
              <div
                className="gap-3 text-xs text-[#FC1055] flex items-center
                "
              >
                BY PRICE
                <button className="shadow-lg h-11 w-11 rounded-xl text-blue-500 flex items-center justify-center text-xl ">
                  <FaArrowRightArrowLeft className="rotate-90" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {section.map((item, index) => (
                <Section
                  key={item.id}
                  data={item}
                  index={index}
                  currentData={selectedSection}
                  onchange={setSelectedSection}
                />
              ))}
            </div>
            <hr className="" />
            <div className="flex flex-col gap-5">
              <div className="text-sm font-bold flex justify-between">
                Ticket Section
                <span className="text-red-500">
                  {ticketSection.length == 0 ? "-" : ticketSection.join(", ")}
                </span>
              </div>
              <div className="text-sm font-bold flex justify-between">
                Quantity
                <span className="text-red-500">
                  {quantity == 0 ? "-" : quantity}
                </span>
              </div>
              <div className="text-sm font-bold flex justify-between">
                Total Payment
                <span className="text-red-500">
                  {total == 0 ? "-" : "Rp." + total.toLocaleString("id")}
                </span>
              </div>
            </div>
            <button
              disabled={quantity == 0 || token == null}
              onClick={() => nav("/event/payment")}
              className="bg-red-500 py-2 rounded-xl text-white font-semibold"
            >
              Checkout
            </button>
          </div>
        </div>
      </Layout1>
    </>
  );
}

export default EventBooking;
