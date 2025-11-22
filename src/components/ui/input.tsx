import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
  invalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, invalid, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState<boolean>(false);

    return (
      <div className="relative">
        <input
          type={type === "password" ? (isVisible ? "text" : "password") : type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            { "focus-visible:ring-error": invalid },
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <PasswordToggleButton
            isVisible={isVisible}
            toggleVisibility={() => setIsVisible((prev) => !prev)} // Directly passing toggle function
          />
        )}
      </div>
    );
  }
);

interface PasswordToggleButtonProps {
  isVisible: boolean;
  toggleVisibility: () => void;
}

function PasswordToggleButton({
  isVisible,
  toggleVisibility,
}: PasswordToggleButtonProps) {
  return (
    <button
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      type="button"
      onClick={toggleVisibility}
      aria-label={isVisible ? "Hide Password" : "Show Password"}
    >
      {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
    </button>
  );
}

Input.displayName = "Input";

export { Input };
