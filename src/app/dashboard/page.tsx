import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import Image from "next/image";
import DashboardLink from "@/components/DashboardLink";
import DashboardPanel from "@/components/DashboardPanel";
import ChatWrapper from "@/components/chat/ChatWrapper";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect("/auth-callback");

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect("/auth-callback");

  const lastUserChat = await db.chat.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 1,
  });

  return (
    <div>
      <div
        className="fixed w-screen h-fullbg-white padding flex flex-col lg:hidden z-50 px-[40px] md:items-center
      pt-[37px]
      "
      >
        <DashboardPanel
          companyName={dbUser.companyName}
          username={user.given_name + " " + user.family_name}
          lastChatId={lastUserChat[0].id}
        />
      </div>
      <div className="invisible lg:visible">
        <ChatWrapper
          chatId={""}
          companyName={dbUser.companyName}
          username={user.given_name + " " + user.family_name}
        />
      </div>
    </div>
  );
};

export default Page;
