"use server";
import Property from "@/models/Property";
import connectDB from "@/config/database";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/utils/getSessionUser";

export async function editProperty(propertyId, formData) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserId is required");
  }
  const property = await Property.findById(propertyId);

  if (property == null || property._id.toString() !== propertyId) {
    throw new Error("Sorry! Property not found or you are not the owner");
  }
  let extractProperty = {
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities: formData.getAll("amenities"),
    rates: {
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
      nightly: formData.get("rates.nightly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };
  await Property.findByIdAndUpdate(propertyId, extractProperty, {
    runValidators: true,
  });
  revalidatePath('/', 'layout');
  redirect(`/properties/${propertyId}`);
}
