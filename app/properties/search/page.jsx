import PropertySearch from "@/components/Forms/PropertySearch";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import convertToSerializableObject from "@/utils/convertToSerializableObject";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchPage = async ({ searchParams }) => {
  const { location, propertyType } = searchParams;
  const regxLocation = new RegExp(location, "i");
  const regxPropertyType = new RegExp(propertyType, "i");

  await connectDB();
  let query = {
    $or: [
      { name: regxLocation },
      { description: regxLocation },
      { "location.street": regxLocation },
      { "location.city": regxLocation },
      { "location.state": regxLocation },
      { "location.zipcode": regxLocation },
    ],
  };
  if (propertyType && propertyType !== "All") {
    query.type = regxPropertyType;
  }
  const properties = await Property.find(query).lean();
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearch />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container mx-auto px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back to Properties
          </Link>
          <h2 className="text-center text-4xl font-semibold my-4">Search Result</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.length == 0
              ? "Not found!"
              : properties.map((property) => {
                  return (
                    <PropertyCard key={property._id} property={property} />
                  );
                })}
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchPage;
