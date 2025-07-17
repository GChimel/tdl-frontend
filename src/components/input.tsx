import { cn } from "@/lib/cn";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    const baseStyles =
      "w-full px-3 py-2 rounded bg-[#181C23] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary";

    return (
      <div className="w-full">
        <input
          className={cn(
            baseStyles,
            error && "border-red-400 focus:border-red-400 focus:ring-red-400",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
