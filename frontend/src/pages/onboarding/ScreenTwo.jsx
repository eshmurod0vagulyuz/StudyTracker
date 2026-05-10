import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

function OnboardingLayout({ icon, title, description, step, total, onNext, nextLabel = 'Continue', onSkip }) {
  return (
    <div className="min-h-dvh flex flex-col bg-primary">
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-white text-center pt-16">
        <div className="w-24 h-24 rounded-full border-2 border-white/40 flex items-center justify-center text-5xl mb-8">
          {icon}
        </div>
        <h1 className="font-display font-bold text-2xl mb-3 leading-tight">{title}</h1>
        <p className="text-white/80 text-sm leading-relaxed">{description}</p>
        <div className="flex gap-2 mt-10">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all ${i === step - 1 ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} />
          ))}
        </div>
      </div>
      <div className="px-6 pb-10 flex flex-col gap-3">
        <Button onClick={onNext} className="bg-white text-primary">{nextLabel}</Button>
        {onSkip && <button onClick={onSkip} className="text-white/70 text-sm font-semibold py-2">Skip</button>}
      </div>
    </div>
  )
}

export default function ScreenTwo() {
  const navigate = useNavigate()
  return (
    <OnboardingLayout
      icon="🎯"
      title="Track Your Progress"
      description="Monitor your daily tasks, weekly achievements, and maintain your study streak with detailed statistics."
      step={2} total={3}
      onNext={() => navigate('/onboarding/3')}
      onSkip={() => { localStorage.setItem('onboarded', '1'); navigate('/login') }}
    />
  )
}
