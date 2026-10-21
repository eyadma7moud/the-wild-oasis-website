"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const activeFilter = searchParams.get("capacity");

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="flex justify-end mb-8">
      <div className="border border-primary-800 flex">
        <button
          className={`px-5 py-2 hover:bg-primary-700 ${(activeFilter === "all" || !activeFilter) ? "bg-primary-700" : "text-primary-50"}`}
          onClick={() => handleFilter("all")}
        >
          All cabins
        </button>
        <button
          className={`px-5 py-2 hover:bg-primary-700 border-l-2 border-primary-700 ${activeFilter === "small" ? "bg-primary-700" : "text-primary-50"}`}
          onClick={() => handleFilter("small")}
        >
          1&mdash;3 guests
        </button>
        <button
          className={`px-5 py-2 hover:bg-primary-700 border-l-2 border-primary-700 ${activeFilter === "medium" ? "bg-primary-700" : "text-primary-50"}`}
          onClick={() => handleFilter("medium")}
        >
          4&mdash;7 guests
        </button>
        <button
          className={`px-5 py-2 hover:bg-primary-700 border-l-2 border-primary-700 ${activeFilter === "large" ? "bg-primary-700" : "text-primary-50"}`}
          onClick={() => handleFilter("large")}
        >
          8&mdash;12 guests
        </button>
      </div>
    </div>
  );
}

export default Filter;
