import { AnimatePresence, motion } from 'framer-motion'

const options = [
  { key: 'dark', icon: '🌙', label: '夜幕模式' },
  { key: 'light', icon: '☀️', label: '白昼模式' },
  { key: 'system', icon: '💻', label: '跟随系统' }
]

export default function ThemeToggleBlock({ theme, themeMode, onToggleTheme }) {
  const mode = themeMode || theme
  const current = options.find((o) => o.key === mode) || options[0]
  const isDark = theme === 'dark'

  return (
    <button
      onClick={onToggleTheme}
      className="glass group relative flex h-full min-h-[260px] w-full flex-col items-center justify-center gap-5 overflow-hidden rounded-3xl shadow-glass transition-all duration-500 hover:scale-[1.02]"
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${
          isDark ? 'from-primary/15 to-accent/10' : 'from-accent/15 to-primary/10'
        }`}
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mode}
          initial={{ y: -24, opacity: 0, rotate: -40, scale: 0.7 }}
          animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
          exit={{ y: 24, opacity: 0, rotate: 40, scale: 0.7 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="text-6xl drop-shadow-[0_0_18px_rgb(var(--c-glow)/0.45)]"
        >
          {current.icon}
        </motion.span>
      </AnimatePresence>
      <div className="relative z-10 text-center">
        <div className="text-base font-black text-fg">{current.label}</div>
        <div className="mt-1 text-xs text-ink-400">
          {mode === 'system' ? `当前系统为${theme === 'dark' ? '深色' : '浅色'} · 点击切换` : '点击切换主题'}
        </div>
      </div>
    </button>
  )
}
