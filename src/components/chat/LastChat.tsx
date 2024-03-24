import React, { forwardRef } from "react";
import Image from "next/image";
import chatIcon from "../../../public/icons/chat.svg";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import binIcon from "../../../public/icons/bin.svg";
import { trpc } from "@/app/_trpc/client";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  title: string | null;
  id: string;
  isActive: boolean;
}

const LastChat = forwardRef<HTMLDivElement, Props>(
  ({ title, id, isActive }, ref) => {
    const titleClass =
      title && title.length > 21
        ? `${isActive ? "long-title-active" : "long-title "} `
        : "";
    if (title) {
      if (title.length >= 21) {
        title = `${title.substring(0, 21)}`;
      }
    }
    const { toast } = useToast();
    const router = useRouter();
    const { mutate: deleteChat } = trpc.deleteChat.useMutation({
      onSuccess: () => {
        if (isActive) {
          router.push(`/dashboard?activeWindow=dashboard`);
        }
      },
      onError(error, variables, context) {
        toast({
          title: "There was an error when deleting the chat",
          description: "Please try again in a moment",
          variant: "destructive",
        });
      },
    });

    return (
      <div
        ref={ref}
        className="relative mr-2 link-container min-w-[268px] lg:min-w-[134px] desktop:min-w-[230.5px]"
      >
        <Link
          href={`/dashboard/${id}/?activeWindow=dashboard`}
          className={`flex gap-5 lg:gap-2 xl:gap-3 2xl:gap-[14px] desktop:gap-[15px] ultra:gap-5 items-center 
          ${titleClass}
          p-[12px] lg:p-2 rounded-lg ${
            isActive && "bg-input"
          } lg:hover:bg-input duration-300
          `}
        >
          <Image
            src={chatIcon}
            alt="Chat"
            className="w-[30px] lg:w-[13px] xl:w-[17px] 2xl:w-[19px] desktop:w-[23px] ultra:w-[35px]"
          />
          <p
            className={cn(
              `first-letter:uppercase text-[18px] lg:text-[9px] xl:text-[11px] 2xl:text-[12px] desktop:text-[14px] ultra:text-[21px] leading-none `,
              { "font-bold": isActive, "font-medium": !isActive }
            )}
          >
            {title}
          </p>
        </Link>
        <Image
          src={binIcon}
          alt="Delete chat"
          onClick={() => {
            deleteChat({ chatId: id });
          }}
          className={cn(
            `cursor-pointer absolute right-3 bottom-1/2 translate-y-1/2 bg-input w-[20px] pl-[5px] lg:w-[15px] lg:pl-[5px] xl:w-[18px] desktop:w-[20px]`,
            {
              "bin-icon": !isActive,
            }
          )}
        />
      </div>
    );
  }
);

LastChat.displayName = "LastChat";

export default LastChat;
