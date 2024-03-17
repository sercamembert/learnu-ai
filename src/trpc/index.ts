import { TRPCError } from "@trpc/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/db";
import { z } from "zod";
import { pc } from "@/lib/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
import { absoluteUrl } from "@/lib/utils";
import { getUserSubscriptionPlan, stripe } from "@/lib/stripe";
import { PLANS } from "@/config/stripe";

export const appRouter = router({
  authCallback: publicProcedure
    .input(
      z.object({
        companyName: z.string(),
        companyIndustry: z.string(),
        companyDescription: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { companyName, companyIndustry, companyDescription } = opts.input;

      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user?.id || !user?.email) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      // check if user is in database
      const dbUser = await db.user.findFirst({
        where: {
          id: user.id,
        },
      });

      if (!dbUser) {
        const pineconeIndex = pc.Index("company");

        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        });

        await PineconeStore.fromTexts(
          [`Company ${companyName} description: ` + companyDescription],
          {},
          embeddings,
          {
            pineconeIndex,
            namespace: user.id,
          }
        );

        await db.user.create({
          data: {
            id: user.id,
            email: user.email,
            companyName,
            companyIndustry,
            companyDescription,
          },
        });
      }

      return { succes: true };
    }),

  createStripeSession: privateProcedure
    .input(z.object({ planName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { planName } = input;

      const billingUrl = absoluteUrl("/dashboard/billing");

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const dbUser = await db.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!dbUser) throw new TRPCError({ code: "UNAUTHORIZED" });

      const subscriptionPlan = await getUserSubscriptionPlan();

      if (subscriptionPlan.isSubscribed && dbUser.stripeCustomerId) {
        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: dbUser.stripeCustomerId,
          return_url: billingUrl,
        });

        return { url: stripeSession.url };
      }

      const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
        payment_method_types: ["card", "paypal"],
        mode: "subscription",
        billing_address_collection: "auto",
        line_items: [
          {
            price: PLANS.find((plan) => plan.name === `${planName}`)?.price
              .priceIds.test,
            quantity: 1,
          },
        ],
        metadata: {
          userId: userId,
        },
      });

      return { url: stripeSession.url };
    }),

  createNewChat: privateProcedure.mutation(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id || !user?.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const createdChat = await db.chat.create({
      data: {
        userId: user.id,
      },
    });

    return { createdChatId: createdChat.id };
  }),

  getFile: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const file = await db.file.findFirst({
        where: {
          key: input.key,
          userId,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      return file;
    }),

  getChatMessages: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        chatId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { chatId, cursor } = input;
      const limit = input.limit ?? INFINITE_QUERY_LIMIT;

      const chat = await db.chat.findFirst({
        where: {
          id: chatId,
          userId,
        },
      });

      if (!chat) throw new TRPCError({ code: "NOT_FOUND" });

      const messages = await db.message.findMany({
        take: limit + 1,
        where: {
          chatId,
        },
        orderBy: {
          createdAt: "desc",
        },
        cursor: cursor ? { id: cursor } : undefined,
        select: {
          id: true,
          isUserMessage: true,
          createdAt: true,
          text: true,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (messages.length > limit) {
        const nextItem = messages.pop();
        nextCursor = nextItem?.id;
      }

      return {
        messages,
        nextCursor,
      };
    }),
});

export type AppRouter = typeof appRouter;
