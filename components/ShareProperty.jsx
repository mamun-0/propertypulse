"use client";
import { usePathname } from "next/navigation";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";
function ShareProperty({ property }) {
  const pathName = usePathname();
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}${pathName}`;
  return (
    <>
      <h2 className="text-center font-semibold">Share on social media</h2>
      <div className="flex justify-center gap-3">
        <TwitterShareButton url={shareUrl} title={property.name}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <FacebookShareButton
          quote={property.name}
          hashtag="#property"
          url={shareUrl}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>
    </>
  );
}

export default ShareProperty;
