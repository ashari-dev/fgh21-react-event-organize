import React, { useEffect, useState } from "react";

function Section(props) {
  const [num, setNum] = useState(0);

  useEffect(() => {
    const current = props.currentData;
    current[props.index] = {
      id: props.data.id,
      name: props.data.name,
      price: num * props.data.price,
      quantity: num,
    };
    props.onchange([...current]);
  }, [num]);
  return (
    <div className="flex gap-3">
      <div className="h-11 w-11 bg-[#F1EAFF] rounded-xl flex items-center justify-center"></div>
      <div className="flex flex-col flex-1 text-[#373A42] font-bold text-sm">
        {props.data.name}
        <span className="text-[#BDC0C4] text-xs font-medium">
          {props.data.quantity} Seats available
        </span>
        <div className="mt-5">Quantity</div>
      </div>
      <div className="flex flex-col  items-center text-[#373A42] font-bold text-sm">
        Rp. {props.data.price.toLocaleString("id")}
        <span className="text-[#BDC0C4] text-xs font-medium">per person</span>
        <div className="text-xs flex items-center font-bold mt-5 gap-4">
          <button
            onClick={() => setNum(num - 1)}
            className="h-8 w-8 rounded-md border-2 text-[#C1C5D0]"
            disabled={num == 0}
          >
            -
          </button>
          {num}
          <button
            onClick={() => setNum(num + 1)}
            className="h-8 w-8 rounded-md border-2 text-[#C1C5D0]"
            disabled={num == 4}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default Section;
