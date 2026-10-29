"use client";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { differenceInDays } from "date-fns";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import { createReservation } from "../_lib/actions";
import { useReservation } from "./ReservationsContext";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-4 py-2 rounded-sm text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? <SpinnerMini /> : "Reserve now"}
    </button>
  );
}

export default function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createReservationWithData = createReservation.bind(null, bookingData);

  const [state, formAction] = useActionState(createReservationWithData, {
    success: false,
    message: "",
  });
  console.log(state);

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      resetRange();
    } else {
      toast.error(state.message);
    }
  }, [state.message, state.success, resetRange]);

  return (
    <div className="min-w-0">
      <div className="bg-primary-800 text-primary-300 rounded-tr-2xl px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={formAction}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col rounded-br-2xl"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>

          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="">Select number of guests...</option>

            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>

          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!range.to && (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          )}

          {range.to && <SubmitButton />}
        </div>
      </form>
    </div>
  );
}
