import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageHeader from '../components/PageHeader.jsx'
import { workCategories, works } from '../data/site.js'

export default function ProjectsPage() {
  const [cat, setCat] = useState('全部')
  const [detail, setDetail] = useState(null)
  const list = cat === '全部' ? works : works.filter((w) => w.category === cat)

  return (
    <div className="mx-auto w-full px-2 pb-16 pt-28 sm:px-3">
      <PageHeader icon="🎨" title="项目" subtitle="课程作品 / 设计练习 / 游玩记录（示例数据，可替换）" />

      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {workCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
              cat === c
                ? 'bg-gradient-to-tr from-primary to-accent text-white shadow-glow'
                : 'glass text-ink-600 hover:text-primary dark:text-ink-400'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((w, i) => (
          <motion.button
            key={w.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
            onClick={() => setDetail(w)}
            className="glass group overflow-hidden rounded-3xl text-left shadow-glass transition-all duration-500 hover:scale-[1.03]"
          >
            <div className={`relative h-44 bg-gradient-to-tr ${w.cover}`}>
              <span className="absolute left-4 top-4 rounded-full bg-black/25 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                {w.category}
              </span>
              {w.platform && (
                <span className="absolute right-4 top-4 rounded-full bg-black/25 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                  {w.platform} · {w.status}
                </span>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-fg transition group-hover:text-primary">
                {w.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-ink-400">{w.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {detail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDetail(null)}
            className="modal-backdrop fixed inset-0 z-[70] grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="glass max-h-[85vh] w-full max-w-2xl overflow-auto rounded-3xl p-8 shadow-glass"
            >
              <div className={`mb-6 h-48 rounded-2xl bg-gradient-to-tr ${detail.cover}`} />
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-fg">{detail.title}</h2>
                <button
                  onClick={() => setDetail(null)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-black/10 transition hover:text-primary dark:border-white/10"
                >
                  ✕
                </button>
              </div>
              <p className="mt-2 text-sm font-bold text-primary">{detail.role}</p>
              <p className="mt-4 leading-relaxed text-ink-600 dark:text-ink-400">{detail.detail}</p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {detail.shots.map((s, i) => (
                  <div key={i} className={`h-24 rounded-xl bg-gradient-to-tr ${s}`} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
