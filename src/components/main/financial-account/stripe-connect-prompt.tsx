import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowRight, CreditCard } from "lucide-react";

export function StripeConnectPrompt() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
          <CardTitle>Connect Your Stripe Account</CardTitle>
        </div>
        <CardDescription>
          Start accepting payments by connecting Stripe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            To start receiving payments through our platform, you need to
            connect your Stripe account. This will allow you to:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Accept credit card payments</li>
            <li>Manage your transactions</li>
            <li>Access detailed financial reports</li>
          </ul>
          <div className="flex items-center justify-center p-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg">
            <CreditCard className="h-12 w-12 text-white" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg">
          Connect Stripe
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
