"use client";

import { Input } from "@/components/ui/input";
import { forwardRef, useMemo, ChangeEvent } from "react";

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: number;
  onChange?: (value: number) => void;
}

/**
 * Currency input that:
 * - Only accepts numeric characters
 * - Auto-formats with thousand separators (Indonesian format: 50000 → 50.000)
 * - Returns raw number value
 */
const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value = 0, onChange, className, ...props }, ref) => {
    
    // Format number to Indonesian currency format (with . as thousand separator)
    const formatNumber = (num: number): string => {
      if (isNaN(num) || num === 0) return "";
      return num.toLocaleString("id-ID");
    };

    // Parse formatted string back to number
    const parseNumber = (str: string): number => {
      // Remove all non-digit characters
      const cleaned = str.replace(/\D/g, "");
      return cleaned ? parseInt(cleaned, 10) : 0;
    };

    // Derive display value from value prop
    const displayValue = useMemo(() => formatNumber(value), [value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      
      // Parse the numeric value
      const numericValue = parseNumber(inputValue);
      
      // Call onChange with raw number
      if (onChange) {
        onChange(numericValue);
      }
    };

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

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={className}
        {...props}
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
