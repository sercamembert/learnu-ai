import React, { useContext, useRef } from "react";
import Image from "next/image";
import SetUpContext from "./SetUpContext";
import { useToast } from "../ui/use-toast";

interface Props {
  onNextButtonClick: () => void;
}
const StepCompanyName = ({ onNextButtonClick }: Props) => {
  const {
    activeStep,
    name,
    industry,
    setActiveStep,
    handleNameChange,
    handleIndustryChange,
  } = useContext(SetUpContext);

  const nameRef = useRef<HTMLInputElement>(null);
  const industryRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const handleNextStep = () => {
    if (
      name.trim().length > 0 &&
      name.trim().length < 50 &&
      industry.trim().length > 0 &&
      industry.trim().length < 50
    ) {
      setActiveStep(activeStep + 1);
      onNextButtonClick();
    } else if (name.length < 1) {
      nameRef.current?.focus();
    } else if (industry.length < 1) {
      industryRef.current?.focus();
    } else if (name.length > 50) {
      nameRef.current?.focus();
      return toast({
        title: "Something went wrong",
        description: "Company name can't be longer than 50 characters",
        variant: "destructive",
      });
    } else if (industry.length > 50) {
      industryRef.current?.focus();
      return toast({
        title: "Something went wrong",
        description:
          "Industry of the Copmany can't be longer than 50 characters",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="padding md:flex justify-between pt-[80px] md:pt-[95px] lg:pt-[100px] xl:pt-[110px] max-h-[85vh]">
      <div>
        <h1 className="font-semibold font-sf text-[34px] md:text-[24px] lg:text-[33px] xl:text-[41px] 2xl:text-[46px] desktop:text-[55px] ultra:text-[82px]">
          Set Up your profile
        </h1>
        <p className="font-medium font-secondary opacity-90 text-[18px] md:text-[12px] lg:text-[16px] xl:text-[21px] 2xl:text-[23px] desktop:text-[28px] ultra:text-[42px]">
          Company or organization name
        </p>

        <div className="flex flex-col pt-8 md:pt-6 lg:pt-8 xl:pt-9 2xl:pt-11 desktop:pt-12 ultra:pt-20 w-full sm:w-1/2 md:w-[89%]">
          <p
            className="font-primary opacity-50 text-[14px] md:text-[9px] lg:text-[11px] xl:text-[14px] 2xl:text-[16px] desktop:text-[19px] ultra:text-[28px]
        pb-3 md:pb-1 lg:pb-2 xl:pb-3 desktop:pb-4 ultra:pb-6 
        "
          >
            Enter the name of your business
          </p>
          <input
            type="text"
            placeholder="e.g. super bussines"
            className="bg-primary bg-opacity-5 placeholder:opacity-50
          text-[12px] md:text-[8px] lg:text-[10px] xl:text-[11px] 2xl:text-[14px] desktop:text-[16px] ultra:text-[23px]
          p-2 md:p-1 lg:p-2 desktop:p-3 ultra:p-4
          rounded-md ultra:rounded-lg"
            value={name}
            onChange={handleNameChange}
            ref={nameRef}
          />
          <p
            className="font-primary opacity-50 text-[14px] md:text-[9px] lg:text-[11px] xl:text-[14px] 2xl:text-[16px] desktop:text-[19px] ultra:text-[28px]
        pb-3 md:pb-1 lg:pb-2 xl:pb-3 desktop:pb-4 ultra:pb-6 
        pt-6 md:pt-3 lg:pt-4 xl:pt-6 desktop:pt-8 ultra:pt-11
        "
          >
            Industry of the Company
          </p>
          <input
            type="text"
            placeholder="e.g. software company"
            className="bg-primary bg-opacity-5 placeholder:opacity-50
          text-[12px] md:text-[8px] lg:text-[10px] xl:text-[11px] 2xl:text-[14px] desktop:text-[16px] ultra:text-[23px]
          p-2 md:p-1 lg:p-2 desktop:p-3 ultra:p-4
          rounded-md ultra:rounded-lg
          mb-8 md:mb-4 lg:mb-6 xl:mb-7 2xl:mb-8 desktop:mb-9 ultra:mb-16"
            value={industry}
            onChange={handleIndustryChange}
            ref={industryRef}
          />

          <button
            className="bg-primary text-white text-opacity-90 font-sf
        text-[14px] md:text-[8px] lg:text-[10px] xl:text-[13px] 2xl:text-[15px] desktop:text-[17px] ultra:text-[26px]
        py-3 md:py-[6px] lg:py-2 xl:py-[10px] 2xl:py-3 ultra:py-5
        rounded-md md:rounded-[4px] lg:rounded-md desktop:rounded-lg ultra:rounded-xl
        max-w-[100px] md:max-w-[28%] 
        "
            onClick={handleNextStep}
          >
            Next Step
          </button>
        </div>
      </div>
      <Image
        src="/images/set-up/process.png"
        alt="process"
        width={927}
        height={784}
        className="hidden md:block w-[51%] aspect-[927/784]"
        quality={100}
      />
    </div>
  );
};

export default StepCompanyName;
