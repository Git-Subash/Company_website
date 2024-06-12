import MaxWidthWrapper from "@/components/WidthWrapper";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "./Header";
import Side from "./Side";

export default function layout({ children }: { children: React.ReactNode }) {
  const { sessionClaims } = auth();
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/");
  }
  return (
    <MaxWidthWrapper>
      <div className="grid min-h-screen w-full py-20 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Side />
        <div className="flex flex-col gap-4">
          <Header />
          {children}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
