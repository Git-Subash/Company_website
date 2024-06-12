"use client";
import Image from "next/image";
import { Button } from "../../../components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useCart } from "@/components/CartContex";
import { CarTaxiFrontIcon, Frown, ShoppingCart, Trash } from "lucide-react";

export default function CartDrawer() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <DrawerContent className="h-4/5">
      <DrawerHeader className="drop-shadow-[0px_0px_20px_rgba(0,0,145,12)]"></DrawerHeader>

      <Card className="mx-auto">
        <CardHeader className="">
          {cartItems.length ? (
            <CardTitle className="flex items-center gap-2 tracking-wider">
              <ShoppingCart /> Cart
            </CardTitle>
          ) : (
            <CardTitle className="flex gap-2 tracking-wider">
              <Frown />
              Empty
            </CardTitle>
          )}
          <CardDescription>
            {cartItems.length === 1 ? "1 item" : `${cartItems.length} items`}{" "}
            added to cart
          </CardDescription>
        </CardHeader>

        <CardContent className="max-w-lg">
          <Table className="mx-auto]">
            <ScrollArea className="h-[400px] w-full">
              <TableHeader className="">
                <TableRow className="table-row">
                  <TableHead className="table-cell w-[100px]">Image</TableHead>
                  <TableHead>Name</TableHead>

                  <TableHead className="table-cell">Price</TableHead>

                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item, index) => (
                  <TableRow key={index} className="table-row w-full">
                    <TableCell className="table-cell">
                      <Image
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height={200}
                        src={"/img2.jpg"}
                        width={200}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>

                    <TableCell className="table-cell">{item.price}</TableCell>
                    <TableCell className="table-cell">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full hover:scale-95"
                        onClick={() => removeFromCart(index)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </ScrollArea>
          </Table>
        </CardContent>
      </Card>

      <DrawerFooter className="mx-auto">
        <p>
          Total Price:{" "}
          {cartItems.reduce((total, item) => total + item.price, 0)}$
        </p>
        <div className="flex gap-4">
          <Button className="rounded-lg">Buy Now</Button>
          <DrawerClose className="w-full">
            <Button variant="outline" className="w-full rounded-lg">
              Cancel
            </Button>
          </DrawerClose>
        </div>
      </DrawerFooter>
    </DrawerContent>
  );
}
