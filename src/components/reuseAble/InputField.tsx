import { inputClass } from "@/components/deal/SaveDealModal";
import { useEffect, useRef, useState } from "react";

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  type?: string;
  note?: string;
  disabled?: boolean;
  isNumeric?: boolean; // NEW
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
  type = "text",
  note,
  disabled = false,
  isNumeric = true,
}) => {
  const [localValue, setLocalValue] = useState(String(value));
  const isFocused = useRef(false);

  useEffect(() => {
    if (!isFocused.current) {
      setLocalValue(String(value));
    }
  }, [value]);

  const sanitizeNumeric = (raw: string) => {
    // 1. strip anything that's not a digit or a dot
    let cleaned = raw.replace(/[^0-9.]/g, "");
    // 2. allow only ONE decimal point
    const firstDot = cleaned.indexOf(".");
    if (firstDot !== -1) {
      cleaned =
        cleaned.slice(0, firstDot + 1) +
        cleaned.slice(firstDot + 1).replace(/\./g, "");
    }
    return cleaned;
  };

  const handleChange = (raw: string) => {
    const finalValue = isNumeric ? sanitizeNumeric(raw) : raw;
    setLocalValue(finalValue);
    onChange(finalValue);
  };

  return (
    <div>
      <label className={inputClass.label}>
        {label}
        {note && (
          <span className="text-[#6A7282] font-normal ml-1">({note})</span>
        )}
      </label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-[#6A7282] text-sm select-none">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={localValue}
          onFocus={() => {
            isFocused.current = true;
          }}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            // block letters/symbols at the keystroke level too (nice UX, not required)
            if (
              isNumeric &&
              !/[0-9.]/.test(e.key) &&
              ![
                "Backspace",
                "Delete",
                "ArrowLeft",
                "ArrowRight",
                "Tab",
                "Home",
                "End",
              ].includes(e.key)
            ) {
              e.preventDefault();
            }
          }}
          onBlur={() => {
            isFocused.current = false;
            setLocalValue(String(value));
          }}
          placeholder={placeholder}
          className={`${inputClass.input} ${prefix ? "pl-7" : "pl-3"} ${
            disabled ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          disabled={disabled}
        />
        {suffix && (
          <span className="absolute right-3 text-[#6A7282] text-xs">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
