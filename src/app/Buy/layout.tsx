import MaxWidthWrapper from "@/components/WidthWrapper";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import BuyHeader from "./_components/BuyHeader";
import { CartProvider } from "@/components/CartContex";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper>
      <CartProvider>
        <div className="min-h-screen w-full py-20 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="flex flex-col gap-4">{children}</div>
        </div>
      </CartProvider>
    </MaxWidthWrapper>
  );
}
