"use client";

import { useEffect, useState } from "react";
import Card from "./Card";
import { axios } from "@/lib";
import Loading from "@/app/loading";

const Latest = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/ccts")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return <div>{isLoading ? <Loading /> : <Card data={data} />}</div>;
};

export default Latest;
