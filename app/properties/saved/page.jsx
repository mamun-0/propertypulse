import User from "@/models/User";
import connectDB from "@/config/database";
import PropertyCard from "@/components/PropertyCard";
import { getSessionUser } from "@/utils/getSessionUser";
async function SavedPage() {
  await connectDB();
  const { userId } = await getSessionUser();
  if (!userId) {
    throw new Error("You must be logged in first");
  }
  const { bookmarks } = await User.findById(userId).populate("bookmarks");
  if (bookmarks.length === 0) {
    return <h2>Empty Bookmarks</h2>;
  }
  return (
    <section class="px-4 py-6">
      <div class="container-xl lg:container m-auto px-4 py-6">
        <h1 class="text-3xl font-bold mb-6">Your Saved Properties</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => {
            return <PropertyCard property={bookmark} key={bookmark._id} />;
          })}
        </div>
      </div>
    </section>
  );
}
export default SavedPage;
