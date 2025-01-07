import { Footer } from "@/components/global/footer";
import { Navigation } from "@/components/global/navigation";
import { GetMerchantsFromUserID } from "@/query/merchant/service";
import { GetUserFromClerkID } from "@/query/user/service";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const MainLayout = async ({ children }: Props) => {
  const session = await currentUser();
  if (!session) {
    return redirect("/sign-in");
  }
  const user = await GetUserFromClerkID(session?.id);
  const convertedUser = {
    user_id: user?.user_id ?? "",
    image_url: session?.imageUrl ?? "",
    first_name: user?.first_name ?? "",
    last_name: user?.last_name ?? "",
    email: user?.email ?? "",
  };
  const merchants = await GetMerchantsFromUserID(user?.user_id ?? "");
  const merchant_ids = merchants.map((merchant) => merchant.merchant_id);
  console.log(merchant_ids);

  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <Navigation
        title="Aiselena"
        user={session ? convertedUser : null}
        merchant_ids={merchant_ids}
      />
      <div className="flex min-h-screen container mx-auto p-4">{children}</div>
      <Footer />
    </ClerkProvider>
  );
};

export default MainLayout;
