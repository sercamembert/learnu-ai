import React from "react";

interface Props {
  activeStep: number;
}

const SetUpStepper = ({ activeStep }: Props) => {
  return (
    <div
      className="flex padding md:justify-center max-h-screen
  pt-[40px] md:pt-0 gap-[10px] md:gap-2 lg:gap-2 xl:gap-[10px] 2xl:gap-3 ultra:gap-5
  absolute w-full md:bottom-[50px] lg:bottom-[60px] xl:bottom-[75px] 2xl:bottom-[80px] desktop:bottom-[60px] ultra:bottom-[140px]
  "
    >
      <div className={`step ${activeStep === 1 && "opacity-100"} `}></div>
      <div className={`step ${activeStep === 2 && "opacity-100"} `}></div>
      <div className={`step ${activeStep === 3 && "opacity-100"} `}></div>
    </div>
  );
};

export default SetUpStepper;
