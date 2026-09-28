import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader.jsx'
import { awards, contacts, profile, stats } from '../data/site.js'
import { useToast } from '../components/ToastProvider.jsx'

export default function AboutPage() {
  const showToast = useToast()

  const copy = (text, label) => {
    if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {})
    showToast(`✨ ${label}已复制: ${text}`)
  }

  return (
    <div className="mx-auto w-full px-2 pb-16 pt-28 sm:px-3">
      <PageHeader icon="✦" title="关于我" subtitle={profile.tagline} />

      {/* 个人简介卡 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="glass mb-8 flex flex-col items-center gap-8 rounded-3xl p-10 shadow-glass sm:flex-row"
      >
        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-tr from-primary to-accent p-1 text-5xl shadow-glow">
          <span className="grid h-full w-full place-items-center rounded-[1.4rem] bg-ink-50/90 text-primary dark:bg-ink-900/80">
            ✦
          </span>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-black text-fg">{profile.name}</h2>
          <p className="mt-2 text-sm font-bold text-primary">{profile.tagline}</p>
          <p className="mt-4 leading-relaxed text-ink-600 dark:text-ink-400">{profile.bio}</p>
        </div>
      </motion.div>

      {/* 成绩指标 */}
      <div className="mb-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="glass rounded-3xl p-6 text-center shadow-glass"
          >
            <div className="text-3xl font-black text-primary">{s.value}</div>
            <div className="mt-2 text-sm font-bold text-fg">{s.label}</div>
            <div className="mt-1 text-xs text-ink-400">{s.note}</div>
          </motion.div>
        ))}
      </div>

      {/* 证书墙（3D 翻牌） */}
      <h3 className="mb-6 mt-12 text-center text-xl font-black text-fg">
        成绩与证书 <span className="text-xs font-normal text-ink-400">（悬停翻牌）</span>
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {awards.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 2) * 0.06 }}
            className="group h-44 [perspective:1200px]"
          >
            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-3xl bg-gradient-to-tr from-primary/70 to-accent/60 p-5 text-center text-white shadow-glass [backface-visibility:hidden]`}>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">{a.level}</span>
                <h4 className="text-lg font-black leading-snug">{a.name}</h4>
                <p className="text-sm text-white/85">{a.issuer}</p>
              </div>
              <div className="glass absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-3xl p-5 text-center shadow-glass [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <span className="text-xs font-bold text-primary">{a.date}</span>
                <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-400">{a.detail}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 联系方式 */}
      <h3 className="mb-6 mt-12 text-center text-xl font-black text-fg">联系我</h3>
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {contacts.map((c, i) => (
          <motion.button
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            onClick={() => (c.href ? (window.location.href = c.href) : copy(c.value, c.label))}
            className="glass flex flex-col items-center gap-3 rounded-3xl p-7 shadow-glass transition hover:scale-[1.03]"
          >
            <span className="text-3xl">{c.icon}</span>
            <span className="text-sm font-bold text-fg">{c.label}</span>
            <span className="text-xs text-ink-400">{c.value}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
