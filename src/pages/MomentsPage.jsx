import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader.jsx'
import { moments } from '../data/site.js'

export default function MomentsPage() {
  return (
    <div className="mx-auto w-full px-2 pb-16 pt-28 sm:px-3">
      <PageHeader icon="💬" title="说说" subtitle="日常碎片 · 随手记录（示例数据，可替换）" />

      <div className="relative space-y-7 before:absolute before:bottom-2 before:left-[30px] before:top-2 before:w-px before:bg-gradient-to-b before:from-primary/40 before:to-transparent">
        {moments.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="relative flex items-start gap-5 pl-0"
          >
            <div className="z-10 grid h-[3.75rem] w-[3.75rem] shrink-0 place-items-center rounded-2xl bg-gradient-to-tr from-primary/80 to-accent/70 text-2xl shadow-glow">
              {m.mood}
            </div>
            <div className="glass flex-1 rounded-2xl rounded-tl-md p-6 shadow-glass">
              <p className="leading-relaxed text-fg">{m.text}</p>
              <span className="mt-3 block text-xs text-ink-400">{m.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
