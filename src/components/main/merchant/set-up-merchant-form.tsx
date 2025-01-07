"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SaveMerchant } from "@/query/merchant/service";
import { useRouter } from "next/navigation";

const merchantTypes = [
  "Clothing and Apparel",
  "Electronics",
  "Home Goods",
  "Restaurants",
  "Cafes",
  "Food Trucks",
  "Medical Services",
  "Fitness & Personal Training",
  "Spa and Wellness",
  "Personal Care",
  "Cleaning Services",
  "Event Planning",
  "Software Development",
  "Digital Marketing",
  "IT Services",
  "Electronics Manufacturing",
  "Automotive Parts",
  "Food Processing",
  "Art Galleries",
  "Performing Arts",
  "Event Venues",
  "Schools & Tutoring",
  "Online Learning Platforms",
  "Vocational Training",
  "Freight & Delivery",
  "Ride-Sharing",
  "Vehicle Rentals",
  "Residential and Commercial Development",
  "Property Management",
  "Architecture",
  "Accounting",
  "Tax Services",
  "Insurance",
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Merchant name must be at least 2 characters.",
  }),
  domain: z
    .string()
    .min(2, {
      message: "Subdomain must be at least 2 characters.",
    })
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "Subdomain can only contain letters, numbers, and hyphens.",
    }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  type: z.string({
    required_error: "Please select a merchant type.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
});

const SetUpNewMerchantForm = ({ user_id }: { user_id: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      domain: "",
      description: "",
      type: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically send the form data to your backend
    try {
      const merchant = await SaveMerchant({
        name: values.name,
        domain: values.domain,
        description: values.description,
        type: values.type,
        address: values.address,
        members: [{ user_id: user_id, role: "owner" }],
      });
      toast({
        title: "Success",
        description: "Merchant created successfully",
      });
      router.push(`/dashboard/${merchant.merchant_id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to create merchant: ${error.message}`,
      });
    }
  }

  return (
    <div className="container mx-auto max-w-6xl min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Set Up New Merchant</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Merchant Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter merchant name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subdomain</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input placeholder="Enter subdomain" {...field} />
                      <span className="ml-2 flex items-center text-sm text-muted-foreground">
                        .aiselena.com
                      </span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Only letters, numbers, and hyphens are allowed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Merchant Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a merchant type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {merchantTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter merchant address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter a brief description of the merchant"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full md:w-auto">
            Create Merchant
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SetUpNewMerchantForm;
