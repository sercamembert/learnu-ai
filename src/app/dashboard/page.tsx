import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import Image from "next/image";
import DashboardLink from "@/components/DashboardLink";

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
      <div
        className="fixed w-screen md:max-w-[375px] h-full bg-white padding flex flex-col lg:hidden z-50 px-[40px] md:shadow-md
      pt-[37px]
      "
      >
        <div className="flex gap-[24px] items-center">
          <Image
            src={"/icons/companyIcon.svg"}
            alt="Copmany"
            width={80}
            height={80}
          />
          <div className="flex flex-col ">
            <p className="font-semibold text-[22px]">{dbUser.companyName}</p>
            <p className="text-[20px]">
              {user.given_name + " " + user.family_name}
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-[57px] gap-[80px]">
          <DashboardLink
            imageUrl="/icons/text.svg"
            text="ChatGPT"
            width={25}
            height={25}
          />
          <DashboardLink
            imageUrl="/icons/data.svg"
            text="Your data"
            width={31}
            height={19}
          />

          <DashboardLink
            imageUrl="/icons/notes.svg"
            text="Notes"
            width={23}
            height={23}
          />
          <DashboardLink
            imageUrl="/icons/integrations.svg"
            text="Integrations"
            width={23}
            height={23}
          />
          <DashboardLink
            imageUrl="/icons/settings.svg"
            text="Settings"
            width={23}
            height={23}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
