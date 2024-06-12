import { ReactNode } from "react";

export {};

// Create a type for the roles
export type Roles = "admin" | "moderator";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
  interface project {
    id: number;
    title: string;
    description: string;
    img: string;
  }
  interface editdata {
    _id: string | any;
    name: string;
    description: string;
    type: string;
    imageId?: string;
    file?: FileList | undefined;
    price?: number;
    image?: File[];
    role: "editor" | "viewer";
  }
  interface children {
    children: ReactNode;
    className?: string;
  }
  interface CardProps {
    id: number;
    title: string;
    description: string;
    img: string;
    i: number;
    range: number[];
    progress: MotionValue<number>;
    targetScale: number;
  }
  type TNav = {
    id: number;
    name: string | ReactNode;
    href: string;
  };
}
