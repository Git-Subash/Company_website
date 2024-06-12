"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import { Doc } from "../../../../convex/_generated/dataModel";

interface ProductDialogProps {
  file: (Doc<"products"> & { urls: string[] }) | undefined;
}

export default function ProductView({ file }: ProductDialogProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <DialogContent className="h-full max-w-6xl">
        <ScrollArea className="h-[800px]">
          <div className="flex w-full flex-col p-4">
            <Carousel
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              className="group w-full"
            >
              <CarouselContent
                className="mx-auto"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {file?.urls?.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className="embla__slide cursor-grab pl-1 active:cursor-grabbing"
                  >
                    <AspectRatio ratio={16 / 9} className="">
                      <Card className="p-4">
                        <div className="aspect-square">
                          <Image
                            alt="Product image"
                            className="rounded-lg object-cover"
                            src={image}
                            fill
                          />
                        </div>
                      </Card>
                    </AspectRatio>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="mt-5 flex flex-wrap gap-5">
                {file?.urls?.map((image, index) => (
                  <Image
                    key={index}
                    alt="Product image"
                    className="aspect-square rounded-lg object-cover hover:scale-105"
                    src={image}
                    width={80}
                    height={80}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            <DialogHeader className="max-w-sm py-4 text-start">
              <div>
                <p className="pt-6 text-2xl">{file?.price} $</p>
                <div className="flex gap-1 py-2">
                  <Badge className="first-letter:capitalize">Obj</Badge>
                  <Badge className="first-letter:capitalize">Fbx</Badge>
                  <Badge className="first-letter:capitalize">Cad</Badge>
                </div>
              </div>
              <DialogTitle className="py-2 text-3xl">{file?.name} </DialogTitle>
              <DialogDescription>{file?.description}</DialogDescription>
              <div className="flex gap-4 py-4">
                <Button>Buy</Button>
                <Button>Add to cart </Button>
              </div>
            </DialogHeader>
          </div>
        </ScrollArea>
      </DialogContent>
    </>
  );
}
