import React, { useEffect, useState } from "react";
import Layout2 from "../component/layouts/Layout2";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import Loading from "../component/Loading";

function MyWishlist() {
  const url = "http://localhost:8080";
  const token = useSelector((state) => state.auth.token);
  const [wishlist, setWishlist] = useState([]);
  const [del, setDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await axios.get(`${url}/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist(data.data.result);
      } catch (error) {
        console.log(error);
      }
    })();
    setLoading(false);
  }, [del]);

  async function removeWishlist(id) {
    setLoading(true);
    try {
      const delData = await axios.delete(`${url}/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDelete(true);
      setTimeout(() => {
        setDelete(false);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {loading ? <Loading /> : ""}
      <Layout2>
        <div className="text-xl font-bold flex justify-between items-center">
          My Wishlist
        </div>
        <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
          {wishlist.length > 0 ? (
            wishlist.map((i) => {
              return (
                <div key={i.id} className="pb-5 w-full">
                  <div className="flex gap-8">
                    <div className="flex flex-col h-[75px] w-[50px] justify-center shadow items-center rounded-2xl text-sm text-[#FF8900] font-semibold ">
                      15
                      <span className="text-xs text-[#C1C5D0] font-normal">
                        Wed
                      </span>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                      <h2 className="flex justify-between border-b-2 w-full text-2xl font-semibold text-[#373A42]">
                        {i.title}
                        <button>
                          <FaRegHeart
                            onClick={() => removeWishlist(i.id)}
                            className="text-[#180161]"
                          />
                        </button>
                      </h2>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text[#373A42BF]">
                          location {i.location}
                        </span>
                        <span className="text-xs text[#373A42BF]">
                          {i.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-full w-full flex flex-col gap-5 items-center justify-center">
              <div className="text-2xl font-semibold">
                No wishlisted tickets
              </div>
              <div className="w-[50%] flex text-[#B3B8B8] text-md text-center">
                It appears you haven’t bought any tickets yet. Maybe try
                searching these?
              </div>
            </div>
          )}
        </div>
      </Layout2>
    </>
  );
}

export default MyWishlist;
