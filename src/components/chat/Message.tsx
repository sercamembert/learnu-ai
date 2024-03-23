import { cn } from "@/lib/utils";
import { ExtendedMessage } from "@/types/message";
import ReactMarkdown from "react-markdown";
import { forwardRef } from "react";
import Image from "next/image";

interface MessageProps {
  message: ExtendedMessage;
  isNextMessageSamePerson: boolean;
}

const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, isNextMessageSamePerson }, ref) => {
    return (
      <div ref={ref} className={cn("flex")}>
        <Image
          src={
            message.isUserMessage ? "/icons/userIcon.svg" : "/icons/botIcon.svg"
          }
          alt="Message Icon"
          width={74}
          height={74}
          className="aspect-square w-[35px] lg:w-[30px] xl:w-[37px] 2xl:w-[42px] desktop:w-[50px] ultra:w-[75px] h-[35px] lg:h-[30px] xl:h-[37px] 2xl:h-[42px] desktop:h-[50px] ultra:h-[75px] "
        />

        <div
          className={cn(
            "flex flex-col mx-2 2xl:max-w-[66%] text-base ultra:text-[25px]",
            {
              "order-1 items-end": message.isUserMessage,
              "order-2 items-start": !message.isUserMessage,
            }
          )}
        >
          <div
            className={cn("px-4 rounded-lg inline-block text-primary", {
              "rounded-br-none":
                !isNextMessageSamePerson && message.isUserMessage,
              "rounded-bl-none":
                !isNextMessageSamePerson && !message.isUserMessage,
            })}
          >
            <p className="leading-tight font-semibold font-primary">
              {message.isUserMessage ? "You" : "LearnU AI"}
            </p>
            {typeof message.text === "string" ? (
              <ReactMarkdown className="prose text-primary">
                {message.text}
              </ReactMarkdown>
            ) : (
              message.text
            )}
          </div>
        </div>
      </div>
    );
  }
);

Message.displayName = "Message";

export default Message;
