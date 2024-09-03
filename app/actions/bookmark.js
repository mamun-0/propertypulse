"use server";
import User from "@/models/User";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

export const bookmark = async (propertyId) => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserId is required");
  }

  const user = await User.findById(sessionUser.userId);
  let isBookmarked = user.bookmarks.includes(propertyId);

  let message;

  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    isBookmarked = false;
    message = "Bookmark removed";
  } else {
    user.bookmarks.push(propertyId);
    isBookmarked = true;
    message = "Bookmark added";
  }
  await user.save();
  revalidatePath("/properties/saved", "page");
  return {
    message,
    isBookmarked,
  };
};
