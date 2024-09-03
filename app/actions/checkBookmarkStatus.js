"use server";
import User from "@/models/User";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";

export const checkBookmarkStatus = async (propertyId) => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("Login first to check bookmark");
  }
  const user = await User.findById(sessionUser.userId);
  const isBookmarked = user.bookmarks.includes(propertyId);
  return isBookmarked;
};
