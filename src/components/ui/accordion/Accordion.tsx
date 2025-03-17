import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import React, { forwardRef } from "react";

export const accordionColorTrigger = (status: string): string => {
  const colorMap: Record<string, string> = {
    VALUATION_NEW: "from-[slategray]/10 to-[slategray]/30 text-[slategray]",
    VALUATION_DRAFT: "from-yellow-50 to-yellow-100 text-yellow-800",
    READY_FOR_VISIT: "from-blue-50 to-blue-200 text-blue-600",
    VISIT_DELAYED: "from-red-50 to-red-200 text-red-700",
    VISIT_COMPLETED: "from-[teal]/10 to-[teal]/30 text-[teal]",
    REPORT_DELAYED: "from-[gold]/10 to-[gold]/20 text-gray-600",
    VALUATION_COMPLETED: "from-green-100 to-green-200 text-green-700",
    VALUATION_DELETED: "bg-[crimson]",
    VALUATION_CANCELLED: "from-black/10 to-black/20 text-black",
  };

  return `bg-gradient-to-r ${colorMap[status] || "bg-green-700 text-black"}`;
};

type Ref = HTMLDivElement;

interface AccordionProps {
  className: string;
  type: "multiple";
  children: React.ReactNode;
}

// const Accordion = AccordionPrimitive.Root
const Accordion = ({ className, children, type }: AccordionProps) => {
  return (
    <AccordionPrimitive.Root className={className} type={type}>
      {children}
    </AccordionPrimitive.Root>
  );
};

interface AccordionItemProps extends AccordionPrimitive.AccordionItemProps {
  classnames?: string;
}

const AccordionItem = forwardRef<Ref, AccordionItemProps>((props, ref) => {
  const { classnames } = props;
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={`bg-accent border-b border-x border-gray-400 rounded mb-1 ${classnames}`}
      {...props}
    />
  );
});
AccordionItem.displayName = "AccordionItem";

interface AccordionTriggerProps
  extends AccordionPrimitive.AccordionTriggerProps {
  headerclassnames?: string;
  headertextclassnames?: string;
  className?: string;
}

type ButtonRef = HTMLButtonElement;

const AccordionTrigger = forwardRef<ButtonRef, AccordionTriggerProps>(
  (props, ref) => {
    const {
      headerclassnames: headerClassNames,
      headertextclassnames,
      children,
      className,
    } = props;

    return (
      <AccordionPrimitive.Header
        className={`flex rounded px-2 text-xs ${headerClassNames}`}
      >
        <AccordionPrimitive.Trigger
          ref={ref}
          className={`text-${headertextclassnames} flex flex-1 items-center justify-between p-1 mt-1 font-medium transition-all [&[data-state=open]>svg]:rotate-180 ${className}`}
          {...props}
        >
          {children}
          {
            <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200 hover:bg-gray-700 rounded-xl" />
          }
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  }
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

interface AccordionContentProps
  extends AccordionPrimitive.AccordionContentProps {
  className?: string;
}

const AccordionContent = React.forwardRef<Ref, AccordionContentProps>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className=" overflow-hidden text-xs pe-0 pb-1 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn(`p-4 pt-0`, className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };

