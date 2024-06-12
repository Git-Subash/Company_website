import { cn } from "@/utils/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({ children, className }: children) => {
  return (
    <div
      className={cn(
        "max-w-screen-4xl mx-auto w-full px-2.5 md:px-10",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
