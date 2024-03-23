import { db } from "@/db";
import { openai } from "@/lib/openai";
import { pc } from "@/lib/pinecone";
import { SendMessageValidator } from "@/lib/validators/SendMessageValidator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { NextRequest } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user === null) return new Response("Unauthorized", { status: 401 });

  const { id: userId } = user;

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { chatId, message } = SendMessageValidator.parse(body);

  const chat = await db.chat.findFirst({
    where: {
      id: chatId,
      userId,
    },
  });

  if (!chat) return new Response("Not found", { status: 404 });

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId,
      chatId,
    },
  });

  const firstMessage = await db.message.findFirst({
    where: { chatId },
    orderBy: { createdAt: "asc" },
  });

  if (firstMessage) {
    const title = firstMessage.text.split(" ").slice(0, 3).join(" ");
    await db.chat.update({ where: { id: chatId }, data: { title } });
  }

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const pineconeIndex = pc.Index("company");

  await PineconeStore.fromTexts([message], {}, embeddings, {
    pineconeIndex,
    namespace: user.id,
  });

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    namespace: user.id,
  });

  const results = await vectorStore.similaritySearch(message, 2);

  const prevMessages = await db.message.findMany({
    where: {
      chatId,
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 6,
  });

  const formattedPrevMessages = prevMessages.map((msg) => ({
    role: msg.isUserMessage ? ("user" as const) : ("assistant" as const),
    content: msg.text,
  }));

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    stream: true,
    max_tokens: 400,
    messages: [
      {
        role: "assistant",
        content:
          "Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.",
      },
      {
        role: "user",
        content: `
        
  \n----------------\n

  USER COMPANY NAME: ${dbUser?.companyName}

  USER COMPANY DESCRIPTION:
  ${dbUser?.companyDescription}
  
  PREVIOUS CONVERSATION:
  ${formattedPrevMessages.map((message) => {
    if (message.role === "user") return `User: ${message.content}\n`;
    return `Assistant: ${message.content}\n`;
  })}
  
  \n----------------\n
  
  CONTEXT:
  ${results.map((r) => r.pageContent).join("\n\n")}
  
  USER INPUT: ${message}`,
      },
    ],
  });

  const stream = OpenAIStream(response, {
    async onCompletion(completion) {
      await db.message.create({
        data: {
          text: completion,
          isUserMessage: false,
          chatId,
          userId,
        },
      });
    },
  });

  return new StreamingTextResponse(stream);
};
