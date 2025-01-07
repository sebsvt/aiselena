"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SaveUser } from "@/query/user/service";
import { useRouter } from "next/navigation";

export interface ProfileFormData {
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
}

export default function ProfileForm({
  user,
}: {
  user?: ProfileFormData | null;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState<ProfileFormData>({
    first_name: user?.first_name ?? "",
    last_name: user?.last_name ?? "",
    email: user?.email ?? "",
    bio: user?.bio ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await SaveUser({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        bio: formData.bio,
      });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to save changes: ${error.message}`,
      });
    }
  };

  return (
    <div className="flex justify-center container mx-auto min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <Card className="border-none mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Profile</CardTitle>
          <CardDescription>
            This is how others will see you on the site.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first_name">First name</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      first_name: e.target.value,
                    }))
                  }
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last name</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      last_name: e.target.value,
                    }))
                  }
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="user@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, bio: e.target.value }))
                }
                placeholder="Write a few sentences about yourself"
                className="min-h-[100px]"
              />
              <p className="text-sm text-muted-foreground">
                Describe about yourself in a few sentences. This will be shown
                on your profile page.
              </p>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
