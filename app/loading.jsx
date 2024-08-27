"use client";
import ClipLoader from "react-spinners/ClipLoader";
const override = {
  display: "block",
  margin: "100px auto",
};
const Loading = () => {
  return (
    <ClipLoader
      color="#3b826f"
      size={150}
      aria-label="Loading Spinner"
      cssOverride={override}
    />
  );
};
export default Loading;
