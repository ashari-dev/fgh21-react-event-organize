import React, { useState } from "react";
import HomeCover from "../component/home/Cover";
import HomeEvent from "../component/home/HomeEvent";
import HomeLocation from "../component/home/HomeLocation";
import HomeCategory from "../component/home/HomeCategory";
import HomePartner from "../component/home/HomePartner";
import Layout1 from "../component/layouts/Layout1";
import Loading from "../component/Loading";

function Home() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading ? <Loading /> : ""}
      <Layout1>
        <main className="flex flex-col gap-32">
          <HomeCover />
          <HomeEvent setLoading={setLoading} />
          <HomeLocation />
          <HomeCategory />
          <HomePartner />
        </main>
      </Layout1>
    </>
  );
}

export default Home;
