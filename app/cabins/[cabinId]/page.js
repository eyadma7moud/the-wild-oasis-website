import CabinDetails from "@/app/_components/CabinDetails";
import DateSelector from "@/app/_components/DateSelector";
import LoginMessage from "@/app/_components/LoginMessage";
import ReservationForm from "@/app/_components/ReservationForm";
import Spinner from "@/app/_components/Spinner";
import { auth } from "@/app/_lib/auth";
import {
  getBookedDatesByCabinId,
  getCabin,
  getCabins,
  getSettings,
} from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);
  const { name } = cabin;

  return { title: `Cabin ${name}` };
}

export async function generateStaticParams({ params }) {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const { cabinId } = await params;
  const session = await auth();
  const user = session?.user;

  // const cabin = await getCabin(cabinId);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(cabinId);

  const [cabin, settings, bookedDates] = await Promise.all([
    getCabin(cabinId),
    getSettings(),
    getBookedDatesByCabinId(cabinId),
  ]);
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
    
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Suspense fallback={<Spinner />}>
        <CabinDetails cabinId={cabinId} />
      </Suspense>

      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-500">
          Reserve today. Pay on arrival.
        </h2>
        <div className="grid grid-cols-[4.5fr_3fr] border rounded-2xl border-primary-800 min-h-[420px] my-4">
          <Suspense fallback={<Spinner />}>
            <DateSelector
              settings={settings}
              bookedDates={bookedDates}
              cabin={cabin}
            />
            {session ? (
              <ReservationForm cabin={cabin} user={user} />
            ) : (
              <LoginMessage />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
