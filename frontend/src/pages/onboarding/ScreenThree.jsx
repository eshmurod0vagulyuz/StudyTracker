import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export default function ScreenThree() {
  const navigate = useNavigate()
  const handleStart = () => {
    localStorage.setItem('onboarded', '1')
    navigate('/login')
  }
  return (
    <div className="min-h-dvh flex flex-col bg-primary">
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-white text-center pt-16">
        <div className="w-24 h-24 rounded-full border-2 border-white/40 flex items-center justify-center text-5xl mb-8">
          🏆
        </div>
        <h1 className="font-display font-bold text-2xl mb-3 leading-tight">Achieve Your Goals</h1>
        <p className="text-white/80 text-sm leading-relaxed">
          Stay motivated with achievements, streaks, and a clear view of your academic success journey.
        </p>
        <div className="flex gap-2 mt-10">
          {[0,1,2].map((i) => (
            <div key={i} className={`h-2 rounded-full ${i === 2 ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} />
          ))}
        </div>
      </div>
      <div className="px-6 pb-10">
        <Button onClick={handleStart} className="bg-white text-primary">Get Started</Button>
      </div>
    </div>
  )
}
