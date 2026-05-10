export function ProgressBar({ value = 0, color = 'bg-primary', className = '' }) {
  return (
    <div className={`w-full bg-gray-100 rounded-full h-2.5 overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-700 ${color}`}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  )
}

export function Badge({ children, color = '#2E7D32' }) {
  return (
    <span
      className="text-xs font-bold px-2.5 py-1 rounded-full"
      style={{ backgroundColor: color + '20', color }}
    >
      {children}
    </span>
  )
}
