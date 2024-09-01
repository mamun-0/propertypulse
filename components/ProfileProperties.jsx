"use client";
import Link from "next/link";
import Image from "next/image";
import { deleteProperty } from "@/app/actions/deleteProperty";
import { useState } from "react";
import { toast } from "react-toastify";

const ProfileProperties = ({ leanDocument }) => {
  const [allProperties, setAllProperties] = useState(leanDocument);
  if (allProperties.length === 0) {
    return "You have no properties listed.";
  }

  async function handleDeleteProperty(propertyId) {
    const confirm = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirm) return;
    await deleteProperty(propertyId);
    filterProperties(propertyId);
    toast.success("Property deleted successfully");
  }

  function filterProperties(propertyId) {
    const filteredProperties = allProperties.filter(
      (property) => property._id !== propertyId
    );
    setAllProperties(filteredProperties);
  }
  return (
    <>
      {allProperties.map((property, idx) => {
        return (
          <div key={idx} className="mb-10">
            <Link href={`/properties/${property._id}`}>
              <Image
                className="h-32 w-full rounded-md object-cover"
                src={property.images[0]}
                width={1800}
                height={400}
                alt=""
              />
            </Link>
            <div className="mt-2">
              <p className="text-lg font-semibold">{property.name}</p>
              <p className="text-gray-600">
                Address: {property.location.street}
              </p>
            </div>
            <div className="mt-2">
              <a
                href="/add-property.html"
                className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
              >
                Edit
              </a>
              <button
                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                type="button"
                onClick={() => {
                  handleDeleteProperty(property._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProfileProperties;
