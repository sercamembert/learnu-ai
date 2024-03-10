import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "@langchain/pinecone";
import { pc } from "@/lib/pinecone";
import OpenAI, { toFile } from "openai";
import fs from "fs";
import { writeFile } from "fs/promises";
import path from "path";

const f = createUploadthing();

const onPdfUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: {
    key: string;
    name: string;
    url: string;
  };
}) => {
  const isFileExist = await db.file.findFirst({
    where: {
      key: file.key,
    },
  });

  if (isFileExist) return;

  const createdFile = await db.file.create({
    data: {
      key: file.key,
      name: file.name,
      userId: metadata.userId,
      url: file.url,
      uploadStatus: "PROCESSING",
    },
  });

  try {
    const response = await fetch(file.url);

    const blob = await response.blob();

    const loader = new PDFLoader(blob);

    const pageLevelDocs = await loader.load();

    const pineconeIndex = pc.Index("company");

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
      pineconeIndex,
      namespace: metadata.userId,
    });

    await db.file.update({
      data: {
        uploadStatus: "SUCCESS",
      },
      where: {
        id: createdFile.id,
      },
    });
  } catch (error) {
    await db.file.update({
      data: {
        uploadStatus: "FAILED",
      },
      where: {
        id: createdFile.id,
      },
    });
  }
};

const openai = new OpenAI({
  organization: "org-mBG9JMy8iG34PUw6jvnL0BFY",
  apiKey: process.env.OPENAI_API_KEY,
});

const onVideoUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: {
    key: string;
    name: string;
    url: string;
  };
}) => {
  const isFileExist = await db.file.findFirst({
    where: {
      key: file.key,
    },
  });

  if (isFileExist) return;

  const createdFile = await db.file.create({
    data: {
      key: file.key,
      name: file.name,
      userId: metadata.userId,
      url: file.url,
      uploadStatus: "PROCESSING",
    },
  });

  const response = await fetch(file.url);
  if (!response.ok)
    throw new Error(`Failed to fetch video: ${response.statusText}`);
  const arrayBuffer = await response.arrayBuffer();
  const videoBuffer = Buffer.from(arrayBuffer);
  // const tempVideoPath = path.join(__dirname, "tempVideo.mp4");
  // await fs.promises.writeFile(tempVideoPath, videoBuffer);

  const transcription = await openai.audio.transcriptions.create({
    file: await toFile(videoBuffer, file.name, { type: "audio/mp4" }),
    model: "whisper-1",
  });

  console.log(transcription.text);

  const pineconeIndex = pc.Index("company");

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const text = `tresc pliku o nazwie: ${file.name}` + transcription.text;

  await PineconeStore.fromTexts([transcription.text], {}, embeddings, {
    pineconeIndex,
    namespace: metadata.userId,
  });

  try {
    await db.file.update({
      data: {
        uploadStatus: "SUCCESS",
      },
      where: {
        id: createdFile.id,
      },
    });
  } catch (error) {
    await db.file.update({
      data: {
        uploadStatus: "FAILED",
      },
      where: {
        id: createdFile.id,
      },
    });
  }
};

const middleware = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) throw new Error("Unauthorized");

  return { userId: user.id };
};

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(middleware)
    .onUploadComplete(onPdfUploadComplete),

  videoUploader: f({ video: { maxFileSize: "32MB" } })
    .middleware(middleware)
    .onUploadComplete(onVideoUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
