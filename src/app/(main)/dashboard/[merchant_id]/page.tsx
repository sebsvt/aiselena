"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for project instances
const projects = [
  {
    id: 1,
    name: "Storefront",
    url: "http://aiselena.com/storefront.example.com",
    status: "active",
    createdAt: new Date("2025-01-01T10:00:00Z"),
    initial: "S",
  },
  {
    id: 2,
    name: "Booking Portal",
    url: "http://aiselena.com/booking.example.com",
    status: "active",
    createdAt: new Date("2024-12-28T08:30:00Z"),
    initial: "B",
  },
  {
    id: 3,
    name: "Content Hub",
    url: "http://aiselena.com/content.example.com",
    status: "inactive",
    createdAt: new Date("2024-12-15T14:45:00Z"),
    initial: "C",
  },
];

export default function ProjectInstances() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter projects based on search query
  const filteredProjects = projects.filter((project) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      project.name.toLowerCase().includes(searchLower) ||
      project.url.toLowerCase().includes(searchLower)
    );
  });

  // Handle keyboard shortcut for search focus
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      const searchInput = document.getElementById("search-input");
      if (searchInput) {
        searchInput.focus();
      }
    }
  };

  // Add event listener for keyboard shortcut
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen  p-4 sm:p-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-input"
              type="search"
              placeholder="Search applications..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-3 top-2.5 px-1.5 py-0.5 rounded border  text-xs ">
              ⌘ K
            </div>
          </div>
          <Button className="w-full sm:w-auto ">
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </div>

        <div className="space-y-2">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No applications found matching your search.
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg  transition-colors"
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="w-8 h-8 flex items-center justify-center rounded  font-medium">
                    {project.initial}
                  </div>
                  <div>
                    <h3 className="font-medium ">{project.name}</h3>
                    <p className="text-sm text-muted-foreground break-all">
                      {project.url}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        project.status === "active"
                          ? "bg-green-500"
                          : "bg-zinc-500"
                      }`}
                    />
                    <span className="text-sm text-muted-foreground capitalize">
                      {project.status}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Created at{" "}
                    {format(
                      project.createdAt,
                      isMobile ? "yyyy-MM-dd" : "yyyy-MM-dd'T'HH:mm:ss'Z'"
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 ">
                      <DropdownMenuItem className="">
                        View Repository
                      </DropdownMenuItem>
                      <DropdownMenuItem className="">Copy URL</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500  hover:text-red-500">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
