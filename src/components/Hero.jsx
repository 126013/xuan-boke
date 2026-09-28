import { motion } from 'framer-motion'

const entries = [
  { href: '#journey', label: '经历', icon: '🪐' },
  { href: '#works', label: '作品', icon: '🎨' },
  { href: '#awards', label: '证书', icon: '🏆' },
  { href: '#games', label: '游戏', icon: '🎮' },
  { href: '#photos', label: '拍摄', icon: '📷' },
  { href: '#contact', label: '联系', icon: '💌' }
]

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center px-4 pt-28">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-4 text-sm tracking-[0.3em] text-primary"
        >
          产品设计 · 大三在读
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          className="text-5xl font-extrabold leading-tight sm:text-6xl"
        >
          贾静瑄
          <span className="mt-3 block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            把想法做成看得见的样子
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mx-auto mt-6 max-w-xl text-ink-600 dark:text-ink-400"
        >
          天津仁爱学院 · 数智传媒与设计艺术学院。这里记录我的课程项目、设计笔记与生活片段。
        </motion.p>

        {/* 快捷导航入口（大纲 4.1） */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {entries.map((e, i) => (
            <motion.a
              key={e.href}
              href={e.href}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + i * 0.05, duration: 0.35 }}
              whileHover={{ y: -3 }}
              className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm transition hover:text-primary"
            >
              <span>{e.icon}</span>
              <span>{e.label}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-14 text-xs tracking-widest text-ink-400"
        >
          向下滚动 ↓
        </motion.div>
      </div>
    </section>
  )
}
