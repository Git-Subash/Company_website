"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/utils/utils";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { api } from "../../convex/_generated/api";

import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import { Doc } from "../../convex/_generated/dataModel";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type ImageCardType = {
  className?: string;
  file: Doc<"projects"> & { url: string | null };
};

export default function ImageCard({ className, file }: ImageCardType) {
  return (
    <div className="flex flex-wrap">
      <Link
        href={`/Projects/view?id=${file._id}`}
        className={cn(
          "group relative rounded-lg !transition-all !duration-1000 !ease-in-out",
          className,
        )}
      >
        <div
          className={cn(
            "w-[450px] rounded-lg md:w-[350px] lg:w-[450px]",
            className,
          )}
        >
          <AspectRatio ratio={12 / 10}>
            <Image
              src={file.url || "/img2.jpg"}
              alt={file.name}
              fill
              className="scale-95 rounded-md bg-transparent object-cover transition-all duration-500 ease-in-out group-hover:scale-100 group-hover:object-left-bottom"
            />
          </AspectRatio>
        </div>

        <div className="hidden w-[450px] flex-col justify-end gap-1 px-4 text-left !transition-all !duration-1000 !ease-in-out group-hover:absolute group-hover:bottom-0 group-hover:flex group-hover:h-full group-hover:bg-muted/40">
          <h1 className="text-lg font-bold lg:text-3xl">{file.name}</h1>
          <p className="inline-block w-[280px] overflow-hidden text-ellipsis text-nowrap pb-8 text-sm">
            {" "}
            {file.description}
          </p>
        </div>
      </Link>
      {/* ))} */}
    </div>
  );
}
