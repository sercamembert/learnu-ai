"use client";
import React from "react";
import { useToast } from "./ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import { getUserSubscriptionPlan } from "@/lib/stripe";

interface BillingFormProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
  userId: string | undefined;
}

const BillingForm = ({ subscriptionPlan, userId }: BillingFormProps) => {
  const { toast } = useToast();

  const { mutate: createStripeSession } = trpc.createStripeSession.useMutation({
    onSuccess: ({ url }) => {
      if (url) window.location.href = url;
      if (!url) {
        toast({
          title: "There was a problem...",
          description: "Please try again in a moment",
          variant: "destructive",
        });
      }
    },
  });
  return (
    <div>
      <p>{subscriptionPlan?.name}</p>
      <p>{subscriptionPlan?.isCanceled && "Canceled"}</p>
      <div
        onClick={() => {
          createStripeSession({ planName: "" });
        }}
      >
        Manage subscription
      </div>
    </div>
  );
};

export default BillingForm;
