import { ArrowUpFromDot, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "./WidthWrapper";

const Links: TNav[] = [
  { id: 1, name: "About", href: "#" },
  { id: 2, name: "Projects", href: "#" },
  { id: 3, name: "Buy", href: "#" },
  { id: 4, name: "Contact", href: "#" },
];

export default function Footer() {
  return (
    <MaxWidthWrapper className="border">
      <section className="flex flex-wrap gap-20 py-10">
        <nav className="flex flex-col">
          <h1 className="py-2 text-2xl">Menu</h1>
          {Links.map((item: TNav) => (
            <Link
              className="hover:underlined py-1 text-sm text-primary underline-offset-4 hover:text-muted-foreground hover:underline"
              href={item.href}
              key={item.id}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <nav className="flex flex-col gap-2">
          <h1 className="pt-2 text-2xl">About</h1>

          <p className="max-w-xs text-clip text-sm text-muted-foreground">
            Fibonacci enhances the way of building architecture designs
            sadoasofj asfk;asfkas fasas
          </p>
          <div className="flex gap-4 text-sm text-primary">
            <Link
              href="#"
              className="flex items-center gap-1 underline-offset-4 hover:-translate-y-[0.5px] hover:translate-x-[0.5px] hover:text-muted-foreground hover:underline"
            >
              Instagram
              <SquareArrowOutUpRight className="w-[16px]" />
            </Link>
            <Link
              href="#"
              className="group flex items-center gap-1 underline-offset-4 hover:-translate-y-[0.5px] hover:translate-x-[0.5px] hover:text-muted-foreground hover:underline"
            >
              Linkedin{" "}
              <SquareArrowOutUpRight className="w-[16px] group-hover:-translate-y-[0.5px] group-hover:translate-x-[0.5px]" />
            </Link>
          </div>
        </nav>
        <nav className="flex flex-col gap-2">
          <h1 className="pt-2 text-2xl">Get in Touch</h1>
          <div className="flex flex-col items-start justify-center text-sm text-muted-foreground">
            <p>+91 0403242343</p>
            <p>example1@gmail.com</p>
          </div>
        </nav>
      </section>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold text-muted-foreground md:text-6xl lg:text-7xl">
          Fibonacci Architecture & Designs
        </h1>
        <div className="flex justify-between gap-4 py-8 text-xs text-muted-foreground md:flex-row">
          <p className="max-w-xs md:max-w-sm">
            Copyright © 2024 - All right reserved by ACME Industries Ltd
          </p>

          <Link
            href="#"
            className="w-22 group flex items-center gap-1 underline-offset-4 hover:-translate-y-[0.5px] hover:translate-x-[0.5px] hover:text-primary hover:underline"
          >
            Back to Top
            <ArrowUpFromDot
              width="20px"
              height="18px"
              className="w-[16px] group-hover:-translate-y-[1px]"
            />
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
