"use client";
import React from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useContext, useRef } from "react";
import { ChatContext } from "./ChatContext";
import Image from "next/image";
import SendIcon from "../../../public/icons/send.svg";
import UploadIcon from "../../../public/icons/upload.svg";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

interface Props {
  chatId: string;
}

const ChatInput = ({ chatId }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addMessage, handleInputChange, isLoading, message } =
    useContext(ChatContext);

  const router = useRouter();
  const mutation = trpc.createNewChat.useMutation();

  if (mutation.error?.data?.code === "UNAUTHORIZED") {
    router.push("/sign-in");
  }

  if (mutation.isSuccess) {
    const { createdChatId } = mutation.data;
    router.push(`/dashboard/${createdChatId}?activeWindow=dashboard`);
  }

  const handlCreateChat = () => {
    if (chatId === "") {
      mutation.mutate();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div
        className="mx-5 md:mx-9 flex flex-row gap-3 lg:mx-auto bg-white
      pb-[10px] md:pb-[15px] lg:pb-[28px] xl:pb-[35px] 2xl:pb-[40px] desktop:pb-[47px] ultra:pb-[71px]
      "
      >
        <div className="relative flex flex-row w-full flex-grow lg:gap-4 xl:gap-5 2xl:gap-6 desktop:gap-7 ultra:gap-11">
          <div className="relative w-full lg:w-[77%]">
            <Textarea
              rows={1}
              ref={textareaRef}
              maxRows={4}
              autoFocus={chatId !== "" ? true : false}
              onClick={handlCreateChat}
              onChange={handleInputChange}
              value={message}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  addMessage();
                  textareaRef.current?.focus();
                }
              }}
              placeholder="Type message"
              className="resize-none bg-input
              min-h-[42px] xl:min-h-[51px] 2xl:min-h-[57px] desktop:min-h-[68px] ultra:min-h-[101px]
              rounded-xl 2xl:rounded-[15px] desktop:rounded-[18px] ultra:rounded-[26px]
              text-[12px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] desktop:text-[16px] ultra:text-[25px]
              py-[14px] lg:py-[13px] xl:py-[16px] 2xl:py-[18px] desktop:py-[21px] ultra:py-[32px]
              pl-[13px] xl:pl-[16px] 2xl:pl-[18px] desktop:pl-[21px] ultra:pl-[31px]
              pr-[66px] lg:pr-[30px] xl:pr-[35px] 2xl:pr-[40px] desktop:pr-[54px] ultra:pr-[75px]
              placeholder:text-primary placeholder:opacity-80
              focus:outline-none
              "
            />

            <button
              disabled={isLoading}
              className="absolute bottom-[13px] right-[42px] bg-input lg:hidden "
              aria-label="send message"
              onClick={() => {
                if (chatId === "") {
                  mutation.mutate();
                } else {
                  addMessage();
                }

                textareaRef.current?.focus();
              }}
            >
              <Image
                src={UploadIcon}
                alt="Upload"
                className="w-[16px] h-[16px]"
              />
            </button>

            <button
              disabled={isLoading}
              className="absolute bottom-[15px] lg:bottom-[13px] xl:bottom-[17px] 2xl:bottom-[19px] desktop:bottom-[22px] ultra:bottom-[33px]
              right-[13px] xl:right-[16px] 2xl:right-[18px] desktop:right-[21px] ultra:right-[31px] bg-input"
              aria-label="send message"
              onClick={() => {
                if (chatId === "") {
                  mutation.mutate();
                } else {
                  addMessage();
                }

                textareaRef.current?.focus();
              }}
            >
              <Image
                src={SendIcon}
                alt="Send"
                className="w-[12px] xl:w-[14px] 2xl:w-[16px] desktop:w-[19px] ultra:w-[28px]"
              />
            </button>
          </div>
          <div
            className="lg:flex flex-row items-center bg-input hidden
            gap-2 xl:gap-[10px] 2xl:gap-[11px] desktop:gap-[13px] ultra:gap-[20px]
            px-[11px] xl:px-[14px] 2xl:px-[16px] desktop:px-[19px] ultra:px-[28px]
           min-h-[42px] xl:min-h-[51px] 2xl:min-h-[57px] desktop:min-h-[68px] ultra:min-h-[101px]
           rounded-xl 2xl:rounded-[15px] desktop:rounded-[18px] ultra:rounded-[26px]
           text-[12px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] desktop:text-[16px] ultra:text-[25px]
           hover:brightness-90 duration-300 cursor-pointer
          "
          >
            <Image
              src={UploadIcon}
              alt="Upload file"
              className="w-[17px] xl:w-[21px] 2xl:w-[24px] desktop:w-[29px] ultra:w-[42px]"
            />
            <p className="text-primary opacity-80">Upload a new file</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
