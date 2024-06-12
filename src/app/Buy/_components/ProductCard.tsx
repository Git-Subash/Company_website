"use client";
import { useCart } from "@/components/CartContex";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Doc } from "../../../../convex/_generated/dataModel";
import ProductView from "./ProductView";

type ProductCardProps = {
  file: Doc<"products"> & { urls: string[] };
};

export default function ProductCard({ file }: ProductCardProps) {
  const { addToCart } = useCart();

  function handleCart(product: ProductCardProps["file"]) {
    addToCart(product);
    console.log("Product added to cart:", product);
  }

  return (
    <>
      <div key={file?._id} className="flex flex-wrap">
        <Dialog>
          <Card className="sm:x-[300px] w-[400px] scale-90 lg:w-[400px]">
            <CardContent className="overflow-hidden pt-4">
              <AspectRatio ratio={30 / 19}>
                <Image
                  key={0}
                  alt="Product image"
                  className="aspect-square scale-110 object-cover"
                  src={file?.urls[0] || "/img.jpg"}
                  fill
                />
              </AspectRatio>

              <CardTitle className="flex w-full items-center justify-between pt-6">
                {file?.name} <h1 className="w-auto text-sm">{file?.price} $</h1>
              </CardTitle>
              <CardDescription className="inline-block w-[280px] overflow-hidden text-ellipsis text-nowrap py-4">
                {file?.description}
              </CardDescription>
              <div className="flex w-full items-end justify-between gap-4">
                <div className="flex gap-4">
                  <Button className="rounded-md bg-primary/90 hover:bg-primary/55">
                    Buy
                  </Button>
                  <Button
                    onClick={() => handleCart(file)}
                    className="rounded-md"
                  >
                    Add to cart
                  </Button>
                </div>

                <DialogTrigger asChild>
                  <Button
                    onClick={() => `/${file?._id}`}
                    variant="link"
                    size="sm"
                    className="text-xs"
                  >
                    View Product
                  </Button>
                </DialogTrigger>
              </div>
            </CardContent>
          </Card>
          <ProductView file={file} key={file?._id} />
        </Dialog>
      </div>
    </>
  );
}
