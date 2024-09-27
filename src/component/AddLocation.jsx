import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

function AddLocation(props) {
  return (
    <>
      <div className="md:h-full w-full bg-[#00000047] fixed top-0">
        <div className="bg-white p-16 m-20 rounded-3xl flex flex-col relative gap-10">
          <button
            onClick={() => {
              props.close(false);
            }}
            className="absolute right-16 top-10 text-2xl"
          >
            <IoMdCloseCircleOutline />
          </button>
          <h2 className="text-xl font-semibold">Create Event</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-[#373A42] text-sm" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Input Name Location"
                className="h-[55px] border pl-6 rounded-2xl"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#373A42] text-sm" htmlFor="img">
                Image
              </label>
              <input
                type="text"
                name="img"
                id="img"
                placeholder="Chose File ..."
                className="h-[55px] border pl-6 rounded-2xl"
                autoComplete="off"
              />
            </div>
            <div className="md:col-span-2 flex md:justify-end">
              <button className="h-[61px] w-full md:w-[315px] bg-[#180161] rounded-2xl text-white font-semibold shadow-xl">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddLocation;
