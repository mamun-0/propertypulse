import properties from "@/properties.json";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
const HomeProperties = () => {
  const recentProperties = properties.slice(0, 3);
  return (
    <>
      <section className="px-4 py-6">
        <h2 className="text-center text-3xl font-bold text-blue-800 mb-6">
          Recent Properties
        </h2>
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.length == 0 ? (
              <p>No Properties</p>
            ) : (
              recentProperties.map((property) => {
                return <PropertyCard property={property} key={property._id} />;
              })
            )}
          </div>
        </div>
      </section>
      <section className="max-w-lg mx-auto my-5 px-4">
        <Link
          className="block bg-black text-white text-center py-4 px-6
          hover:bg-gray-700 rounded-xl"
          href="/properties"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};
export default HomeProperties;
