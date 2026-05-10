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
