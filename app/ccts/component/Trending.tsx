"use client";

import { useEffect, useState } from "react";
import Card from "./Card";
import { axios } from "@/lib";
import Loading from "@/app/loading";
import dayjs from "dayjs";

const Trending = () => {
  const [activeTab, setActiveTab] = useState<string>("Weekly");

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async (currentTab: string) => {
    setLoading(true);
    const date =
      currentTab === "Weekly"
        ? dayjs().subtract(7, "day").format("YYYY-MM-DD")
        : currentTab === "Monthly"
        ? dayjs().subtract(1, "month").format("YYYY-MM-DD")
        : currentTab === "Daily"
        ? dayjs().format("YYYY-MM-DD")
        : null;

    axios
      .get("/ccts", {
        params: { date: date },
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
    fetchData(activeTab);
  }, [activeTab]);

  return (
    <div>
      <div className="flex mb-8 justify-between px-8 gap-8 text-xs leading-4 font-bold text-center">
        <button
          className={
            activeTab === "Daily"
              ? "text-white py-2 px-4 rounded-lg sosh__linear-gradient"
              : "text-SoshColorGrey500 py-2 px-4"
          }
          onClick={(e) => setActiveTab("Daily")}
        >
          Daily
        </button>
        <button
          className={
            activeTab === "Weekly"
              ? "text-white py-2 px-4 rounded-lg sosh__linear-gradient"
              : "text-SoshColorGrey500 py-2 px-4"
          }
          onClick={(e) => setActiveTab("Weekly")}
        >
          Weekly
        </button>
        <button
          className={
            activeTab === "Monthly"
              ? "text-white py-2 px-4 rounded-lg sosh__linear-gradient"
              : "text-SoshColorGrey500 py-2 px-4"
          }
          onClick={(e) => setActiveTab("Monthly")}
        >
          Monthly
        </button>
      </div>
      <div>{isLoading ? <Loading /> : <Card data={data} />}</div>
    </div>
  );
};

export default Trending;
