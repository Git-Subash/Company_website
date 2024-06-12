import { cn } from "@/utils/utils";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { buttonVariants } from "./ui/button";

export default function CardProp({
  i,
  img,
  id,
  description,
  title,
  progress,
  range,
  targetScale,
}: CardProps) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-36 mx-auto flex h-[100vh] items-center justify-center"
    >
      <motion.div
        key={id}
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
        className="relative w-full rounded-lg border bg-card text-card-foreground shadow-sm"
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, ease: "easeInOut" }}
          className="mx-auto pt-6 text-center text-4xl font-bold text-secondary-foreground lg:text-6xl"
        >
          {title}
        </motion.h1>
        <div className="relative flex w-full origin-top flex-col !rounded-xl lg:p-[50px]">
          <div className="mt-[50px] flex h-full flex-col gap-[50px] lg:flex-row">
            <div className="lg:top-[10%] lg:w-[60%]">
              <p className="p-[50px] pb-8 text-xs leading-snug first-letter:text-lg lg:p-0 lg:text-[16px] lg:first-letter:text-[28px]">
                {description}
              </p>
              <Link
                href="#About"
                className={cn(
                  "group ml-12 flex justify-start !px-0 md:scale-100 lg:ml-0 lg:mt-6",
                  buttonVariants({ variant: "linkHover1", size: "lg" }),
                )}
              >
                Learn more
                <span className="group-hover:translate-x-100 w-0 translate-x-[0%] pl-0 pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:pl-3 group-hover:pr-3 group-hover:opacity-100">
                  <MoveRight />
                </span>
              </Link>
            </div>
            <motion.div
              style={{ scale: imageScale }}
              className="inner relative w-full overflow-hidden rounded-lg lg:w-[60%]"
            >
              <div className="h-[500px] w-full">
                <Image
                  fill
                  className="rounded-xl object-cover"
                  src={img || "/img2.jpg"}
                  alt="Subash"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
