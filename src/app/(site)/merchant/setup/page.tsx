import SetUpNewMerchantForm from "@/components/main/merchant/set-up-merchant-form";
import { GetUserFromClerkID } from "@/query/user/service";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const SetUpNewMerchant = async () => {
  const session = await currentUser();
  if (!session) {
    return redirect("/sign-in");
  }
  const user = await GetUserFromClerkID(session.id);
  if (!user) {
    return redirect("/accounts/edit");
  }
  return <SetUpNewMerchantForm user_id={user.user_id} />;
};

export default SetUpNewMerchant;
