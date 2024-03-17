"use client";
import { trpc } from "@/app/_trpc/client";
import router from "next/router";
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
  createUser: () => void;
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
  createUser: () => {},
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

  const mutation = trpc.authCallback.useMutation();

  const createUser = () =>
    mutation.mutate({
      companyName: name,
      companyDescription: description,
      companyIndustry: industry,
    });

  if (mutation.error?.data?.code === "UNAUTHORIZED") {
    router.push("/sign-in");
  }

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
        createUser,
      }}
    >
      {children}
    </SetUpContext.Provider>
  );
};

export default SetUpContext;
