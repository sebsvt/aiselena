interface BalanceCardProps {
  balance: number;
  availableBalance: number;
}

export function BalanceCard({ balance, availableBalance }: BalanceCardProps) {
  return (
    <div className="rounded-xl border p-6 shadow-sm">
      <h2 className="text-sm font-medium ">Total Balance</h2>
      <div className="mt-2">
        <span className="text-2xl font-semibold ">
          $
          {balance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <p className="mt-1 text-sm text-gray-400">
          $
          {availableBalance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          available
        </p>
      </div>
    </div>
  );
}
