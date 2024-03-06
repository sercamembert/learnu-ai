import { TRPCError } from "@trpc/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/db";
import { z } from "zod";
import { pc } from "@/lib/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "@langchain/pinecone";

export const appRouter = router({
  authCallback: publicProcedure
    .input(z.object({ companyDescription: z.string() }))
    .mutation(async (opts) => {
      const { companyDescription } = opts.input;

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

        await PineconeStore.fromTexts([companyDescription], {}, embeddings, {
          pineconeIndex,
          namespace: user.id,
        });

        await db.user.create({
          data: {
            id: user.id,
            email: user.email,
            companyDescription: companyDescription,
          },
        });
      }

      return { succes: true };
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
});

export type AppRouter = typeof appRouter;
