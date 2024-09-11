import React from "react";
import { MdDownloading } from "react-icons/md";
function Loading() {
  return (
    <div className="bg-[#00000060] fixed w-full h-full flex items-center justify-center">
      <MdDownloading className="text-9xl text-gray-500 animate-bounce" />
    </div>
  );
}

export default Loading;
