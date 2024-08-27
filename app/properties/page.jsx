import PropertyCard from "@/components/PropertyCard";
import properties from "@/properties.json";
const Property = () => {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.length == 0 ? (
            <p>No Properties</p>
          ) : (
            properties.map((property) => {
              return <PropertyCard property={property} key={property._id} />;
            })
          )}
        </div>
      </div>
    </section>
  );
};
export default Property;
