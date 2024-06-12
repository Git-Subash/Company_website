"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Doc } from "../../convex/_generated/dataModel";
import { toast } from "./ui/use-toast";
import { SignIn, SignInButton, SignedOut, useUser } from "@clerk/nextjs";
import { ToastAction } from "./ui/toast";

interface CartItem extends Doc<"products"> {
  urls: string[];
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (index: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function useCart(): CartContextProps {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useUser();
  const userId = user ? user.id : null;
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCartItems);
  }, []);

  function addToCart(product: CartItem) {
    if (userId) {
      const existingCartItems = JSON.parse(
        localStorage.getItem("cart") || "[]",
      );
      let itemExists = existingCartItems.some(
        (item: CartItem) => item._id === product._id,
        toast({
          variant: "destructive",
          description: "This product uploaded already!",
        }),
      );

      if (!itemExists) {
        const updatedCartItems = [...existingCartItems, product];
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
        setCartItems(updatedCartItems);
        toast({
          variant: "default",
          description: "Product Added to cart successfully!",
        });
      }
    } else {
      toast({
        variant: "default",
        description: "login to add products to cart",
        action: (
          <SignedOut>
            <ToastAction altText="Goto schedule to undo">
              <SignInButton mode="modal" />
            </ToastAction>
          </SignedOut>
        ),
      });
    }
  }

  function removeFromCart(index: number) {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    toast({
      variant: "default",
      description: "Product removed successfully!",
    });
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
