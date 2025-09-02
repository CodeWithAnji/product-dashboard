import React from "react";
import { cn } from "./util.js";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-xl font-medium select-none " +
      "transition-all duration-200 ease-out disabled:opacity-50 disabled:pointer-events-none " +
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 " +
      "active:scale-[0.98] shadow-sm";

    const variants = {
      default:
        "text-white bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-orange-500 " +
        "hover:brightness-110",
      outline:
        "bg-white/70 backdrop-blur border border-indigo-200/70 hover:border-indigo-300 " +
        "text-indigo-700 hover:bg-white shadow-sm",
      destructive:
        "text-white bg-gradient-to-r from-rose-600 to-orange-600 hover:brightness-110",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 text-sm",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
