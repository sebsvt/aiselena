import { MainNavigation } from "@/components/main/main-navigation";
import { SubNavigation } from "@/components/main/sub-navigation";
import { GetMerchantsFromUserID } from "@/query/merchant/service";
import { GetUserFromClerkID } from "@/query/user/service";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: { merchant_id: string };
};

const DashboardLayout = async ({ children, params }: Props) => {
  const current_user = await currentUser();
  if (!current_user) {
    return redirect("/sign-in");
  }
  const user = await GetUserFromClerkID(current_user.id);

  const { merchant_id } = await params;
  if (!user) {
    return redirect("/edit/accounts");
  }
  const user_merchants = await GetMerchantsFromUserID(user.user_id);
  const merchants = user_merchants;
  const subnav = [
    {
      label: "Overview",
      href: `/dashboard/${merchant_id}`,
    },
    {
      label: "Financial Account",
      href: `/dashboard/${merchant_id}/financial-account`,
    },
    {
      label: "Membership",
      href: `/dashboard/${merchant_id}/membership`,
    },
    {
      label: "Settings",
      href: `/dashboard/${merchant_id}/settings`,
    },
  ];
  return (
    <>
      <MainNavigation
        merchants={merchants}
        user={{
          user_id: user?.id ?? "",
          image_url: user?.image_url ?? "",
          first_name: user?.first_name ?? "",
          last_name: user?.last_name ?? "",
          email: user?.email ?? "",
        }}
      />
      <SubNavigation items={subnav} />
      <div className="container mx-auto p-4">{children}</div>
    </>
  );
};

export default DashboardLayout;
