"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { trpc } from "../_trpc/client";

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data, error, isSuccess, isLoading } =
    trpc.authCallback.useQuery(undefined);

  if (error?.data?.code === "UNAUTHORIZED") {
    router.push("/sign-in");
  }

  if (isSuccess) {
    const { succes } = data;
    router.push(origin ? `/${origin}` : "/dashboard");
  }

  return <div>Setting up</div>;
};

export default Page;
