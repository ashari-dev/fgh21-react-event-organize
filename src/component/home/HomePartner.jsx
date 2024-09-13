import React from "react";
import bg from "../../assets/img/bg3.png";

function HomePartner() {
  return (
    <>
      <div className="bg-blue-900 relative overflow-hidden">
        <img className="h-full absolute" src={bg} alt="" />
        <div className="top-0 p-20 w-full flex flex-col gap-10">
          <div className="flex flex-col gap-5 items-center">
            <span className="bg-blue-200 text-blue-600 px-5 py-1 font-semibold rounded-full">
              &minus; Partner
            </span>
            <h1 className="text-4xl font-semibold text-white">
              Our Trusted Partners
            </h1>
          </div>
          <div className="flex flex-col items-center gap-14">
            <h5 className="text-white">By companies like :</h5>
            <div className="flex gap-10 flex-wrap">
              <div className="w-20 rounded-xl">
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png"
                  alt=""
                />
              </div>
              <div className="w-20 rounded-xl">
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png"
                  alt=""
                />
              </div>
              <div className="w-20 rounded-xl">
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png"
                  alt=""
                />
              </div>
              <div className="w-20 rounded-xl">
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png"
                  alt=""
                />
              </div>
              <div className="w-20 rounded-xl">
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png"
                  alt=""
                />
              </div>
              <div className="w-20 rounded-xl">
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePartner;
