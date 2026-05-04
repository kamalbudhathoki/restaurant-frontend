import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// forwardRef lets parent components get the ref to the actual <input>
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-3 py-2 rounded-lg border text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${error ? "border-red-400" : "border-gray-300"}
            ${className}
          `}
          {...rest}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;