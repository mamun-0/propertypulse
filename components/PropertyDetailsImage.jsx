"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const PropertyDetailsImage = ({ image }) => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (image.length <= 1) {
      setImgIndex(0);
      return;
    }
    
    const clearId = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % image.length);
    }, 3000);

    return () => {
      clearInterval(clearId);
    };
  }, [image.length]);

  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image[imgIndex]}
            alt=""
            className="object-cover h-[400px] w-full"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyDetailsImage;
