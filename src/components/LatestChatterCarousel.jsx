import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { chatters } from '../data/site.js'

export default function LatestChatterCarousel() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (fn) => {
    setDir(fn)
    setI((v) => (v + fn + chatters.length) % chatters.length)
  }

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1)
      setI((v) => (v + 1) % chatters.length)
    }, 7000)
    return () => clearInterval(t)
  }, [])

  const c = chatters[i]

  return (
    <div className="glass relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-3xl shadow-glass">
      <div className="flex items-center justify-between px-7 pt-6">
        <h3 className="text-sm font-black uppercase tracking-widest text-ink-400">最新杂谈</h3>
        <a href="#/chatter" className="text-xs font-bold text-primary transition hover:opacity-70">
          全部 →
        </a>
      </div>

      <div className="relative flex-1 px-7 pb-5 pt-4">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={c.id}
            initial={{ opacity: 0, x: dir * 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -36 }}
            transition={{ duration: 0.35 }}
            className="flex h-full items-start gap-5"
          >
            <div className={`h-[4.5rem] w-[4.5rem] shrink-0 rounded-2xl bg-gradient-to-tr ${c.cover} shadow-lg`} />
            <div className="min-w-0">
              <h4 className="text-base font-bold text-fg">{c.title}</h4>
              <p className="mt-2 line-clamp-2 text-sm text-ink-400">{c.description}</p>
              <span className="mt-2 inline-block text-xs text-ink-400">{c.date}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between px-7 pb-5">
        <div className="flex gap-1.5">
          {chatters.map((_, d) => (
            <span
              key={d}
              className={`h-1.5 rounded-full transition-all ${
                d === i ? 'w-5 bg-primary' : 'w-1.5 bg-black/15 dark:bg-white/20'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => go(-1)}
            aria-label="上一条"
            className="grid h-8 w-8 place-items-center rounded-full border border-black/5 bg-white/50 text-sm transition hover:text-primary dark:border-white/10 dark:bg-white/5"
          >
            ‹
          </button>
          <button
            onClick={() => go(1)}
            aria-label="下一条"
            className="grid h-8 w-8 place-items-center rounded-full border border-black/5 bg-white/50 text-sm transition hover:text-primary dark:border-white/10 dark:bg-white/5"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}
