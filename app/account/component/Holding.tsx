"use client";

import { useEffect, useState } from "react";

import { axios } from "@/lib";
import Loading from "@/app/loading";
import Card from "./Card";

const Holding = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    const user = localStorage.getItem("user");

    axios
      .get("/account", {
        params: { userId: user },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>{isLoading ? <Loading /> : <Card data={data} />}</div>;
};

export default Holding;
