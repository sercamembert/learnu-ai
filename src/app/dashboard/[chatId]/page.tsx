import ChatWrapper from "@/components/chat/ChatWrapper";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    chatId: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { chatId } = params;

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${chatId}`);

  const chat = await db.chat.findFirst({
    where: {
      id: chatId,
      userId: user.id,
    },
  });
  if (!chat) notFound();

  const userResult = await db.user.findFirst({
    where: {
      id: user.id,
    },
    select: {
      companyName: true,
    },
  });

  const companyName = userResult ? userResult.companyName : "";

  return (
    <ChatWrapper
      chatId={chatId}
      companyName={companyName || "Company"}
      username={user.given_name + " " + user.family_name}
    />
  );
};

export default page;
