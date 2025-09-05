import Spinner from "./spinner";
import { cn } from "@/lib/utils";

type FallbackProps = {
  className?: string;
}

export function Fallback( { className }: FallbackProps ) {
  return (
    <section
      className={cn(
        "absolute left-0 top-0 w-full h-full flex justify-center items-center",
        "transition-colors duration-300",
        className
      )}
    >
      <Spinner />
    </section>
  );
}
