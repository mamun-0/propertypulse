"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
async function addMessage(previousState, formData) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserId is required");
  }
  const recipient = formData.get("recipient");
  if (sessionUser.userId === recipient) {
    return { err: "You can't send a message to yourself" };
  }
  const newMessage = new Message({
    sender: sessionUser.userId,
    recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });
  await newMessage.save();
  return { submitted: true };
}
export default addMessage;
