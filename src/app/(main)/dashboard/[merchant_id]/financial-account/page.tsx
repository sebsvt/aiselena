import { BalanceCard } from "@/components/main/financial-account/balance-card";
import { PayoutList } from "@/components/main/financial-account/payout-list";
import { StripeConnectPrompt } from "@/components/main/financial-account/stripe-connect-prompt";
import { TransactionList } from "@/components/main/financial-account/transaction-list";
import { WeeklyActivity } from "@/components/main/financial-account/weekly-activity";
import { Payout, Revenue } from "@/query/financial-account/model";
import React from "react";

const FinancialAccountPage = () => {
  const mockRevenues: Revenue[] = [
    {
      revenue_id: "revenue_001",
      merchant: "Merchant A",
      amount: 50000,
      customer: {
        fullname: "John Doe",
        email: "john.doe@example.com",
      },
      when: "2025-01-01T12:00:00Z",
      organisation_id: "org_001",
    },
    {
      revenue_id: "revenue_002",
      merchant: "Merchant B",
      amount: 75000,
      customer: {
        fullname: "Jane Smith",
        email: "jane.smith@example.com",
      },
      when: "2025-01-02T16:30:00Z",
      organisation_id: "org_002",
    },
  ];
  const mockPayouts: Payout[] = [
    {
      payout_id: "payout_001",
      receiver: {
        bank_name: "Kasikorn Bank",
        account_number: "****1234",
      },
      amount: 150000,
      status: "pending",
      eta: new Date("2025-01-05T10:30:00Z"),
      organisation_id: "org_001",
      created_at: new Date("2025-01-02T08:00:00Z"),
    },
    {
      payout_id: "payout_002",
      receiver: {
        bank_name: "Bangkok Bank",
        account_number: "****5678",
      },
      amount: 250000,
      status: "success",
      eta: new Date("2025-01-03T15:00:00Z"),
      organisation_id: "org_002",
      created_at: new Date("2025-01-01T14:00:00Z"),
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mt-10">
        <StripeConnectPrompt />
      </div>
    </div>
    // <div className="min-h-screen">
    //   <div className="container mx-auto px-2 py-8 max-w-4xl">
    //     <div className="space-y-8">
    //       <div className="grid gap-4 md:grid-cols-2">
    //         <BalanceCard balance={1682.55} availableBalance={1745.2} />
    //         <div className="rounded-xl border p-6 shadow-sm">
    //           <h2 className="text-sm font-medium ">Pending Payout</h2>
    //           <div className="mt-2">
    //             <span className="text-2xl font-semibold ">$4,200.00</span>
    //             <p>
    //               <span className="mt-1 text-sm text-gray-400">
    //                 3 payouts pending
    //               </span>
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //       <WeeklyActivity />
    //       <TransactionList revenues={mockRevenues} />
    //       <PayoutList payouts={mockPayouts} />
    //     </div>
    //   </div>
    // </div>
  );
};

export default FinancialAccountPage;
