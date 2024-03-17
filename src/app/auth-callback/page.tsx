"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useContext, useState } from "react";
import { trpc } from "../_trpc/client";
import SetUpNavbar from "@/components/company-set-up/SetUpNavbar";
import Image from "next/image";
import StepCompanyName from "@/components/company-set-up/StepCompanyName";
import SetUpStepper from "@/components/company-set-up/SetUpStepper";
import SetUpDescription from "@/components/company-set-up/StepDescription";
import SetUpContext, {
  SetUpContextProvider,
} from "@/components/company-set-up/SetUpContext";
import SetUp from "@/components/company-set-up/SetUp";

const PageContent = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const mutation = trpc.authCallback.useMutation();

  if (mutation.error?.data?.code === "UNAUTHORIZED") {
    router.push("/sign-in");
  }

  if (mutation.isSuccess) {
    const { succes } = mutation.data;
    router.push(origin ? `/${origin}` : "/dashboard");
  }

  return (
    <>
      <SetUpNavbar />
      <SetUpContextProvider>
        <SetUp />
      </SetUpContextProvider>
    </>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
