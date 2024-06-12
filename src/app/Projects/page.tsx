"use client";
import ImageCard from "@/components/ImageCard";
import MaxWidthWrapper from "@/components/WidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils/utils";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Doc } from "../../../convex/_generated/dataModel";
import { SearchBar } from "@/components/SearchBar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  FolderKanban,
  Menu,
  Package,
  Package2,
  PackageSearch,
} from "lucide-react";

export default function Projects() {
  const [type, setType] = useState<Doc<"projects">["projectType"]>("all");
  const [query, setQuery] = useState<string>("");

  const getFiles = useQuery(api.projects.getProjectFiles, {
    projectType: type === "all" ? undefined : type,
    query,
  });

  return (
    <MaxWidthWrapper>
      <section className="max-w-full py-28 text-start">
        <div className="flex items-start gap-8">
          <h1 className="max-w-5xl text-3xl font-extrabold text-secondary-foreground md:text-4xl xl:text-5xl">
            Projects
          </h1>
        </div>
        <Tabs
          value={type}
          onValueChange={(newType) => setType(newType as any)}
          defaultValue="all"
          className=" "
        >
          <TabsList className="flex w-auto flex-1 flex-wrap justify-start gap-x-4 gap-y-4 bg-transparent py-12 text-xs">
            <TabsTrigger
              value="all"
              className={cn(
                "border hover:translate-x-2 hover:bg-accent hover:px-7 hover:text-accent-foreground",
                buttonVariants({
                  variant: "ghost",
                  border: "md",
                }),
              )}
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="interior"
              className={cn(
                "border hover:translate-x-2 hover:bg-accent hover:px-7 hover:text-accent-foreground",
                buttonVariants({
                  variant: "ghost",
                  border: "md",
                }),
              )}
            >
              Interior
            </TabsTrigger>
            <TabsTrigger
              value="elevation"
              className={cn(
                "border hover:translate-x-2 hover:bg-accent hover:px-7 hover:text-accent-foreground",
                buttonVariants({
                  variant: "ghost",
                  border: "md",
                }),
              )}
            >
              Elevation
            </TabsTrigger>
            <TabsTrigger
              value="models"
              className={cn(
                "border hover:translate-x-2 hover:bg-accent hover:px-7 hover:text-accent-foreground",
                buttonVariants({
                  variant: "ghost",
                  border: "md",
                }),
              )}
            >
              3D Models
            </TabsTrigger>
            <TabsTrigger
              value="floorplan"
              className={cn(
                "border hover:translate-x-2 hover:bg-accent hover:px-7 hover:text-accent-foreground",
                buttonVariants({
                  variant: "ghost",
                  border: "md",
                }),
              )}
            >
              Floor Planning
            </TabsTrigger>
            <SearchBar className="" query={query} setQuery={setQuery} />
          </TabsList>

          <TabsContent value={type}>
            <div className="mt-20 flex flex-wrap gap-y-10 lg:mt-0">
              {getFiles?.map((item) => (
                <ImageCard file={item} key={item._id} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </MaxWidthWrapper>
  );
}
