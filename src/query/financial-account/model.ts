interface Receiver {
  bank_name: string; // e.g., "Kasikorn Bank", "Bangkok Bank"
  account_number: string; // Bank account number, censored to show only the last 4 digits
}

export interface Payout {
  payout_id: string; // Unique identifier for the payout
  receiver: Receiver; // Information about the receiver
  amount: number; // Amount of the payout
  status: string; // e.g., "pending", "success"
  eta: Date; // Estimated time of arrival for the payout
  organisation_id: string; // ID of the organisation making the payout
  created_at: Date; // Timestamp for when the payout was created
}

export interface Customer {
  fullname: string; // Full name of the customer
  email: string; // Customer's email address
}

export interface Revenue {
  revenue_id: string; // Unique identifier for the revenue
  merchant: string; // Name of the merchant
  amount: number; // Revenue amount in cents or preferred unit
  customer: Customer; // Customer details
  when: string; // Date and time in ISO 8601 format
  organisation_id: string; // ID of the organization
}
