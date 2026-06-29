import type { ZipFMR } from "@/store/features/property/types/hud";
import { useMemo, useState } from "react";
import { useDebounce } from "../common/custom/useDebounce";
import CommonHeader from "../common/header/CommonHeader";
import { fmt } from "./Helpers";

interface ZipTableProps {
  rows: ZipFMR[];
  targetZip: string;
}
const ZipTable: React.FC<ZipTableProps> = ({ rows, targetZip }) => {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 500);
  const filtered = useMemo(
    () => rows.filter((r) => r.zipCode.includes(debounced.trim())),
    [rows, debounced],
  );

  return (
    <div className="bg-white  border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border ">
        <CommonHeader size="md" className="">
          All ZIP codes · LA County
        </CommonHeader>
        <div className="relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ZIP..."
            className="pl-7 pr-3 py-1.5 text-xs border border-border  rounded-lg bg-zinc-50  text-zinc-800  placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-400 w-40"
          />
        </div>
      </div>
      <div className="overflow-auto max-h-80">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-zinc-50  sticky top-0">
              {["ZIP", "Studio", "1 BR", "2 BR", "3 BR", "4 BR"].map((h) => (
                <th
                  key={h}
                  className={`px-5 py-2.5 text-zinc-400 font-medium border-b border-border  ${
                    h === "ZIP" ? "text-left" : "text-right"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((z) => {
              const isTarget = z.zipCode === targetZip;
              return (
                <tr
                  key={z.zipCode}
                  className={`border-b border-zinc-100  transition-colors ${
                    isTarget ? "bg-blue-50 " : "hover:bg-zinc-50 "
                  }`}
                >
                  <td className="px-5 py-2 text-left font-medium text-zinc-800 ">
                    {z.zipCode}
                    {isTarget && (
                      <span className="ml-2 inline-block bg-blue-100  text-blue-600  text-[10px] px-2 py-0.5 rounded-full">
                        this ZIP
                      </span>
                    )}
                  </td>
                  {[
                    z.studio,
                    z.oneBedroom,
                    z.twoBedroom,
                    z.threeBedroom,
                    z.fourBedroom,
                  ].map((v, i) => (
                    <td
                      key={i}
                      className={`px-5 py-2 text-right tabular-nums ${
                        isTarget ? "text-blue-600 " : "text-zinc-500 "
                      }`}
                    >
                      {fmt(v)}
                    </td>
                  ))}
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-6 text-center text-zinc-400">
                  No ZIP codes match "{search}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ZipTable;
