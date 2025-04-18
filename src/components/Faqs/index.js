import { faqs } from "@/helpers/data"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


export default function FAQs() {
    return (
        <div className="w-full max-w-[1200px] mx-auto flex flex-col justify-center items-center gap-4 px-2 py-16">
            <span className="font-poppins text-cs-green text-4xl font-bold">FAQs</span>
            <div className="w-full flex flex-col gap-2 mt-4">
                {
                    faqs && faqs?.length && faqs.map((faq, index) => (
                        <Accordion type="single" collapsible className="bg-cs-blue-dark py-1 px-4 rounded-xl">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-cs-white hover:no-underline cursor-pointer font-poppins">{faq?.question}</AccordionTrigger>
                                <AccordionContent className="text-cs-gray font-poppins">
                                    {faq?.answer}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))
                }
            </div>
        </div>
    )
}