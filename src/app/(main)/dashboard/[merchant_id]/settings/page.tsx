import { EditMerchantSettings } from "@/components/main/merchant/settings-merchant-form";
import { GetMerchantFromMerchantID } from "@/query/merchant/service";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    merchant_id: string;
  };
};

const SettingsPage = async ({ params }: Props) => {
  const { merchant_id } = await params;
  const merchant = await GetMerchantFromMerchantID(merchant_id);
  if (!merchant) {
    return redirect("/");
  }
  return (
    <EditMerchantSettings
      merchantData={{
        name: merchant?.name,
        type: merchant.domain,
        description: merchant.description ?? "",
        address: merchant.address,
        domain: merchant.domain,
      }}
    />
  );
};

export default SettingsPage;
