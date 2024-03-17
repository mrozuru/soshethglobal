import Image from "next/image";
import React from "react";

interface Face {
  id: number;
  name: string;
  imgUrl: string;
}

interface Props {
  faces: Face[];
}

const FacePile: React.FC<Props> = ({ faces }) => {
  return (
    <div className="flex items-center">
      {faces.map((face, index) => (
        <div key={face.id} className={`-mr-10`} style={{ zIndex: 100 - index }}>
          <Image
            src={face.imgUrl}
            alt={face.name}
            width={60}
            height={60}
            className={`rounded-full shadow-md`}
          />
        </div>
      ))}
    </div>
  );
};

export default FacePile;
