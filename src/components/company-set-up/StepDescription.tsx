import React, { useContext, useRef, useState } from "react";
import Image from "next/image";
import SetUpContext from "./SetUpContext";
import { useToast } from "../ui/use-toast";

interface Props {
  onNextButtonClick: () => void;
  onPrevButtonClick: () => void;
}

const SetUpDescription = ({ onPrevButtonClick, onNextButtonClick }: Props) => {
  const { activeStep, setActiveStep, description, handleDescriptionChange } =
    useContext(SetUpContext);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const { toast } = useToast();

  const handlePrevSte = () => {
    setActiveStep(activeStep - 1);
    onPrevButtonClick();
  };

  const handleNextStep = () => {
    if (description.trim().length > 0 && description.trim().length < 5000) {
      setActiveStep(activeStep + 1);
      onNextButtonClick();
    } else if (description.length < 1) {
      descriptionRef.current?.focus();
    } else if (description.length > 5000) {
      descriptionRef.current?.focus();
      return toast({
        title: "Something went wrong",
        description: "Company name can't be longer than 5000 characters",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="padding md:flex justify-between pt-[80px] md:pt-[95px] lg:pt-[100px] xl:pt-[110px] max-h-[85vh] ">
      <div>
        <h1 className="font-semibold font-sf text-[34px] md:text-[24px] lg:text-[33px] xl:text-[41px] 2xl:text-[46px] desktop:text-[55px] ultra:text-[82px]">
          Set Up your profile
        </h1>
        <p className="font-medium font-secondary opacity-90 text-[18px] md:text-[12px] lg:text-[16px] xl:text-[21px] 2xl:text-[23px] desktop:text-[28px] ultra:text-[42px]">
          Company Description
        </p>

        <div className="flex flex-col pt-8 md:pt-6 lg:pt-8 xl:pt-9 2xl:pt-11 desktop:pt-12 ultra:pt-20 w-full sm:w-1/2 md:w-full">
          <p
            className="font-primary opacity-50 text-[14px] md:text-[9px] lg:text-[11px] xl:text-[14px] 2xl:text-[16px] desktop:text-[19px] ultra:text-[28px]
        pb-3 md:pb-1 lg:pb-2 xl:pb-3 desktop:pb-4 ultra:pb-6 
        "
          >
            Brief description of the company activities
          </p>
          <textarea
            ref={descriptionRef}
            value={description}
            placeholder="e.g. Our company specializes in providing innovative solutions for sustainable energy production. Through our advanced technologies and expertise, we aim to revolutionize the renewable energy sector by developing efficient solar panels and wind turbines. We e.g. software company offer consultancy services to help businesses and organizations implement eco-friendly practices and reduce their carbon footprint"
            className="bg-primary bg-opacity-5 placeholder:opacity-50
          text-[12px] md:text-[8px] lg:text-[10px] xl:text-[11px] 2xl:text-[14px] desktop:text-[16px] ultra:text-[23px]
          min-h-[220px] md:min-h-[140px] lg:min-h-[187px] xl:min-h-[234px] 2xl:min-h-[264px] desktop:min-h-[315px] ultra:min-h-[470px]
          p-2 md:p-1 lg:p-2 desktop:p-3 ultra:p-4
          rounded-md ultra:rounded-lg resize-none"
            id="text-desc"
            onChange={handleDescriptionChange}
          />
          <div
            className="w-full mt-8 md:mt-4 lg:mt-6 xl:mt-7 2xl:mt-8 desktop:mt-9 ultra:mt-16
          flex gap-4 2xl:gap-7 ultra:gap-9"
          >
            <button
              className="bg-primary text-white text-opacity-90 font-sf
        text-[14px] md:text-[8px] lg:text-[10px] xl:text-[13px] 2xl:text-[15px] desktop:text-[17px] ultra:text-[26px]
        py-3 md:py-[6px] lg:py-2 xl:py-[10px] 2xl:py-3 ultra:py-5
        rounded-md md:rounded-[4px] lg:rounded-md desktop:rounded-lg ultra:rounded-xl
        min-w-[100px] md:min-w-[28%]"
              onClick={handlePrevSte}
            >
              Previous step
            </button>

            <button
              className="bg-primary text-white text-opacity-90 font-sf
        text-[14px] md:text-[8px] lg:text-[10px] xl:text-[13px] 2xl:text-[15px] desktop:text-[17px] ultra:text-[26px]
        py-3 md:py-[6px] lg:py-2 xl:py-[10px] 2xl:py-3 ultra:py-5
        rounded-md md:rounded-[4px] lg:rounded-md desktop:rounded-lg ultra:rounded-xl
        min-w-[100px] md:min-w-[28%]"
              onClick={handleNextStep}
            >
              Select Plan
            </button>
          </div>
        </div>
      </div>
      <Image
        src="/images/set-up/stats2.png"
        alt="stats"
        width={781}
        height={861}
        className="hidden md:block w-[42%] h-auto aspect-[781/861]"
        quality={100}
      />
    </div>
  );
};

export default SetUpDescription;
