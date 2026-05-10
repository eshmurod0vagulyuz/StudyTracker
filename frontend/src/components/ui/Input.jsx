export function Input({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-semibold text-gray-600">{label}</label>}
      <input
        {...props}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-gray-50 font-medium"
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
