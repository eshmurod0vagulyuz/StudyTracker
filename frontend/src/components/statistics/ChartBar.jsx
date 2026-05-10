export default function ChartBar({ data = [], maxValue }) {
  const max = maxValue || Math.max(...data.map((d) => d.value), 1)
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-lg transition-all duration-700"
            style={{
              height: `${(item.value / max) * 100}%`,
              backgroundColor: item.color || '#2E7D32',
              minHeight: item.value > 0 ? 4 : 0,
            }}
          />
          <span className="text-[10px] text-gray-400 font-semibold">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
