import React from "react";
import type { Metadata } from "next";
import ProfileForm from "@/components/site/accounts/account-form";
import { currentUser } from "@clerk/nextjs/server";
import { GetUserFromClerkID } from "@/query/user/service";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Account | Aiselena",
  description: "Edit your account",
};

const EditPage = async () => {
  const current_user = await currentUser();
  if (!current_user) {
    return redirect("/sign-in");
  }
  const user = await GetUserFromClerkID(current_user.id);
  return (
    <ProfileForm
      user={
        user
          ? {
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              bio: user.bio ?? "",
            }
          : null
      }
    />
  );
};

export default EditPage;
