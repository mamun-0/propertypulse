"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteMessage(messageId, recipientId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    throw new Error("User ID is required");
  }
  const { userId } = sessionUser;
  if (userId !== recipientId) {
    return new Response("Unauthorized", { status: 401 });
  }
  revalidatePath("/messages", "page");
  await Message.findByIdAndDelete(messageId);
}
export default deleteMessage;
