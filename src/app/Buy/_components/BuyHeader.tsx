"use client";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  FolderKanban,
  Menu,
  Package,
  Package2,
  PackageSearch,
} from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

import CartIcon from "../CartIcon";

export default function BuyHeader({
  query,
  setQuery,
}: {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}) {
  return (
    <header className="flex h-16 items-center gap-4 rounded-lg border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <Package className="h-4 w-4" />
              Inventory
            </Link>
            <Link
              href="/admin/Dashboard/Products"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <PackageSearch className="h-4 w-4" />
              Products
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <FolderKanban className="h-4 w-4" />
              Projects
            </Link>
            <SearchBar className="ml-2" query={query} setQuery={setQuery} />
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center justify-between gap-3">
        <h1 className="text-lg font-semibold md:text-3xl">Products</h1>

        <SearchBar
          className="mt-0 hidden md:block"
          query={query}
          setQuery={setQuery}
        />
      </div>
      <CartIcon />
    </header>
  );
}
