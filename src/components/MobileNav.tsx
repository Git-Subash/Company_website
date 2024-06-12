"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/utils/utils";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ToggleMode from "./ui/ToogleMode";
import { Button, buttonVariants } from "./ui/button";

export default function MobileNav() {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const Nav: TNav[] = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Projects", href: "/Projects" },
    { id: 3, name: "Buy", href: "/Buy" },
    { id: 4, name: "Contat", href: "/contact" },
  ];

  return (
    <div className="">
      <Sheet
        open={isSheetOpen}
        onOpenChange={(isOpen) => setIsSheetOpen(isOpen)}
      >
        <div>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SheetTrigger asChild>
            <Button variant="ghost" className="rounded-lg md:hidden">
              <Menu />
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent className="py-12 md:hidden">
          <div className="absolute left-4 top-4">
            <ToggleMode />
          </div>
          <div className="flex flex-col items-center gap-2 text-3xl md:hidden">
            {Nav.map((item: TNav) => (
              <>
                <Link
                  onClick={() => setIsSheetOpen(false)}
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "!text-2xl hover:px-32",
                    buttonVariants({
                      variant: "ghost",
                      size: "lg",
                    }),
                  )}
                >
                  {item.name}
                </Link>
              </>
            ))}

            <SignedOut>
              <Link
                onClick={() => setIsSheetOpen(false)}
                href=""
                className={cn(
                  "hover:px-32",
                  buttonVariants({
                    variant: "ghost",
                  }),
                )}
              >
                <SignInButton mode="modal" />
              </Link>
            </SignedOut>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
