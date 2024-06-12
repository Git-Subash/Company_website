import { auth } from "@clerk/nextjs/server";
import { ReactNode } from "react";

export default function DashboardButtonMobile({
  children,
}: {
  children: ReactNode;
}) {
  const { sessionClaims } = auth();
  const assignRole = sessionClaims?.metadata.role === "admin";

  return (
    <div className="ml-auto mr-4 md:hidden">
      {assignRole ? <> {children} </> : null}
    </div>
  );
}
