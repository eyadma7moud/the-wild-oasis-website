"use client";
import { isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationsContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }) {
  const { range, setRange, resetRange } = useReservation();
  // CHANGE
  const { regularPrice, discount, numNights, cabinPrice } = cabin;
  // const range = { from: null, to: null };

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between min-w-0 ">
      <DayPicker
        mode="range"
        onSelect={(range) => setRange(range)}
        selected={range}
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 11)}
        captionLayout="dropdown"
        numberOfMonths={2}
        className="pt-6 mx-auto"
        classNames={{
          months: "flex flex-row gap-4",
          today: "text-accent-400 font-bold",
          selected: "bg-accent-600 text-primary-50 rounded-full",
          range_start:
            "bg-accent-600 text-primary-950 rounded-l-full rounded-r-none",
          range_end:
            "bg-accent-600 text-primary-950 rounded-r-full rounded-l-none",
          range_middle: "bg-accent-900/50 text-primary-100 rounded-none",
          disabled: "text-primary-600 opacity-40 cursor-not-allowed",
          button_next:
            "text-accent-500 hover:bg-primary-800 hover:text-accent-400 rounded-full transition-colors",
          button_previous:
            "text-accent-500 hover:bg-primary-800 hover:text-accent-400 rounded-full transition-colors",
          chevron: "fill-accent-500",
          dropdowns: "flex items-center justify-center gap-2",
          dropdown_root: "relative border border-primary-700 rounded-md ",
          dropdown: "py-1 px-2 bg-primary-900 text-primary-100",
          caption_label: "hidden",
        }}
      />
      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px] rounded-bl-2xl">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
