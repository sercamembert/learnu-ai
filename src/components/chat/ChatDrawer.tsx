import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";

import Link from "next/link";

import ChatHistory from "./ChatHistory";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";

const variants = {
  open: { x: 0 },
  closed: { x: -400 },
};

const ChatDrawer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
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
    setIsOpen(false);
    mutation.mutate();
  };

  return (
    <>
      <motion.div
        className="fixed w-screen md:max-w-[375px] h-full bg-white padding flex flex-col lg:hidden z-50 px-[40px] md:shadow-md"
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.5 }}
        variants={variants}
        initial={{ x: 800 }}
      >
        <div className="mt-[50px] bg-white w-full flex justify-between items-center">
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="pt-[2px]"
          >
            <Image src="/icons/arrow.svg" alt="drawer" width={14} height={12} />
          </Link>

          <Image
            src="/icons/logo.png"
            alt="LearnU AI"
            width={121}
            height={18}
          />
          <Image
            src="/icons/close.svg"
            alt="Close drawer"
            width={14}
            height={12}
            onClick={() => setIsOpen(false)}
          />
        </div>
        <button
          className="w-full max-w-[277px] bg-primary text-white mt-[35px] rounded-[15px]
        py-[15px] text-[18px] font-semibold
        "
          onClick={handlCreateChat}
        >
          New Chat
        </button>
        <ChatHistory />
      </motion.div>
      <div
        className="fixed top-0 left-0 lg:hidden h-[75px] bg-white
          px-5 md:px-9 w-full flex justify-between items-center"
      >
        <Image
          src="/icons/drawer.svg"
          alt="drawer"
          width={18}
          height={8.5}
          onClick={() => setIsOpen(true)}
        />
        <Image src="/icons/logo.png" alt="LearnU AI" width={121} height={18} />
        <Image
          src="/icons/create.svg"
          alt="Create new chat"
          width={16}
          height={16}
        />
      </div>
    </>
  );
};

export default ChatDrawer;
