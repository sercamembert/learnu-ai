import React from "react";
import Image from "next/image";
interface Props {
  imageUrl: string;
  text: string;
  width: number;
  height: number;
}

const DashboardLink = ({ imageUrl, text, width, height }: Props) => {
  return (
    <div className="flex gap-[27px] items-center">
      <div className="min-w-[30px]">
        <Image
          src={imageUrl}
          alt="Dashboard icon"
          width={width}
          height={height}
        />
      </div>

      <p className="font-medium text-[22px]">{text}</p>
    </div>
  );
};

export default DashboardLink;
