"use server";

import { db } from "@/lib/db";
import { UserSavedScheme } from "./model";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@clerk/nextjs/server";

export const GetUserFromUserID = async (user_id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        user_id: user_id,
      },
    });
    return user;
  } catch (error) {
    console.log("Error in GetUserFromUserID: " + error);
    throw new Error("error cannot get user from user id");
  }
};

export const GetUserFromClerkID = async (clerk_id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        clerk_id: clerk_id,
      },
    });
    return user;
  } catch (error) {
    console.log("Error in GetUserFromClerkID: " + error);
    throw new Error("error cannot get user from clerk id");
  }
};

export const GetUserFromEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.log("Error in GetUserFromEmail: " + error);
    throw new Error("error cannot get user from email");
  }
};

export const SaveUser = async (user: UserSavedScheme) => {
  try {
    const current_user = await currentUser();
    if (!current_user) {
      throw new Error("unauthorized");
    }
    const savedUser = await db.user.upsert({
      where: {
        clerk_id: current_user.id, // Assuming `clerk_id` is unique
      },
      update: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        bio: user.bio,
      },
      create: {
        user_id: "user_" + uuidv4(),
        clerk_id: current_user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        bio: user.bio,
        created_at: new Date(),
      },
    });

    return savedUser;
  } catch (error) {
    console.log("Error in SaveUser: " + error);
    throw new Error("error cannot save user");
  }
};

export const DeleteUser = async (user_id: string) => {
  try {
    await db.user.delete({
      where: {
        user_id: user_id,
      },
    });
  } catch (error) {
    console.log("Error in DeleteUser: " + error);
    throw new Error("error cannot delete user");
  }
};
