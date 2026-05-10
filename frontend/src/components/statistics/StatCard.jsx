export default function StatCard({ title, value, icon, color = '#2E7D32', subtitle }) {
  return (
    <div className="rounded-2xl p-4 flex items-center gap-3" style={{ backgroundColor: color }}>
      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl flex-shrink-0">
        {icon}
      </div>
      <div className="text-white">
        <p className="text-2xl font-display font-bold leading-none">{value}</p>
        <p className="text-sm font-semibold opacity-90 mt-0.5">{title}</p>
        {subtitle && <p className="text-xs opacity-70 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  )
}
