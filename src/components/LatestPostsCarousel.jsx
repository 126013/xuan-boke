import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { posts } from '../data/site.js'
import { useToast } from './ToastProvider.jsx'

export default function LatestPostsCarousel() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const showToast = useToast()

  const go = (fn) => {
    setDir(fn)
    setI((v) => (v + fn + posts.length) % posts.length)
  }

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1)
      setI((v) => (v + 1) % posts.length)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  const p = posts[i]

  return (
    <div className="glass relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-3xl shadow-glass">
      <div className="flex items-center justify-between px-7 pt-6">
        <h3 className="text-sm font-black uppercase tracking-widest text-ink-400">最新文章</h3>
        <a href="#/archive" className="text-xs font-bold text-primary transition hover:opacity-70">
          归档 →
        </a>
      </div>

      <div className="relative flex-1 px-7 pb-6 pt-4">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.button
            key={p.id}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.35 }}
            onClick={() => showToast(`《${p.title}》文章详情将在后续版本接入`)}
            className="block h-full w-full text-left"
          >
            <div className={`mb-5 h-32 w-full rounded-2xl bg-gradient-to-tr ${p.cover} shadow-lg`} />
            <h4 className="line-clamp-2 text-lg font-bold leading-snug text-fg transition group-hover:text-primary">
              {p.title}
            </h4>
            <p className="mt-2 line-clamp-2 text-sm text-ink-400">{p.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary"
                >
                  {t}
                </span>
              ))}
              <span className="ml-auto text-xs text-ink-400">
                {p.date} · {p.read} 阅读
              </span>
            </div>
          </motion.button>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between px-7 pb-6">
        <div className="flex gap-1.5">
          {posts.map((_, d) => (
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
            aria-label="上一篇"
            className="grid h-8 w-8 place-items-center rounded-full border border-black/5 bg-white/50 text-sm transition hover:text-primary dark:border-white/10 dark:bg-white/5"
          >
            ‹
          </button>
          <button
            onClick={() => go(1)}
            aria-label="下一篇"
            className="grid h-8 w-8 place-items-center rounded-full border border-black/5 bg-white/50 text-sm transition hover:text-primary dark:border-white/10 dark:bg-white/5"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}
