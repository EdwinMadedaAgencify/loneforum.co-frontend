import { cn } from "@/lib/utils";
import React from "react";

export interface SupportingTxtProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  intent?: "default" | "error" | "success";
}

const SupportingTxt: React.FC<SupportingTxtProps> = ({
  className,
  children,
  intent = "default",
  ...props
}) => {
  return (
    <p
      className={cn(
        "text-sm/6",
        { "text-gray-500": intent === "default" },
        { "text-error": intent === "error" },
        { "text-success": intent === "success" },
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export default SupportingTxt;
