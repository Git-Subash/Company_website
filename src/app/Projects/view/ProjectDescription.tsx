"use clienr";
import Image from "next/image";

import { useScroll, useTransform, motion } from "framer-motion";

import { useRef } from "react";

export default function ProjectDescription({
  image,
}: {
  image: string | null;
}) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);
  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden "
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
      <div className="relative z-10 p-20 mix-blend-difference text-white w-full h-full flex flex-col justify-between "></div>
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full ">
        <motion.div style={{ y }} className=" w-full   h-full sticky ">
          <Image
            src={image || "/img2.png"}
            fill
            alt="image"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
