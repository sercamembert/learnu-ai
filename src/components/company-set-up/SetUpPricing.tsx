import React from "react";

import SetUpPricingPlanLight from "./SetUpPricingPlanLight";
import SetUpPricingPlanDark from "./SetUpPricingPlanDark";
import MobileScroll from "../MobileScroll";

const SetUpPricing = () => {
  return (
    <div className=" flex flex-col pt-[80px] md:pt-[95px] lg:pt-[100px] xl:pt-[110px] ">
      <div className="mb-2 padding">
        <h1 className="font-semibold font-sf text-[34px] md:text-[24px] lg:text-[33px] xl:text-[41px] 2xl:text-[46px] desktop:text-[55px] ultra:text-[82px]">
          Plans & Pricing
        </h1>
        <p className="font-medium font-secondary opacity-90 text-[18px] md:text-[12px] lg:text-[16px] xl:text-[21px] 2xl:text-[23px] desktop:text-[28px] ultra:text-[42px]">
          Whether your time-saving automation needs are
          <br className="hidden sm:block" /> large or small, we’re here to help
          you scale.
        </p>
      </div>
      <MobileScroll>
        <div className="mb-[40px] md:mb-[50px] w-full flex gap-[45px] md:gap-0 items-center md:justify-between pb-3 gap-y-[56px]">
          <SetUpPricingPlanLight
            price="19$"
            name="Basic"
            desc="Access to basic features, perfect for individual users."
            features={["Company profile", "Natural questions", "5GB data"]}
            linkText="7 days for free"
          />
          <SetUpPricingPlanLight
            price="34$"
            name="Premium"
            desc="Advanced tools to take your work to the next level."
            features={[
              "Everything in Basic",
              "NLP algorithms",
              "20GB data",
              "Profile + analysis",
            ]}
            linkText="Choose plan"
          />
          <SetUpPricingPlanDark
            price="59$"
            name="Professional"
            desc="Automation plus enterprise-grade features."
            features={[
              "Everything in Premium",
              "50GB data",
              "Priority support",
              "Fast information retrieval",
            ]}
            linkText="Choose plan"
          />
        </div>
      </MobileScroll>
    </div>
  );
};

export default SetUpPricing;
