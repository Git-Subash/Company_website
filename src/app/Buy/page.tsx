"use client";
import { useCart } from "@/components/CartContex";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import BuyHeader from "./_components/BuyHeader";
import ProductCard from "./_components/ProductCard";
import { Id } from "../../../convex/_generated/dataModel";

export default function Buy() {
  const [query, setQuery] = useState<string>("");
  const [id, setId] = useState<Id<"products"> | undefined>();
  const files = useQuery(api.products.getProductFiles, { query, id });
  return (
    <main className="h-full w-full">
      <BuyHeader query={query} setQuery={setQuery} />
      <div className="flex flex-1 flex-wrap">
        {files?.map((item: any) => <ProductCard key={item._id} file={item} />)}
      </div>
    </main>
  );
}
