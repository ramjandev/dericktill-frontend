import { inputClass } from "./SaveDealModal";

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  type?: string;
  note?: string;
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
}) => {
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${inputClass.input} ${prefix ? "pl-7" : "pl-3"}`}
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
