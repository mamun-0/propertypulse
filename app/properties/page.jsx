import Pagination from "@/components/Pagination";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const PropertyPage = async ({ searchParams: { page = 1, pageSize = 4 } }) => {
  if (page < 1) page = 1;
  await connectDB();
  const countProperties = await Property.countDocuments({});
  const totalPage = Math.ceil(countProperties / pageSize);
  const pageSkip = (page - 1) * pageSize;
  const properties = await Property.find({}).skip(pageSkip).limit(pageSize);
  return (
    <>
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
      <Pagination
        totalPage={totalPage}
        page={parseInt(page)}
        pageSize={parseInt(pageSize)}
      />
    </>
  );
};
export default PropertyPage;
