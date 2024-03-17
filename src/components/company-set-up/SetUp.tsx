"use client";
import React, { useCallback, useContext } from "react";
import SetUpDescription from "./StepDescription";
import SetUpStepper from "./SetUpStepper";
import SetUpContext from "./SetUpContext";
import StepCompanyName from "./StepCompanyName";
import SetUpPricing from "./SetUpPricing";
import useEmblaCarousel from "embla-carousel-react";
import { Mutation } from "@tanstack/react-query";
import { UseTRPCMutationResult } from "@trpc/react-query/shared";

const SetUp = () => {
  const { activeStep, setActiveStep } = useContext(SetUpContext);
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: false });

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <StepCompanyName onNextButtonClick={onNextButtonClick} />
          </div>
          <div className="embla__slide">
            <SetUpDescription
              onPrevButtonClick={onPrevButtonClick}
              onNextButtonClick={onNextButtonClick}
            />
          </div>
          <div className="embla__slide">
            <SetUpPricing />
          </div>
        </div>
      </div>
      <SetUpStepper activeStep={activeStep} />
    </>
  );
};

export default SetUp;
