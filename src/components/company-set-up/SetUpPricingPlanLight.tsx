"use client";
import React, { useContext } from "react";
import Image from "next/image";
import circleImg from "../../../public/icons/plan-feature.png";
import Link from "next/link";
import { trpc } from "@/app/_trpc/client";
import router from "next/router";
import SetUpContext from "./SetUpContext";

interface Props {
  price: string;
  name: string;
  desc: string;
  features: string[];
  linkText: string;
}

const SetUpPricingPlanLight = ({
  price,
  name,
  desc,
  features,
  linkText,
}: Props) => {
  const { createUser } = useContext(SetUpContext);
  const { mutate: createStripeSession } = trpc.createStripeSession.useMutation({
    onSuccess: ({ url }) => {
      window.location.href = url ?? "/dashboard/billing";
    },
  });

  const handleSubmit = () => {
    createUser();
    createStripeSession({ planName: name });
  };
  return (
    <div
      className="bg-white flex flex-col items-center justify-between min-w-[270px] md:min-w-[26%] md:max-w-[26%]
  min-h-[436px] md:min-h-[238px] lg:min-h-[318px] xl:min-h-[400px] 2xl:min-h-[447px] desktop:min-h-[534px] ultra:min-h-[798px]
  py-[33px] md:py-0 md:pt-[33px] lg:pt-[44px] xl:pt-[55px] 2xl:pt-[62px] desktop:pt-[74px] ultra:pt-[110px]
  md:pb-[10px] lg:pb-[13px] xl:pb-[16px] 2xl:pb-[19px] desktop:pb-[22px] ultra:pb-[33px]
  rounded-[21px] md:rounded-xl lg:rounded-2xl xl:rounded-[20px] 2xl:rounded-[23px] desktop:rounded-[27px] ultra:rounded-[40px]
"
      style={{
        boxShadow: "0px 38.8px 31.4095px rgba(183, 183, 183, 0.295755)",
      }}
    >
      <div className="flex flex-col w-[70%] gap-6 md:gap-[14px] lg:gap-[18px] xl:gap-[22px] 2xl:gap-[26px] desktop:gap-[31px] ultra:gap-[49px]">
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
      <div
        onClick={handleSubmit}
        className="bg-primary text-white text-opacity-90 font-sf
        text-[14px] md:text-[8px] lg:text-[10px] xl:text-[13px] 2xl:text-[15px] desktop:text-[17px] ultra:text-[26px]
        h-[42px] md:h-[22px] lg:h-[30px] xl:h-[38px] 2xl:h-[42px] desktop:h-[50px] ultra:h-[76px]
        rounded-[11px] md:rounded-[6px] lg:rounded-lg xl:rounded-[10px] 2xl:rounded-[11px] desktop:rounded-[14px] ultra:rounded-[20px]
        w-[70%] flex items-center justify-center"
      >
        {linkText}
      </div>
    </div>
  );
};

export default SetUpPricingPlanLight;
