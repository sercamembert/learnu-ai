import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import SetUpNavbar from "@/components/company-set-up/SetUpNavbar";
import { SetUpContextProvider } from "@/components/company-set-up/SetUpContext";
import SetUp from "@/components/company-set-up/SetUp";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/db";

const PageContent = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // check if user is in database
  const dbUser = await db.user.findFirst({
    where: {
      id: user?.id,
    },
  });

  // if (dbUser) {
  //   redirect("/dashboard");
  // }

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
