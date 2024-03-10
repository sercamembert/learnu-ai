"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import { trpc } from "../_trpc/client";

const PageContent = () => {
  const [companyDescription, setCompanyDescription] = useState<string>("");
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

  const handlCreateUser = () => {
    mutation.mutate({ companyDescription });
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setCompanyDescription(e.target.value)}
      />
      <button onClick={handlCreateUser}>Create user</button>
      {mutation.isPending ?? <div>Pending...</div>}
    </div>
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
