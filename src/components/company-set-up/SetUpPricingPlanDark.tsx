import React from "react";
import Image from "next/image";
import circleImg from "../../../public/icons/plan-feature-dark.png";
import Link from "next/link";

interface Props {
  price: string;
  name: string;
  desc: string;
  features: string[];
  linkText: string;
}

const SetUpPricingPlanDark = ({
  price,
  name,
  desc,
  features,
  linkText,
}: Props) => {
  return (
    <div
      className="bg-primary relative text-white flex flex-col items-center justify-between min-w-[270px] md:min-w-[26%] 
  min-h-[436px] md:min-h-[238px] lg:min-h-[318px] xl:min-h-[298px] 2xl:min-h-[447px] desktop:min-h-[534px] ultra:min-h-[798px]
  py-[33px] md:py-0 md:pt-[33px] lg:pt-[44px] xl:pt-[55px] 2xl:pt-[62px] desktop:pt-[74px] ultra:pt-[110px]
  md:pb-[10px] lg:pb-[13px] xl:pb-[16px] 2xl:pb-[19px] desktop:pb-[22px] ultra:pb-[33px]
  rounded-[21px] md:rounded-xl lg:rounded-2xl xl:rounded-[20px] 2xl:rounded-[23px] desktop:rounded-[27px] ultra:rounded-[40px]"
      style={{
        boxShadow: "0px 38.8px 31.4095px rgba(183, 183, 183, 0.295755)",
      }}
    >
      <div className="flex flex-col w-[70%] gap-6 md:gap-[14px] lg:gap-[18px] xl:gap-[22px] 2xl:gap-[26px] desktop:gap-[31px] ultra:gap-[49px]">
        {/* most popular */}
        <div
          className="bg-white bg-opacity-5 absolute top-[18px] md:top-[10px] lg:top-[13px] xl:top-[16px] 2xl:top-[18px] desktop:top-[21px] ultra:top-[32px]
        right-[28px] md:right-[15%]
        rounded-[31px] md:rounded-[7px] lg:rounded-[9px] xl:rounded-[11px] 2xl:rounded-[13px] desktop:rounded-[15px] ultra:rounded-[22px]
        w-[115px] md:w-[61px] lg:w-[81px] xl:w-[101px] 2xl:w-[115px] desktop:w-[136px] ultra:w-[203px]
        h-[25px] md:h-[13px] lg:h-[18px] xl:h-[22px] 2xl:h-[25px] desktop:h-[30px] ultra:h-[43px]
        flex items-center justify-center
        "
        >
          <p className="leading-none font-bold tracking-[1.4px] font-sf text-[9px] md:text-[5px] lg:text-[7px] xl:text-[8px] 2xl:text-[9px] desktop:text-[11px] ultra:text-[17px]">
            MOST POPULAR
          </p>
        </div>
        {/* plan price  */}
        <div className="flex items-end">
          <p className="leading-none font-bold font-sf text-[29px] md:text-[18px] lg:text-[24px] xl:text-[30px] 2xl:text-[34px] desktop:text-[40px] ultra:text-[60px]">
            {price}
          </p>
          <p className="pb-1 leading-none font-sf font-medium text-[15px] md:text-[9px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] desktop:text-[19px] ultra:text-[28px]">
            /month
          </p>
        </div>
        {/* plan description */}
        <div className="flex flex-col gap-[13px] md:gap-2 lg:gap-[10px] xl:gap-3 desktop:gap-4 ultra:gap-9">
          <p className="font-semibold font-sf text-[25px] md:text-[14px] lg:text-[19px] xl:text-[24px] 2xl:text-[26px] desktop:text-[31px] ultra:text-[47px]">
            {name}
          </p>
          <p className="opacity-80 font-medium font-sf text-[14px] md:text-[8px] lg:text-[11px] xl:text-[13px] 2xl:text-[14px] desktop:text-[17px] ultra:text-[25px]">
            {desc}
          </p>
        </div>
        {/* plan features  */}
        <div className="flex flex-col gap-2 md:gap-[5px] lg:gap-[7px] xl:gap-[9px] 2xl:gap-[10px] desktop:gap-[12px] ultra:gap-4">
          {features.map((feature, key) => (
            <div
              key={key}
              className="flex items-center gap-2 md:gap-[5px] lg:gap-[7px] xl:gap-[9px] 2xl:gap-[10px] desktop:gap-[11px] ultra:gap-4"
            >
              <Image
                src={circleImg}
                alt="feature"
                className="aspect-square w-[18px] md:w-[10px] lg:w-[13px] xl:w-[17px] 2xl:w-[19px] desktop:w-[22px] ultra:w-[33px]"
              />
              <p className="opacity-80 font-medium font-sf text-[14px] md:text-[8px] lg:text-[11px] xl:text-[13px] 2xl:text-[14px] desktop:text-[17px] ultra:text-[25px]">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Link
        href=""
        className="bg-white text-primary text-opacity-90 font-sf
        text-[14px] md:text-[8px] lg:text-[10px] xl:text-[13px] 2xl:text-[15px] desktop:text-[17px] ultra:text-[26px]
        h-[42px] md:h-[22px] lg:h-[30px] xl:h-[38px] 2xl:h-[42px] desktop:h-[50px] ultra:h-[76px]
        rounded-[11px] md:rounded-[6px] lg:rounded-lg xl:rounded-[10px] 2xl:rounded-[11px] desktop:rounded-[14px] ultra:rounded-[20px]
        w-[70%] flex items-center justify-center"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default SetUpPricingPlanDark;
