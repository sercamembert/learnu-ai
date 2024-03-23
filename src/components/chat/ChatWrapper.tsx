"use client";
import React, { useState } from "react";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import { ChatContextProvider } from "./ChatContext";
import ChatDrawer from "./ChatDrawer";
import ChatHistory from "./ChatHistory";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
interface Props {
  chatId: string;
}

const ChatWrapper = ({ chatId }: Props) => {
  const router = useRouter();
  const mutation = trpc.createNewChat.useMutation();

  if (mutation.error?.data?.code === "UNAUTHORIZED") {
    router.push("/sign-in");
  }

  if (mutation.isSuccess) {
    const { createdChatId } = mutation.data;
    router.push(`/dashboard/${createdChatId}`);
  }

  const handlCreateChat = () => {
    mutation.mutate();
  };
  return (
    <ChatContextProvider chatId={chatId}>
      <div className="flex md:gap-[25px] lg:gap-[33px] xl:gap-[41px] 2xl:gap-[47px] desktop:gap-[56px] ultra:gap-[83px]">
        <div className="bg-white lg:min-w-[360px] xl:min-w-[450px] 2xl:min-w-[507px] desktop:min-w-[605px] ultra:min-w-[901px] hidden lg:flex ">
          <div className="w-1/2">w</div>
          <div
            className="w-1/2 rounded-r-[26px] lg:rounded-r-[34px] xl:rounded-r-[44px] 2xl:rounded-r-[49px] desktop:rounded-r-[58px] ultra:rounded-r-[87px]
            px-[19px] xl:px-6 2xl:px-7 desktop:px-8 ultra:px-12
            py-6 xl:py-[30px] 2xl:py-[34px] desktop:py-[40px] ultra:py-[60px]
            h-screen
            "
            style={{
              boxShadow: "20px 2.84444px 30px rgba(0, 0, 0, 0.05);",
            }}
          >
            <Image
              src={"/icons/logoVector.svg"}
              alt="LearnU"
              width={64}
              height={78}
              className="w-[25px] xl:w-[32px] 2xl:w-[36px] desktop:w-[43px] ultra:w-[64px] mx-auto"
            />
            <button
              onClick={handlCreateChat}
              className="w-full bg-primary text-white mt-[35px] 
              rounded-[7px] xl:rounded-[9px] 2xl:rounded-[10px] desktop:rounded-[12px] ultra:rounded-[18px] 
              py-[8px] xl:py-[9px] 2xl:py-[11px] desktop:py-[13px] ultra:py-[19px]
              text-[9px] xl:text-[11px] 2xl:text-[12px] desktop:text-[15px] ultra:text-[21px] font-semibold"
            >
              New Chat
            </button>
            <ChatHistory />
          </div>
        </div>

        <div className="mx-auto relative w-full h-screen bg-white flex-col justify-between gap-2">
          <ChatDrawer />
          <div className="flex-1 justify-between flex flex-col mb-28">
            <Messages chatId={chatId} />
          </div>

          <ChatInput />
        </div>
      </div>
    </ChatContextProvider>
  );
};

export default ChatWrapper;
