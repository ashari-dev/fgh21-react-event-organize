import axios from "axios";
import React from "react";

function ModalDeleteEvent(props) {
  const url = "http://103.93.58.89:21216";
  async function handlerDelete() {
    try {
      const respont = await axios.delete(`${url}/event/${props.id}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      props.close(false);
      console.log(respont);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className=" fixed top-0 left-0 flex w-screen h-screen items-center justify-center bg-[#00000060]">
      <div className="p-10 border rounded-xl bg-white flex flex-col gap-5">
        <h4 className="text-xl font-semibold">
          Are you sure you want to delete this data?
        </h4>
        <div className="w-full flex gap-5 justify-center">
          <button
            onClick={handlerDelete}
            className="px-3 py-1 bg-red-500 rounded-lg text-xl font-semibold text-white"
          >
            Yes
          </button>
          <button
            onClick={() => props.close(false)}
            className="px-3 py-1 bg-blue-500 rounded-lg text-xl font-semibold text-white"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteEvent;
