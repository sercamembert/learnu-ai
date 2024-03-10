"use client";
import React from "react";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
const CreateNewChat = () => {
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
    <Button variant={"outline"} onClick={handlCreateChat}>
      Create New Chat
    </Button>
  );
};

export default CreateNewChat;
