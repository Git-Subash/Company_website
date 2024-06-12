import { faqArry } from "@/utils/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function Faq() {
  return (
    <div className="w-full py-20">
      <h1 className="py-10 text-2xl font-extrabold text-secondary-foreground md:text-4xl xl:text-5xl">
        FAQ
      </h1>
      {faqArry.map((item) => (
        <Accordion
          key={item.value}
          type="single"
          className="max-w-2xl"
          collapsible
        >
          <AccordionItem value={item.value}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>
              <p className="max-w-xl text-xs tracking-wider">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
