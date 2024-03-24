import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
interface Props {
  imageUrl: string;
  text: string;
  width: number;
  height: number;
  href: string;
  isActive: boolean;
}

const DashboardLink = ({
  imageUrl,
  text,
  href,
  width,
  height,
  isActive,
}: Props) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-[22px] lg:gap-3 xl:gap-[14px] desktop:gap-5 ultra:gap-[30px]"
    >
      <div className="min-w-[30px] lg:min-w-[15px] 2xl:min-w-[25px] desktop:min-w-[30px] ultra:min-w-[40px]">
        <Image
          src={imageUrl}
          alt="Dashboard icon"
          width={width}
          height={height}
          className="lg:max-w-[15px] 2xl:max-w-[20px] desktop:max-w-full ultra:min-w-[40px]"
        />
      </div>

      <p
        className={cn(
          "text-[22px] lg:text-[11px] xl:text-[14px] 2xl:text-[16px] desktop:text-[19px] ultra:text-[28px]",
          { "lg:font-bold": isActive, "font-medium": !isActive }
        )}
      >
        {text}
      </p>
    </Link>
  );
};

export default DashboardLink;
