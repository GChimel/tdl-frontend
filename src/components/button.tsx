import { cn } from "@/lib/cn";
import Link from "next/link";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, isLoading, href, target, rel, children, ...props }, ref) => {
    const baseStyles =
      "w-full px-3 py-2 rounded bg-primary text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition disabled:opacity-50 flex items-center hover:bg-blue-700 cursor-pointer justify-center";

    const styles = cn(baseStyles, className);

    if (href) {
      return (
        <Link href={href} className={styles} target={target} rel={rel}>
          {isLoading ? (
            <div className="mr-2 h-4 w-4 animate-spin rounded-md border-2 border-current border-t-transparent" />
          ) : null}
          {children}
        </Link>
      );
    }

    return (
      <button
        className={styles}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-md border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
