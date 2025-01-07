"use server";

import { db } from "@/lib/db";
import { MerchantSavedScheme } from "./model";
import { v4 as uuidv4 } from "uuid";

export const GetMerchantFromMerchantID = async (merchant_id: string) => {
  try {
    const merchant = await db.merchant.findUnique({
      where: {
        merchant_id: merchant_id,
      },
    });
    return merchant;
  } catch (error) {
    console.log("Error in GetMerchantFromMerchantID: " + error);
    throw new Error("error cannot get merchant from merchant id");
  }
};
export const GetMerchantFromDomain = async (domain: string) => {
  try {
    const merchant = await db.merchant.findUnique({
      where: {
        domain: domain,
      },
    });
    return merchant;
  } catch (error) {
    console.log("Error in GetMerchantFromDomain: " + error);
    throw new Error("error cannot get merchant from domain");
  }
};
export const GetMerchantsFromUserID = async (user_id: string) => {
  try {
    const merchants = await db.merchant.findMany({
      where: {
        members: {
          some: {
            user_id: user_id,
          },
        },
      },
    });
    return merchants;
  } catch (error) {
    console.log("Error in GetMerchantsFromUserID: " + error);
    throw new Error("error cannot get merchants from user id");
  }
};
// update and create
export const SaveMerchant = async (
  merchant: MerchantSavedScheme,
  merchant_id?: string // Optional merchant_id parameter
) => {
  try {
    if (!merchant_id) {
      // Create a new merchant if no merchant_id is provided
      const newMerchant = await db.merchant.create({
        data: {
          merchant_id: `merchant_${uuidv4()}`, // Generate a unique merchant_id
          name: merchant.name,
          domain: merchant.domain,
          description: merchant.description,
          type: merchant.type,
          address: merchant.address,
          members: merchant.members || [], // Default to an empty array
        },
      });
      return newMerchant;
    }

    // Update the existing merchant if merchant_id is provided
    const updatedMerchant = await db.merchant.update({
      where: {
        merchant_id: merchant_id,
      },
      data: {
        name: merchant.name,
        domain: merchant.domain,
        description: merchant.description,
        type: merchant.type,
        address: merchant.address,
        members: merchant.members || [], // Update members if provided
      },
    });

    return updatedMerchant;
  } catch (error) {
    console.error("Error in SaveMerchant:" + error);
    throw new Error("error cannot save merchant");
  }
};
