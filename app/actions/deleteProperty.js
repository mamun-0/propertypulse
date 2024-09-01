"use server";
import Property from "@/models/Property";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudnary";
import { revalidatePath } from "next/cache";

export const deleteProperty = async (propertyId) => {
  const userSession = await getSessionUser();
  if (!userSession || !userSession.userId) {
    throw new Error("You must be logged in ");
  }
  await connectDB();
  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error("Property not found");
  }
  if (!property.owner.toString() === userSession.userId) {
    throw new Error("You are not authorized to delete this property");
  }
  for (let image of property.images) {
    const publicId = image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy("propertypulse/" + publicId);
  }
  await property.deleteOne();
  revalidatePath("/", "layout");
};
