// "use server";
import DashboardButtonMobile from "@/app/DashboardButtonMobile";
import { cn } from "@/utils/utils";
import { SignInButton, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import MobileNav from "./MobileNav";
import MaxWidthWrapper from "./WidthWrapper";
import ToggleMode from "./ui/ToogleMode";
import { Button, buttonVariants } from "./ui/button";

export default async function Navbar() {
  let isAdmin = false;
  const { sessionClaims } = auth();
  if (sessionClaims?.metadata.role === "admin") {
    isAdmin = true;
  }

  const Nav: TNav[] = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Projects", href: "/Projects" },
    { id: 3, name: "Buy", href: "/Buy" },
    { id: 4, name: "Contact", href: "/contact" },

    ...(isAdmin
      ? [{ id: 8, name: "Dashboard", href: "/admin/Dashboard/Products" }]
      : []),
  ];

  return (
    <header className="fixed z-50 w-full bg-transparent backdrop-blur-xl">
      <MaxWidthWrapper className="flex h-20 items-center justify-between">
        <Link className="text-2xl font-bold" href="/">
          Fibonacci
        </Link>

        <nav className="mb-2 ml-auto mr-4 hidden items-center gap-2 md:flex">
          {Nav.map((item: TNav) => (
            <>
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "!rounded-full hover:px-6",
                  buttonVariants({
                    variant: "outline",
                    size: "sm",
                  }),
                )}
              >
                {item.name}
              </Link>
            </>
          ))}

          <SignedOut>
            <Button variant="outline" size="sm" className="hover:px-6">
              <SignInButton mode="modal" />
            </Button>
          </SignedOut>
          {/*  */}
          <ToggleMode />
        </nav>

        <DashboardButtonMobile>
          <Link
            href="/admin/Dashboard/Inventory"
            className={cn(
              "hover:px-6 md:hidden",
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
            )}
          >
            Dashboard
          </Link>
        </DashboardButtonMobile>
        <MobileNav />
      </MaxWidthWrapper>
    </header>
  );
}
