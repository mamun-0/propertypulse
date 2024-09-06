import PropertyDetails from "@/components/PropertyDetails";
import PropertyDetailsImage from "@/components/PropertyDetailsImage";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyImages from "@/components/PropertyImages";
import convertToSerializableObject from "@/utils/convertToSerializableObject";
import BookmarkButton from "@/components/BookmarkButton";
import ShareProperty from "@/components/ShareProperty";
import PropertyContact from "@/components/Forms/PropertyContact";
const PropertyDetailsPage = async ({ params }) => {
  await connectDB();
  const findProperty = await Property.findById(params.id).lean();
  const property = convertToSerializableObject(findProperty);
  return (
    <>
      <PropertyDetailsImage image={property.images} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareProperty property={property} />
              <PropertyContact property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};
export default PropertyDetailsPage;
