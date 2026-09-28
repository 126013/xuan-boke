import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageHeader from '../components/PageHeader.jsx'
import { journey } from '../data/site.js'

export default function ArchivePage() {
  const [open, setOpen] = useState(null)

  return (
    <div className="mx-auto w-full px-2 pb-16 pt-28 sm:px-3">
      <PageHeader icon="🗂️" title="归档" subtitle="经历时间轴 · 点击节点展开详情" />

      <div className="relative">
        <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-primary/50 via-accent/30 to-transparent md:block" />
        <div className="space-y-10">
          {journey.map((j, i) => {
            const left = i % 2 === 0
            return (
              <motion.div
                key={j.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className={`relative flex ${left ? 'md:justify-start' : 'md:justify-end'}`}
              >
                <span className="absolute left-1/2 top-8 z-10 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-gradient-to-tr from-primary to-accent shadow-glow md:block" />
                <button
                  onClick={() => setOpen(j)}
                  className="glass group w-full rounded-3xl p-7 text-left shadow-glass transition-all duration-500 hover:scale-[1.02] md:w-[calc(50%-3rem)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{j.icon}</span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">
                      {j.period}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-fg transition group-hover:text-primary">
                    {j.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-400">{j.summary}</p>
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="modal-backdrop fixed inset-0 z-[70] grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-xl rounded-3xl p-8 shadow-glass"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{open.icon}</span>
                  <h2 className="text-2xl font-black text-fg">{open.title}</h2>
                </div>
                <button
                  onClick={() => setOpen(null)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-black/10 transition hover:text-primary dark:border-white/10"
                >
                  ✕
                </button>
              </div>
              <p className="mt-2 text-xs font-bold text-primary">{open.period}</p>
              <p className="mt-4 leading-relaxed text-ink-600 dark:text-ink-400">{open.detail}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
