import * as React from "react";

import { cn } from "@/src/shared/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type: _type = "password", error, ...props }, ref) => {
    const [type, setType] = React.useState(_type);

    const handleShowPassword = () => {
      setType((prevType) => (prevType === "password" ? "text" : "password"));
    };

    return (
      <div className={cn("", className)}>
        <div className="flex h-10 w-full rounded-md border border-input bg-background text-base focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
          <input
            type={type}
            className="grow px-3 py-2 file:border-0 file:bg-transparent rounded-l-md bg-background file:text-sm ring-offset-background file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            ref={ref}
            {...props}
          />
          <button
            type="button"
            className="px-3 bg-background rounded-r-md border-l"
            onClick={handleShowPassword}
          >
            {type === "password" && <Eye />}
            {type === "text" && <EyeOff />}
          </button>
        </div>
        {error && <p className="text-xs text-destructive mt-1">{error}</p>}
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
