import React from "react";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import { ChatContextProvider } from "./ChatContext";

interface Props {
  chatId: string;
}

const ChatWrapper = ({ chatId }: Props) => {
  return (
    <ChatContextProvider chatId={chatId}>
      <div className="mx-auto relative w-full md:w-[75%] h-[calc(100vh-3.5rem)] bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 justify-between flex flex-col mb-28">
          <Messages chatId={chatId} />
        </div>
        <ChatInput />
      </div>
    </ChatContextProvider>
  );
};

export default ChatWrapper;
