"use client";

import { Input } from "@/components/ui/input";
import { forwardRef, ChangeEvent } from "react";

// Overloaded props for different usage modes
interface ControlledNumericInputProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
}

interface UncontrolledNumericInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value?: never;
}

type NumericInputProps = ControlledNumericInputProps | UncontrolledNumericInputProps;

/**
 * Numeric input that only accepts numeric characters.
 * 
 * Two usage modes:
 * 1. Controlled (with Controller): <NumericInput value={num} onChange={(n) => setNum(n)} />
 * 2. Uncontrolled (with register): <NumericInput {...register("field")} />
 */
const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  (props, ref) => {
    const isControlled = 'value' in props && typeof props.value === 'number';
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow: backspace, delete, tab, escape, enter, arrows
      const allowedKeys = [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
      ];

      // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      if (
        (e.ctrlKey || e.metaKey) &&
        ["a", "c", "v", "x"].includes(e.key.toLowerCase())
      ) {
        return;
      }

      // Allow navigation and control keys
      if (allowedKeys.includes(e.key)) {
        return;
      }

      // Block non-numeric keys
      if (!/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    };

    if (isControlled) {
      // Controlled mode - for use with Controller
      const { value, onChange, className, ...rest } = props as ControlledNumericInputProps;
      const displayValue = value === 0 ? "" : String(value);
      
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue === "" || /^\d+$/.test(inputValue)) {
          const numericValue = inputValue === "" ? 0 : parseInt(inputValue, 10);
          onChange(numericValue);
        }
      };

      return (
        <Input
          ref={ref}
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={className}
          {...rest}
        />
      );
    } else {
      // Uncontrolled mode - for use with register
      const { className, onChange, ...rest } = props as UncontrolledNumericInputProps;
      
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        // Only allow empty or numeric
        if (inputValue === "" || /^\d+$/.test(inputValue)) {
          if (onChange) {
            onChange(e);
          }
        } else {
          // Prevent the change by not calling onChange
          e.preventDefault();
        }
      };

      return (
        <Input
          ref={ref}
          type="text"
          inputMode="numeric"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={className}
          {...rest}
        />
      );
    }
  }
);

NumericInput.displayName = "NumericInput";

export { NumericInput };
