import Spinner from "@/app/_components/Spinner";
import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

const student = { name: "Eyad", age: 20, city: "Giza" };

export async function GET(request, { params }) {
  const { cabinId } = await params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Page not found" });
  }
}

export async function POST() {}
