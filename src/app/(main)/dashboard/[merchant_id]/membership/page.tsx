import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { GetMerchantFromMerchantID } from "@/query/merchant/service";
import { GetUserFromUserID } from "@/query/user/service";

export default async function TeamMembershipPage({
  params,
}: {
  params: { merchant_id: string };
}) {
  const { merchant_id } = await params;

  // Fetch merchant members
  const merchant = await GetMerchantFromMerchantID(merchant_id);

  // Fetch user details for each member
  const data = merchant?.members
    ? await Promise.all(
        merchant.members.map(async (member) => {
          const user = await GetUserFromUserID(member.user_id);
          return {
            id: member.user_id,
            user_id: member.user_id,
            fullname: `${user?.first_name} ${user?.last_name}`,
            email: user?.email || "",
            role: member.role,
          };
        })
      )
    : [];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Team Members</h1>
        <Button>
          <UserPlus className="mr-2 h-5 w-5" /> Invite Member
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
