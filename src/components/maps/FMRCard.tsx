import { fmt, pctDelta } from "./Helpers";

interface FMRCardProps {
  label: string;
  value: number;
  msaValue: number;
  highlight?: boolean;
}

const FMRCard: React.FC<FMRCardProps> = ({
  label,
  value,
  msaValue,
  highlight,
}) => {
  const { display, positive } = pctDelta(value, msaValue);
  return (
    <div
      className={`rounded-xl border p-4 transition-all ${
        highlight ? "border-blue-400 bg-blue-50 " : "border-border  bg-white d"
      }`}
    >
      <p
        className={`text-xs font-medium mb-1 ${
          highlight ? "text-blue-500 " : "text-zinc-400"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-xl font-medium tabular-nums ${
          highlight ? "text-blue-700 " : "text-zinc-900 "
        }`}
      >
        {fmt(value)}
      </p>
      <p
        className={`text-xs mt-1 ${
          positive ? "text-emerald-600 " : "text-red-500 "
        }`}
      >
        {display} vs MSA
      </p>
    </div>
  );
};

export default FMRCard;
