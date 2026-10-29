"use client";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteReservation } from "../_lib/actions";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { toast } from "react-toastify";

function DeleteReservation({ bookingId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  async function handleDelete() {
    try {
      setIsDeleting(true);
      await deleteReservation({ bookingId });
      toast.success("Reservation deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete reservation.");
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <button
      disabled={isDeleting}
      className="group flex items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-red-500 transition-colors hover:text-primary-900 disabled:cursor-not-allowed disabled:opacity-50"
      onClick={handleDelete}
    >
      {" "}
      {isDeleting ? (
        <SpinnerMini />
      ) : (
        <>
          {" "}
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />{" "}
          <span className="mt-1">Delete</span>{" "}
        </>
      )}{" "}
    </button>
  );
}
export default DeleteReservation;
