import React from "react";
import bg from "../../assets/img/bg1.png";
function HomeCover() {
  return (
    <>
      <div className="bg-blue-500 h-[60vh] overflow-hidden">
        <img className="object-fill w-full" src={bg} />
      </div>
    </>
  );
}

export default HomeCover;
