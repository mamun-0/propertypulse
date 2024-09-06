import Link from "next/link";

const Pagination = ({ page, pageSize, totalPage }) => {
  return (
    <section class="container mx-auto flex justify-center items-center my-8">
      {page > 1 && (
        <Link
          class="mr-2 px-2 py-1 border border-gray-300 rounded"
          href={`/properties?page=${page - 1}`}
        >
          Previous
        </Link>
      )}

      <span class="mx-2">
        Page {page} of {totalPage}
      </span>

      {page < totalPage && (
        <Link
          class="ml-2 px-2 py-1 border border-gray-300 rounded"
          href={`/properties?page=${page + 1}`}
        >
          Next
        </Link>
      )}
    </section>
  );
};

export default Pagination;
