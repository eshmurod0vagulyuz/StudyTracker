// Button.jsx
export function Button({ children, onClick, variant = 'primary', className = '', disabled, type = 'button' }) {
  const base = 'font-bold rounded-2xl py-4 w-full text-base active:scale-95 transition-all duration-150 disabled:opacity-50'
  const variants = {
    primary: 'bg-primary text-white shadow-md shadow-primary/30',
    outline: 'border-2 border-primary text-primary bg-transparent',
    ghost: 'text-primary bg-primary/10',
    danger: 'bg-red-500 text-white',
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}
