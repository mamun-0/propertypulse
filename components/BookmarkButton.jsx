"use client";
import { useSession } from "next-auth/react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { bookmark } from "@/app/actions/bookmark";
import { useEffect, useState } from "react";
import { checkBookmarkStatus } from "@/app/actions/checkBookmarkStatus";
const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const [isloading, setIsLoading] = useState(true);
  const [bookMarkCheck, setBookMarkCheck] = useState();
  useEffect(() => {
    if (!session) {
      setIsLoading(false);
      return;
    }

    const checkBookmarkFunc = async () => {
      const res = await checkBookmarkStatus(property._id);
      setBookMarkCheck(res);
      setIsLoading(false);
    };
    checkBookmarkFunc();
  }, [session, bookMarkCheck, property._id]);
  const handleClick = async () => {
    if (!session || !session.user) {
      toast.error("You must be logged in to bookmark a property");
      return;
    }
    const res = await bookmark(property._id);
    setBookMarkCheck(res.isBookmarked);
    toast.success(res.message);
  };
  if (isloading) {
    return <h3 className="text-center">Loading...</h3>;
  }
  return (
    <button
      className={`${
        bookMarkCheck
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600"
      }  text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
      onClick={() => {
        handleClick(property._id);
      }}
    >
      <FaBookmark className="mr-1" />{" "}
      {bookMarkCheck ? "Remove Bookmark Property" : "Bookmark Property"}
    </button>
  );
};

export default BookmarkButton;
