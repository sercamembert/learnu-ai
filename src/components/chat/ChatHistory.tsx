import { trpc } from "@/app/_trpc/client";
import { useIntersection } from "@mantine/hooks";
import React, { useEffect, useRef } from "react";
import LastChat from "./LastChat";
import { Loader2 } from "lucide-react";

interface Props {
  chatId: string;
}

const ChatHistory = ({ chatId }: Props) => {
  const { data, isLoading, fetchNextPage, isFetching } =
    trpc.infiniteChats.useInfiniteQuery(
      {
        limit: 3,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const chats = data?.pages.flatMap((page) => page.chats);

  const lastChatRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: lastChatRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);
  return (
    <div
      className="lg:max-h-[80%] mt-[46px] lg:mt-[22px] xl:mt-[27px] 2xl:mt-[31px] desktop:mt-[37px] ultra:mt-[55px] pb-[30px] 
    overflow-y-auto lg:overflow-y-hidden lg:hover:overflow-y-scroll duration-300 my-custom-scrollbar 
    flex flex-col gap-11 lg:gap-5 xl:gap-7 2xl:gap-[30px] desktop:gap-9 ultra:gap-[53px] overflow-x-hidden min-w-full"
    >
      {chats?.map((chat, i) => {
        if (i === chats.length - 1) {
          return (
            <LastChat
              id={chat.id}
              key={chat.id}
              title={chat.title}
              isActive={chatId === chat.id && true}
            />
          );
        } else
          return (
            <LastChat
              id={chat.id}
              key={chat.id}
              ref={ref}
              title={chat.title}
              isActive={chatId === chat.id && true}
            />
          );
      })}
      {isLoading ||
        (isFetching && (
          <span className="flex h-full items-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </span>
        ))}
    </div>
  );
};

export default ChatHistory;
