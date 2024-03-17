import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import UploadButton from "@/components/UploadButton";
import CreateNewChat from "@/components/chat/CreateNewChat";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect("/auth-callback?origin=dashboard");

  return (
    <div>
      <div className="flex gap-3 pt-5">
        <UploadButton type="pdfUploader" />
        <UploadButton type="videoUploader" />
        <CreateNewChat />
      </div>
    </div>
  );
};

export default Page;
