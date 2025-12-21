import { cn } from "@/lib/utils";
import type { TransformFunctions } from "@/utils/form";
import { forwardRef, type InputHTMLAttributes } from "react";
import { Spinner } from "./spinner";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  suffix?: string;
  onInputChange: (event: string) => void;
  transform: TransformFunctions;
  loading: boolean;
}

export const CurrencyInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      onInputChange,
      transform,
      label,
      error,
      suffix,
      loading = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="flex items-center justify-between border-b w-full">
          {loading && <Spinner className="size-10" />}
          <input
            type={type}
            className={cn(
              "h-10 text-sm outline-0 w-75",
              "placeholder:text-muted-foreground",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "text-3xl font-bold",
              error && "border-red-500 focus-visible:ring-red-500",
              className
            )}
            ref={ref}
            {...props}
            onChange={(e) => onInputChange(transform.type(e))}
            onBlur={(e) => onInputChange(transform.output(e))}
            onFocus={(e) => onInputChange(transform.input(e))}
          />
          <p className="text-gray-400 text-xs text-right w-40">{suffix}</p>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);
