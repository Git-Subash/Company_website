"use client";
import { Projects } from "@/utils/data";
import { cn } from "@/utils/utils";
import { useScroll } from "framer-motion";
import Lenis from "lenis";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import CardProp from "./CardProp";
import { buttonVariants } from "./ui/button";
import MaxWidthWrapper from "./WidthWrapper";

export default function ProjectCard() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start start", "end end"],
  });
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <MaxWidthWrapper>
      <div ref={container} className="">
        {Projects.map((item: project, index: number) => {
          const targetScale = 1 - (Projects.length - index) * 0.05;
          return (
            <CardProp
              key={index}
              i={index}
              {...item}
              progress={scrollYProgress}
              range={[index * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
      <div className="my-10 flex justify-end xl:mr-5">
        <Link
          href="/Projects"
          className={cn(
            "group",
            buttonVariants({ variant: "linkHover1", size: "lg" }),
          )}
        >
          Explore Projects
          <span className="group-hover:translate-x-100 w-0 translate-x-[0%] pl-0 pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:pl-3 group-hover:pr-3 group-hover:opacity-100">
            <MoveRight />
          </span>
        </Link>
      </div>
    </MaxWidthWrapper>
  );
}
