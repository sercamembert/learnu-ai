import React, { forwardRef } from "react";
import Image from "next/image";
import chatIcon from "../../../public/icons/chat.svg";
import { redirect } from "next/navigation";
import Link from "next/link";
interface Props {
  title: string | null;
  id: string;
}

const LastChat = forwardRef<HTMLDivElement, Props>(({ title, id }, ref) => {
  const titleClass = title && title.length > 25 ? "long-title" : "";
  if (title) {
    if (title.length >= 25) {
      title = `${title.substring(0, 25)}`;
    }
  }
  return (
    <div className="" ref={ref}>
      <Link
        href={`/dashboard/${id}`}
        className="flex gap-5 lg:gap-2 xl:gap-3 2xl:gap-[14px] desktop:gap-[15px] ultra:gap-5 items-center "
      >
        <Image
          src={chatIcon}
          alt="Chat"
          className="w-[30px] lg:w-[13px] xl:w-[17px] 2xl:w-[19px] desktop:w-[23px] ultra:w-[35px]"
        />
        <p
          className={`first-letter:uppercase text-[18px] lg:text-[9px] xl:text-[11px] 2xl:text-[12px] desktop:text-[14px] ultra:text-[21px] font-medium leading-none ${titleClass}`}
        >
          {title}
        </p>
      </Link>
    </div>
  );
});

LastChat.displayName = "LastChat";

export default LastChat;
