interface StatCardProps {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  delta,
  positive,
}) => {
  return (
    <div className="bg-white  border-border rounded-xl p-4">
      <p className="text-2xl font-medium text-zinc-900  tabular-nums">
        {value}
      </p>
      <p className="text-xs text-zinc-400 mt-1">{label}</p>
      <p
        className={`text-xs mt-2 font-medium ${
          positive ? "text-emerald-600 " : "text-red-500 "
        }`}
      >
        {positive ? "↑" : "↓"} {delta} vs MSA avg
      </p>
    </div>
  );
};
export default StatCard;
