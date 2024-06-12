"use client";

import { checkRole } from "@/utils/roles";
import { Package, Package2 } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

const links = [
  { name: "Products", href: "/admin/Dashboard/Products" },
  { name: "Projects", href: "/admin/Dashboard/Project" },
];

export default function Side() {
  if (!checkRole("admin")) {
    redirect("/");
  }

  let path = usePathname();

  return (
    <aside className="mr-4 hidden rounded-lg border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Admin</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="group grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
            {links.map((item) => (
              <>
                <Link
                  href={item.href}
                  className={
                    path === item.href
                      ? "flex items-center gap-3 rounded-lg bg-secondary px-3 py-2 text-primary transition-all"
                      : "flex scale-100 items-center gap-3 rounded-lg px-3 py-2 hover:text-primary active:scale-90"
                  }
                >
                  <Package className="h-4 w-4" />
                  {item.name}
                </Link>
              </>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
