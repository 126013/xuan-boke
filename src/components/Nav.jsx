import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#home', label: '首页' },
  { href: '#journey', label: '经历' },
  { href: '#works', label: '作品' },
  { href: '#awards', label: '证书' },
  { href: '#games', label: '游戏' },
  { href: '#photos', label: '拍摄' },
  { href: '#about', label: '关于' },
  { href: '#contact', label: '联系' }
]

export default function Nav({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  // 滚动进度条（大纲效果 8）
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav className="glass relative mx-auto flex max-w-6xl items-center justify-between gap-4 overflow-hidden rounded-2xl px-5 py-3 shadow-glass">
        <a href="#home" className="flex shrink-0 items-center gap-2 font-semibold tracking-wide">
          <span className="text-primary">✦</span>
          <span>贾静瑄</span>
        </a>

        <ul className="hidden items-center gap-5 text-sm lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-ink-600 transition-colors hover:text-primary dark:text-ink-400 dark:hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="切换主题"
            className="grid h-9 w-9 place-items-center rounded-xl border border-black/5 bg-white/60 text-lg transition hover:scale-105 dark:border-white/10 dark:bg-white/5"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ y: -8, opacity: 0, rotate: -30 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 8, opacity: 0, rotate: 30 }}
                transition={{ duration: 0.25 }}
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="菜单"
            className="grid h-9 w-9 place-items-center rounded-xl border border-black/5 bg-white/60 lg:hidden dark:border-white/10 dark:bg-white/5"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>

        {/* 滚动进度条 */}
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-transparent">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mx-auto mt-2 grid max-w-6xl grid-cols-2 gap-1 rounded-2xl p-3 text-sm lg:hidden"
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 text-ink-600 hover:bg-black/5 dark:text-ink-400 dark:hover:bg-white/10"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
