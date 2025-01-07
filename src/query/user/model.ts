export type User = {
  id: string;
  user_id: string;
  clerk_id: string;
  image_url: string;
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
  created_at: Date;
  updated_at: Date;
};

export type UserSavedScheme = {
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
};

export type UserUpdateScheme = {
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
};
