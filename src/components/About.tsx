import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import WhatWeDo from "./WhatWeDo";
import Faq from "./Faq";

const AccordionItems = [
  {
    name: "Gokul",
    occupation: "Civil Engineer,Designer",
    value: " item-1",
    description:
      " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi veniam, laboriosam obcaecati expedita veritatis totam perferendis molestias voluptatem delectus voluptas fugit nemo fuga est odio distinctio modi quam optio pariatur!",
    img: "/image3.png",
  },
  {
    name: "sasi",
    occupation: "Civil Engineer,Designer",
    value: " item-2",
    description:
      " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi veniam, laboriosam obcaecati expedita veritatis totam perferendis molestias voluptatem delectus voluptas fugit nemo fuga est odio distinctio modi quam optio pariatur!",
    img: "/image3.png",
  },
  {
    name: "subash",
    occupation: "Civil Engineer,Designer",
    value: " item-3",
    description:
      " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi veniam, laboriosam obcaecati expedita veritatis totam perferendis molestias voluptatem delectus voluptas fugit nemo fuga est odio distinctio modi quam optio pariatur!",
    img: "/image3.png",
  },
];

export default function About() {
  return (
    <section
      className="flex scroll-m-56 flex-col items-center justify-center"
      id="About"
    >
      <div className="flex max-w-6xl flex-col justify-center gap-8">
        <h1 className="text-center text-2xl font-extrabold text-muted-foreground md:text-4xl xl:text-5xl">
          Designing Your Dream Spaces
        </h1>
        <p className="text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. A dicta,
          neque optio possimus cumque consectetur quae, rerum aperiam magni,
          aspernatur ipsa veritatis? Perferendis quo sit, magni fugit modi ullam
          voluptatibus.
        </p>
        {/* </div> */}
        <div className="w-full">
          {/* <AspectRatio ratio={19 / 9}>
            <Image
              src="/int.png"
              quality={100}
              alt="Photo by Drew Beamer"
              fill
              className="rounded-lg object-cover object-top"
            />
          </AspectRatio> */}
        </div>

        <WhatWeDo />
        <div className="py-10">
          <h1 className="py-10 text-lg font-bold">Team</h1>
          <Accordion type="single" collapsible className=" ">
            {AccordionItems.map((item) => (
              <AccordionItem key={item.name} value={item.value}>
                <AccordionTrigger>
                  {item.name}
                  <span>{item.occupation}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <Image
                    src={item.img}
                    alt="Photo by Drew Beamer"
                    className="rounded-lg py-8"
                    width={200}
                    height={500}
                  />

                  <p className="text-xs">{item.description}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <Faq />
      </div>
    </section>
  );
}
