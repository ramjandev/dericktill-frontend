import { fmt } from "./Helpers";
interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}
const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-md px-3 py-2 text-xs">
      <p className="font-medium text-zinc-700 dark:text-zinc-200 mb-1">
        {label}
      </p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="tabular-nums">
          {p.name}: {fmt(p.value)}
        </p>
      ))}
    </div>
  );
};

export default CustomTooltip;
