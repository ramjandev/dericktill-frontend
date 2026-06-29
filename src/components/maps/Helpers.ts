const fmt = (v: number) => "$" + v.toLocaleString("en-US");

const pctDelta = (a: number, b: number) => {
  const d = Math.round(((a - b) / b) * 100);
  return { display: (d >= 0 ? "+" : "") + d + "%", positive: d >= 0 };
};

export { fmt, pctDelta };
