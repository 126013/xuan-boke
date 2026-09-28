import { useEffect, useState } from 'react'
import { profile } from '../data/site.js'

const badges = [
  { name: 'React 18', color: 'text-sky-600 dark:text-sky-400' },
  { name: 'Vite 5', color: 'text-purple-600 dark:text-purple-400' },
  { name: 'Tailwind 3', color: 'text-teal-700 dark:text-teal-400' },
  { name: 'Framer Motion', color: 'text-pink-600 dark:text-pink-400' }
]

export default function SiteDashboard() {
  const [timeStr, setTimeStr] = useState('00:00:00')
  const [uptimeStr, setUptimeStr] = useState('0天 0小时')

  useEffect(() => {
    const START = new Date(profile.buildDate).getTime()
    const update = () => {
      const now = new Date()
      setTimeStr(
        now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
      )
      const diff = now.getTime() - START
      const days = Math.floor(diff / 86400000)
      const hours = Math.floor((diff / 3600000) % 24)
      setUptimeStr(`${days}天 ${hours}小时`)
    }
    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="glass flex h-auto min-h-[5rem] flex-col items-stretch overflow-hidden rounded-3xl shadow-glass md:flex-row">
      {/* 翻页时钟 */}
      <div className="relative flex items-center justify-center overflow-hidden bg-slate-900 px-8 py-3 font-mono text-2xl font-black tracking-widest text-white shadow-inner transition-colors md:py-0 md:text-3xl dark:bg-black">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        <span className="transition-colors group-hover:text-primary">{timeStr}</span>
        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/25 dark:bg-black/60" />
      </div>

      <div className="flex flex-1 flex-wrap items-center justify-between gap-5 px-8 py-4 text-xs font-bold text-ink-600 md:py-4 md:text-sm dark:text-ink-400">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span>
            小宇宙已运行：
            <span className="font-black text-primary">{uptimeStr}</span>
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          {badges.map((b) => (
            <span
              key={b.name}
              className={`flex items-center gap-1.5 rounded-md border border-black/5 bg-white/50 px-2.5 py-1.5 shadow-sm dark:border-white/10 dark:bg-white/5 ${b.color}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {b.name}
            </span>
          ))}
        </div>

        <span className="border-b border-dashed border-black/20 pb-0.5 transition hover:text-primary dark:border-white/20">
          © 2026 December_瑄 · 星际无限流
        </span>
      </div>
    </div>
  )
}
