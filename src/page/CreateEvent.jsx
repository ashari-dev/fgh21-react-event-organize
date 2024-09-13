import React, { useEffect, useState } from "react";
import Layout2 from "../component/layouts/Layout2";
import Modal from "../component/Modal";
import { useSelector } from "react-redux";
import axios from "axios";
import ModalUpdate from "../component/ModalUpdate";
import Loading from "../component/Loading";

function CreateEvent() {
  const url = "http://localhost:8080";
  const token = useSelector((state) => state.auth.token);
  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [dataEvent, setDataEvent] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await axios(`${url}/event/my-events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataEvent(data.data.result);
    })();
  }, [modal, modalUpdate, alert]);

  function handlerUpdate(data) {
    setDataUpdate(data);
    setModalUpdate(true);
  }
  async function handlerDelete(id) {
    try {
      const respont = await axios.delete(`${url}/event/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    } catch (error) {}
  }
  return (
    <>
      {loading ? <Loading /> : ""}
      {modal ? <Modal token={token} close={setModal} /> : ""}
      {modalUpdate ? (
        <ModalUpdate data={dataUpdate} token={token} close={setModalUpdate} />
      ) : (
        ""
      )}
      <Layout2>
        {alert ? <p>data berhasil di hapus</p> : ""}
        <div className="text-xl font-bold flex justify-between items-center">
          Manage Event
          <button
            onClick={() => {
              setModal(true);
            }}
            className="bg-[#EAF1FF] hidden h-[50px] w-[125px] md:flex items-center justify-center text-sm gap-3 text-[#180161] rounded-xl"
          >
            Create
          </button>
        </div>
        <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
          {dataEvent.length > 0 ? (
            dataEvent.map((i) => (
              <div className="border-b-2 pb-5 w-full">
                <div className="flex gap-8">
                  <div className="flex flex-col h-[75px] w-[50px] justify-center shadow items-center rounded-2xl text-sm text-[#FF8900] font-semibold ">
                    15
                    <span className="text-xs text-[#C1C5D0] font-normal">
                      Wed
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h2 className="text-2xl font-semibold text-[#373A42]">
                      {i.title}
                    </h2>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text[#373A42BF]">Lokasi</span>
                      <span className="text-xs text[#373A42BF]">{i.date}</span>
                      <div className="flex gap-3">
                        <button className="text-xs text-[#180161] mt-1">
                          Detail
                        </button>
                        <button
                          onClick={() => handlerUpdate(i)}
                          className="text-xs text-[#180161] mt-1"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handlerDelete(i.id)}
                          className="text-xs text-[#180161] mt-1"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="mt-10 hidden md: md:mt-0 text-2xl font-semibold">
                you don't have an event
              </div>
              <div className="mt-10 md:hidden text-2xl text-center font-semibold">
                Cannot create in mobile mode
              </div>
              <div className="w-[50%] hidden md:flex text-[#B3B8B8] text-md text-center">
                It appears you haven't bought any tickets yet. Maybe try create
                these?
              </div>
            </>
          )}
        </div>
      </Layout2>
    </>
  );
}

export default CreateEvent;
