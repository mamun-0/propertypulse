"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

async function unreadMessage() {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const totalUnreadMessages = await Message.countDocuments({
    recipient: sessionUser.userId,
    read: false,
  });
  return {
    totalUnreadMessages,
  };
}

export default unreadMessage;
