import EditProperty from "@/components/Forms/EditProperty";
import Property from "@/models/Property";
import connectDB from "@/config/database";
import convertToSerializableObject from "@/utils/convertToSerializableObject";
const EditPage = async ({ params }) => {
  await connectDB();
  const property = await Property.findById(params.id).lean();
  const leanDocument = convertToSerializableObject(property);
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border mx-4 md:mx-0">
          <EditProperty property={leanDocument} />
        </div>
      </div>
    </section>
  );
};

export default EditPage;
