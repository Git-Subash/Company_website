import About from "@/components/About";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/craft";
import { cn } from "@/utils/utils";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  return (
    <Section>
      <Container>
        <div className="max-w-8xl relative mx-auto">
          <div className="flex flex-col justify-center py-20">
            <h1 className="text-center text-3xl font-semibold md:text-4xl xl:px-56">
              <Balancer ratio={1.0} preferNative={false}>
                Elevate Your Space,fibanacci provides Innovative Architecture &
                Design Solutions
              </Balancer>
            </h1>

            <Link
              href="#About"
              className={cn(
                "group relative mx-auto mt-8",
                buttonVariants({ variant: "default", size: "lg" }),
              )}
            >
              About Fibonacci
              <span className="group-hover:translate-x-100 w-0 translate-x-[0%] pl-0 pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:pl-3 group-hover:pr-3 group-hover:opacity-100">
                <MoveRight />
              </span>
            </Link>
          </div>

          <ProjectCard />
        </div>
        <About />
      </Container>
    </Section>
  );
}
