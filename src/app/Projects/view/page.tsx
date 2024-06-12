"use client";
import ImageCard from "@/components/ImageCard";
import MaxWidthWrapper from "@/components/WidthWrapper";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useQuery } from "convex/react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { api } from "../../../../convex/_generated/api";
import ProjectDescription from "./ProjectDescription";

export default function View() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const container = useRef(null);
  const files = useQuery(api.projects.getProjectFiles, {});

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });
  const { scrollXProgress } = useScroll({
    target: container,
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"]);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <section>
      {files?.map((item) => (
        <MaxWidthWrapper>
          {id === item._id && (
            <main>
              <div key={item._id} className="mt-20 h-screen overflow-hidden">
                <h1 className="relative z-10 max-w-[50vw] p-4 text-start text-8xl font-bold uppercase leading-none tracking-wide">
                  {item.name}
                </h1>

                <motion.div style={{ y }} className="relative h-full">
                  <Image
                    alt="Product image"
                    className="aspect-square object-cover object-center"
                    src={item.url || "/img2.jpg"}
                    fill
                  />
                </motion.div>
              </div>
              <div className="my-56 flex h-[50vh] flex-col items-center justify-between md:flex-row">
                <h1 className="border-2 p-4 text-3xl uppercase">
                  {item.projectType} Design
                </h1>
                <p className="max-w-[50vw] text-ellipsis border-l-2 p-4 text-center text-2xl font-bold uppercase leading-10 lg:text-4xl">
                  {item.description}
                </p>
              </div>
              <ProjectDescription image={item.url} />
            </main>
          )}
        </MaxWidthWrapper>
      ))}

      <p className="p-8 px-10 text-[5vw] font-bold uppercase tracking-wide mix-blend-difference">
        Explore
      </p>
      <ScrollArea
        ref={container}
        className="flex h-screen flex-row items-center justify-end gap-2 whitespace-nowrap p-6"
      >
        <div className="flex w-max space-x-4 p-4">
          {files?.map((file) => <ImageCard key={file._id} file={file} />)}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
