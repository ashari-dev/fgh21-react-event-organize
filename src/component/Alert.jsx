import React from "react";

function Alert(props) {
  return (
    <>
      <div className="fixed flex items-center justify-center w-full h-screen bg-[#00000062]">
        <div className="px-10 py-5 bg-white rounded-xl text-xl font-semibold text-blue-700">
          {props.msg}
        </div>
      </div>
    </>
  );
}

export default Alert;
