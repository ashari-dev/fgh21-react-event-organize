import React from "react";
import Attendess from "./Attendess";
import { Link } from "react-router-dom";

function CardEvent(props) {
  
  return (
    <Link to={"/event/"+props.data?.id}>
      <div className="w-64 h-96 flex overflow-hidden rounded-3xl bg-red-500 shadow-lg bg-gradient-to-t from-zinc-900 to-zinc-50 relative flex-shrink-0">
        <div className="bg-gradient-to-t from-zinc-900 to-transparent absolute w-full h-full opacity-100"></div>
        {props.data ? (
          <img className="object-fill" src={props.data.image} alt="" />
        ) : (
          ""
        )}

        <div className="absolute gap-3 w-full h-full p-5 flex flex-col justify-end text-white">
          <h4 className="text-lg font-semibold">
            {props.data?.date ? props.data?.date : "Wed, 15 Nov, 4:00 PM"}
          </h4>
          <h2 className="text-2xl font-semibold">
            {props.data?.title
              ? props.data?.title
              : "Sights & Sounds Exhibition"}
          </h2>
          <Attendess />
        </div>
      </div>
    </Link>
  );
}

export default CardEvent;
