export type Merchant = {
  id: string;
  merchant_id: string;
  image_url: string;
  name: string;
  domain: string;
  description: string;
  type: string;
  address: string;
  members: Member[];
  status: string;
  created_at: Date;
  updated_at: Date;
};

export type MerchantSavedScheme = {
  name: string;
  domain: string;
  description: string;
  type: string;
  address: string;
  members: Member[];
};

export type Member = {
  user_id: string;
  role: string;
};
