import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/utils";
import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CartDrawer from "./_components/CartDrawer";
import { useCart } from "@/components/CartContex";

export default function CartIcon() {
  const { cartItems } = useCart();
  return (
    <Drawer>
      <DrawerTrigger
        className={cn(
          "relative p-2",
          buttonVariants({ size: "icon", variant: "ghost" }),
        )}
      >
        <Badge className="absolute left-6 top-0 ml-auto flex h-5 w-1 shrink-0 items-center justify-center rounded-full">
          {cartItems.length}
        </Badge>
        <ShoppingCartIcon />
      </DrawerTrigger>
      <CartDrawer />
    </Drawer>
  );
}
