import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CommonHeader from "../common/header/CommonHeader";
import CustomTooltip from "./CustomTooltip";

interface ChartDataPoint {
  name: string;
  "This ZIP": number;
  "MSA avg": number;
}

interface MapChartsProps {
  zipCode: string;
  chartData: ChartDataPoint[];
}

const MapCharts: React.FC<MapChartsProps> = ({ zipCode, chartData }) => {
  return (
    <div className="bg-white  border border-border  rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <CommonHeader size="md" className="">
          Rent by unit type · ZIP {zipCode} vs MSA average
        </CommonHeader>
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" />
            ZIP {zipCode}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-zinc-300 inline-block" />
            MSA avg
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} barGap={4} barCategoryGap="30%">
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#a1a1aa" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#a1a1aa" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="This ZIP" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="MSA avg" fill="#d4d4d8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MapCharts;
