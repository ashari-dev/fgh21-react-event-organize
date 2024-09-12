import React, { useState } from "react";
import Layout1 from "../../component/layouts/Layout1";
import {
  FaChevronDown,
  FaChevronUp,
  FaCreditCard,
  FaDollarSign,
} from "react-icons/fa";
import { FaBuildingColumns, FaShop } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetEventQuery } from "../../redux/services/event";
import axios from "axios";
import Loading from "../../component/Loading";

function EventPayment() {
  const url = "http://localhost:8080";
  const nav = useNavigate();
  const [payment, setPayment] = useState(1);
  const dataSection = useSelector((state) => state.section.data);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  if (dataSection.eventId == undefined) {
    nav("/");
  }
  function paymentSet(e) {
    setPayment(parseInt(e.target.value));
  }
  const { data, error, isLoading } = useGetEventQuery(dataSection.eventId);
  async function transaction() {
    try {
      const data = await axios.post(
        `${url}/transactions`,
        {
          eventId: dataSection.eventId,
          sectionId: dataSection.sectionArr,
          ticketQty: dataSection.qtyArr,
          paymentMethodId: payment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      nav("/my-booking");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {isLoading ? <Loading /> : ""}
      <Layout1>
        <div className="p-10 m-10 border rounded-3xl shadow-lg flex">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex flex-col gap-5 ">
              <div className="text-xl font-semibold">Payment Method</div>
              <div className="flex flex-col gap-10">
                <div className="flex gap-5">
                  <input
                    onChange={paymentSet}
                    name="payment"
                    id="card"
                    type="radio"
                    value={1}
                    checked={payment == 1}
                  />
                  <div className="h-11 w-11 bg-[#884DFF33] rounded-lg flex items-center justify-center">
                    <FaCreditCard className="text-[#884DFF]" />
                  </div>
                  <label
                    htmlFor="card"
                    className="flex items-center justify-between w-[60%]"
                  >
                    <span className="font-semibold text-sm">Card</span>
                    {payment == 1 ? (
                      <FaChevronUp className="text-[#979797]" />
                    ) : (
                      <FaChevronDown className="text-[#979797]" />
                    )}
                  </label>
                </div>
                {payment == 1 ? (
                  <div className=" flex ml-[5%] items-center gap-8 mt-[-20px]">
                    <div className="h-44 w-72 bg-black rounded-2xl overflow-hidden"></div>
                    <button className="h-11 w-11 border-2 border-[#180161] border-dashed rounded-xl text-[#180161] text-3xl ">
                      +
                    </button>
                  </div>
                ) : (
                  ""
                )}

                <div className="flex gap-5">
                  <input
                    name="payment"
                    id="bank"
                    type="radio"
                    value={2}
                    onChange={paymentSet}
                  />
                  <div className="h-11 w-11 bg-[#FC105533] rounded-lg flex items-center justify-center">
                    <FaBuildingColumns className="text-[#FC1055]" />
                  </div>
                  <label
                    htmlFor="bank"
                    className="flex items-center justify-between w-[60%]"
                  >
                    <span className="font-semibold text-sm">Bank Transfer</span>
                    {payment == 2 ? (
                      <FaChevronUp className="text-[#979797]" />
                    ) : (
                      <FaChevronDown className="text-[#979797]" />
                    )}
                  </label>
                </div>
                {payment == 2 ? (
                  <div className=" flex ml-[5%] items-center gap-8 mt-[-20px]">
                    <div className="h-44 w-72 bg-black rounded-2xl overflow-hidden"></div>
                    <button className="h-11 w-11 border-2 border-[#180161] border-dashed rounded-xl text-[#180161] text-3xl ">
                      +
                    </button>
                  </div>
                ) : (
                  ""
                )}

                <div className="flex gap-5">
                  <input
                    name="payment"
                    id="retail"
                    type="radio"
                    value={3}
                    onChange={paymentSet}
                  />
                  <div className="h-11 w-11 bg-[#FF890033] rounded-lg flex items-center justify-center">
                    <FaShop className="text-[#FF8900]" />
                  </div>
                  <label
                    htmlFor="retail"
                    className="flex items-center justify-between w-[60%]"
                  >
                    <span className="font-semibold text-sm">Retail</span>{" "}
                    {payment == 3 ? (
                      <FaChevronUp className="text-[#979797]" />
                    ) : (
                      <FaChevronDown className="text-[#979797]" />
                    )}
                  </label>
                </div>
                {payment == 3 ? (
                  <div className=" flex ml-[5%] items-center gap-8 mt-[-20px]">
                    <div className="h-44 w-72 bg-black rounded-2xl overflow-hidden"></div>
                    <button className="h-11 w-11 border-2 border-[#180161] border-dashed rounded-xl text-[#180161] text-3xl ">
                      +
                    </button>
                  </div>
                ) : (
                  ""
                )}

                <div className="flex gap-5">
                  <input
                    name="payment"
                    id="emoney"
                    type="radio"
                    value={4}
                    onChange={paymentSet}
                  />
                  <div className="h-11 w-11 bg-[#3366FF33] rounded-lg flex items-center justify-center">
                    <FaDollarSign className="text-[#3366FF]" />
                  </div>
                  <label
                    htmlFor="emoney"
                    className="flex items-center justify-between w-[60%]"
                  >
                    <span className="font-semibold text-sm">E-Money</span>
                    {payment == 4 ? (
                      <FaChevronUp className="text-[#979797]" />
                    ) : (
                      <FaChevronDown className="text-[#979797]" />
                    )}
                  </label>
                </div>
                {payment == 4 ? (
                  <div className=" flex ml-[5%] items-center gap-8 mt-[-20px]">
                    <div className="h-44 w-72 bg-black rounded-2xl overflow-hidden"></div>
                    <button className="h-11 w-11 border-2 border-[#180161] border-dashed rounded-xl text-[#180161] text-3xl ">
                      +
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-10">
            <div className="border-l-2 flex justify-center">
              <div className="w-3/4 flex flex-col gap-10">
                <h1 className="text-xl font-semibold">Ticket Detail</h1>
                <div className="flex flex-col gap-3">
                  <div className="text-sm font-bold flex justify-between">
                    Event
                    <span className="text-red-500">{data?.result?.title}</span>
                  </div>
                  <div className="text-sm font-bold flex justify-between">
                    Ticket Section
                    <span className="text-red-500">
                      {dataSection.section == 0
                        ? "-"
                        : dataSection?.section?.join(", ")}
                    </span>
                  </div>
                  <div className="text-sm font-bold flex justify-between">
                    Quantity
                    <span className="text-red-500">
                      {dataSection.quantity == 0 ? "-" : dataSection.quantity}
                    </span>
                  </div>
                  <div className="text-sm font-bold flex justify-between">
                    Total Payment
                    <span className="text-red-500">
                      {dataSection.total == 0
                        ? "-"
                        : "Rp. " + dataSection?.total?.toLocaleString("id")}
                    </span>
                  </div>
                </div>
                <button
                  onClick={transaction}
                  className="bg-red-500 py-2 rounded-xl text-white font-semibold"
                >
                  Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout1>
    </>
  );
}

export default EventPayment;
