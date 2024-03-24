"use client";
import React from "react";
import Image from "next/image";
import DashboardLink from "./DashboardLink";
import { useSearchParams } from "next/navigation";

interface Props {
  companyName: string | null;
  username: string;
  lastChatId: string | null;
}

const DashboardPanel = ({ companyName, username, lastChatId }: Props) => {
  const searchParams = useSearchParams();
  const activeWindow = searchParams.get("activeWindow");
  return (
    <div>
      <div className="flex items-center gap-[24px] lg:gap-3 xl:gap-4 desktop:gap-5 ultra:gap-[30px]">
        <Image
          src={"/icons/companyIcon.svg"}
          alt="Company"
          width={100}
          height={100}
          className="w-[80px] lg:w-[40px] xl:w-[50px] 2xl:w-[56px] desktop:w-[66px] ultra:w-[100px]"
        />
        <div className="flex flex-col">
          <p className="font-semibold text-[22px] lg:text-[11px] xl:text-[14px] 2xl:text-[16px] desktop:text-[19px] ultra:text-[28px]">
            {companyName}
          </p>
          <p className="text-[20px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] desktop:text-[16px] ultra:text-[25px]">
            {username}
          </p>
        </div>
      </div>
      <div
        className="flex flex-col mt-[54px] lg:mt-[31px] xl:mt-[39px] 2xl:mt-[44px] desktop:mt-[52px] ultra:mt-[78px]
       gap-[80px] lg:gap-[40px] xl:gap-[50px] 2xl:gap-[56px] desktop:gap-[67px] ultra:gap-[100px]"
      >
        <DashboardLink
          imageUrl="/icons/text.svg"
          text="ChatGPT"
          href={
            lastChatId !== null
              ? `/dashboard/${lastChatId}?defaultOpen=true&activeWindow=dashboard`
              : "/dashboard?activeWindow=dashboard"
          }
          width={25}
          height={25}
          isActive={activeWindow === "dashboard" && true}
        />
        <DashboardLink
          imageUrl="/icons/data.svg"
          text="Your data"
          href="/data?activeWindow=data"
          width={31}
          height={19}
          isActive={activeWindow === "data" && true}
        />

        <DashboardLink
          imageUrl="/icons/notes.svg"
          text="Notes"
          href="/notes?activeWindow=notes"
          width={23}
          height={23}
          isActive={activeWindow === "notes" && true}
        />
        <DashboardLink
          imageUrl="/icons/integrations.svg"
          text="Integrations"
          href="/integrations?activeWindow=integrations"
          width={23}
          height={23}
          isActive={activeWindow === "integrations" && true}
        />
        <DashboardLink
          imageUrl="/icons/settings.svg"
          href="/settings?activeWindow=settings"
          text="Settings"
          width={23}
          height={23}
          isActive={activeWindow === "settings" && true}
        />
      </div>
    </div>
  );
};

export default DashboardPanel;
