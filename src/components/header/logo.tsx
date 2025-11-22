import { cn } from "@/lib/utils";
import { Link, To } from "react-router-dom";

export interface LogoProps extends React.HTMLAttributes<HTMLHeadElement> {
  to?: To;
  onClick?: () => void;
}

export default function Logo({ className, to = "/", onClick }: LogoProps) {
  return (
    <h1 className={cn("text-xl md:text-base xl:text-xl", className)}>
      <Link
        className=" font-black drop-shadow-[1px_1px_1px_rgba(24,48,16,1)]"
        to={to}
        onClick={onClick}
      >
        <span className="font-garlic text-primary">lone</span>
        <span className={`font-kolaka text-foreground`}>Forum.Co</span>
      </Link>
    </h1>
  );
}
