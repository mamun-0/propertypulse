"use client";
import ClipLoader from "react-spinners/ClipLoader";
const override = {
  display: "block",
  margin: "100px auto",
};
const Spinner = () => {
  return (
    <ClipLoader
      color="#3b826f"
      size={100}
      aria-label="Loading Spinner"
      cssOverride={override}
    />
  );
};
export default Spinner;
