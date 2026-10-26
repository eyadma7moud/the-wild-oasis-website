"use server";
import { supabase } from "./supabase";
import { auth, signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";

export async function updateGuest(prevState, formData) {
  try {
    const session = await auth();

    if (!session) {
      return {
        message: "You must be logged in",
        success: false,
      };
    }

    const nationalID = formData.get("nationalID");
    const nationalityValue = formData.get("nationality");

    if (!nationalID || !/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
      return {
        message: "Please provide a valid national ID",
        success: false,
      };
    }

    if (!nationalityValue) {
      return {
        message: "Please select your nationality",
        success: false,
      };
    }

    const [nationality, countryFlag] = nationalityValue.split("%");

    const { error } = await supabase
      .from("guests")
      .update({ nationality, nationalID, countryFlag })
      .eq("id", session.user.guestId);

    if (error) {
      console.error("Supabase update error:", error);

      return {
        message: "Could not update profile",
        success: false,
      };
    }

    revalidatePath("/account/profile");

    return {
      message: "Profile updated successfully!",
      success: true,
    };
  } catch (error) {
    console.error("Update guest error:", error);

    return {
      message: "Something went wrong. Please try again.",
      success: false,
    };
  }
}


export async function signinAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signoutAction() {
  await signOut({ redirectTo: "/" });
}
