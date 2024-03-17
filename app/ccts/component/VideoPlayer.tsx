"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";

const VideoPlayer = (video_id: any) => {

  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async() => {
      console.log(Date.now())
      console.log("lllll", video_id.video_id);
      const {data} = await axios.get("http://localhost:8080/" + video_id.video_id);
      if (data) {
        console.log(data.assets.mp4);
        setUrl(data.assets.mp4);
      }

      console.log("after", Date.now())
    }

    fetchData();
  }, [video_id.video_id])

  if (!url) {
    console.log("rendering non url")
    return;
  }
  return (
    <div className="absolute left-0 top-0">
      <ReactPlayer
        width="400px"
        height="300px"
        url={url}
        playing={true}
        // controls={true}
        // light is usefull incase of dark mode
        light={false}
        // picture in picture
        pip={true}
      />
     </div>
  );
};

export default VideoPlayer;