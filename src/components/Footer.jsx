import { motion } from 'framer-motion'

export default function Footer() {
  // 回到顶部：带加速感的平滑滚动
  const toTop = () => {
    const startY = window.scrollY
    if (startY === 0) return
    const duration = 620
    const t0 = performance.now()
    const step = (now) => {
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      window.scrollTo(0, Math.round(startY * (1 - eased)))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  return (
    <footer className="border-t border-black/5 px-2 py-12 dark:border-white/10 sm:px-3">
      <div className="mx-auto flex w-full flex-col items-center justify-between gap-6 text-xs text-ink-400 sm:flex-row">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          © 2026 December_瑄 · 示例数据，可自行替换
        </motion.span>
        <button
          onClick={toTop}
          className="rounded-full border border-black/10 px-4 py-2 transition hover:text-primary dark:border-white/10"
        >
          回到顶部 ↑
        </button>
      </div>
    </footer>
  )
}
