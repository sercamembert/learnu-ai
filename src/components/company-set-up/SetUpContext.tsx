"use client";
import React, { ReactNode, createContext, useState } from "react";

type SetUpContextType = {
  activeStep: number;
  name: string;
  industry: string;
  description: string;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleIndustryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

export const SetUpContext = createContext<SetUpContextType>({
  activeStep: 1,
  name: "",
  industry: "",
  description: "",
  setActiveStep: () => {},
  handleNameChange: () => {},
  handleIndustryChange: () => {},
  handleDescriptionChange: () => {},
});

interface Props {
  children: ReactNode;
}

export const SetUpContextProvider = ({ children }: Props) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleIndustryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndustry(e.target.value);
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  return (
    <SetUpContext.Provider
      value={{
        activeStep,
        name,
        industry,
        description,
        setActiveStep,
        handleNameChange,
        handleIndustryChange,
        handleDescriptionChange,
      }}
    >
      {children}
    </SetUpContext.Provider>
  );
};

export default SetUpContext;
