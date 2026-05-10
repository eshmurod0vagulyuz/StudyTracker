export default function AchievementBadge({ achievement, earned = false }) {
  return (
    <div className={`flex flex-col items-center gap-2 p-3 rounded-2xl ${earned ? 'bg-primary/10' : 'bg-gray-100 opacity-50'}`}>
      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${earned ? 'bg-primary/20' : 'bg-gray-200'}`}>
        {achievement.badge_icon || '🏆'}
      </div>
      <div className="text-center">
        <p className={`text-xs font-bold ${earned ? 'text-primary' : 'text-gray-400'}`}>{achievement.title}</p>
        {earned && <p className="text-[10px] text-gray-400 mt-0.5">Earned!</p>}
      </div>
    </div>
  )
}
