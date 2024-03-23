"use client";
import { trpc } from "@/app/_trpc/client";
import { Loader2, MessageSquare } from "lucide-react";
import Message from "./Message";
import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "./ChatContext";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
import { useIntersection } from "@mantine/hooks";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import newChatImg from "../../../public/icons/newChat.svg";

interface MessagesProps {
  chatId: string;
}

const Messages = ({ chatId }: MessagesProps) => {
  const { isLoading: isAiThinking } = useContext(ChatContext);

  const { data, isLoading, fetchNextPage } =
    trpc.getChatMessages.useInfiniteQuery(
      {
        chatId,
        limit: INFINITE_QUERY_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        // keepPreviousData: true,
      }
    );

  const messages = data?.pages.flatMap((page) => page.messages);

  const loadingMessage = {
    createdAt: new Date().toISOString(),
    id: "loading-message",
    isUserMessage: false,
    text: (
      <span className="flex h-full items-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </span>
    ),
  };

  const combinedMessages = [
    ...(isAiThinking ? [loadingMessage] : []),
    ...(messages ?? []),
  ];

  const lastMessageRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: lastMessageRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return (
    <div
      className="flex max-h-screen flex-1 flex-col-reverse px-5 md:px-9 lg:px-0 overflow-y-auto
      pb-[85px] lg:pb-[100px] xl:pb-[130px] 2xl:pb-[140px] desktop:pb-[160px]
      pt-[82px] lg:pt-[62px] xl:pt-[78px] 2xl:pt-[88px] desktop:pt-[105px] ultra:pt-[156px]
    gap-[29px] md:gap-[22px] lg:gap-[28px] xl:gap-[36px] 2xl:gap-[40px] desktop:gap-[48px] ultra:gap-[71px]
    "
    >
      {combinedMessages && combinedMessages.length > 0 ? (
        combinedMessages.map((message, i) => {
          const isNextMessageSamePerson =
            combinedMessages[i - 1]?.isUserMessage ===
            combinedMessages[i]?.isUserMessage;

          if (i === combinedMessages.length - 1) {
            return (
              <Message
                ref={ref}
                message={message}
                isNextMessageSamePerson={isNextMessageSamePerson}
                key={message.id}
              />
            );
          } else
            return (
              <Message
                message={message}
                isNextMessageSamePerson={isNextMessageSamePerson}
                key={message.id}
              />
            );
        })
      ) : isLoading ? (
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      ) : (
        <div className="flex-1 flex  ">
          <Image
            src={newChatImg}
            alt="LearnU premium"
            className="w-full md:w-1/2 lg:w-full lg:max-w-[300px] xl:max-w-[370px] 2xl:max-w-[410px] desktop:max-w-[490px] ultra:max-w-[745px] mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default Messages;
