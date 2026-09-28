import { useState } from 'react'
import { motion } from 'framer-motion'
import Section from './Section.jsx'
import Modal from './Modal.jsx'
import { works, workCategories } from '../data/site.js'

export default function Works() {
  const [cat, setCat] = useState('全部')
  const [active, setActive] = useState(null)
  const list = cat === '全部' ? works : works.filter((w) => w.category === cat)

  return (
    <Section id="works" title="作品展示" desc="按类别筛选，点击卡片查看详情（示例数据，待替换）。">
      {/* 分类筛选 */}
      <div className="mb-8 flex flex-wrap gap-2">
        {workCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              cat === c
                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-glow'
                : 'glass hover:text-primary'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((w, i) => (
          <motion.article
            key={w.id}
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            onClick={() => setActive(w)}
            className="glass cursor-pointer overflow-hidden rounded-2xl shadow-glass"
          >
            <div className={`h-36 bg-gradient-to-br ${w.cover}`} />
            <div className="p-5">
              <div className="mb-3 flex items-center gap-3 text-xs text-ink-400">
                <span className="rounded-full bg-primary/15 px-2 py-1 text-primary">{w.category}</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">{w.title}</h3>
              <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-400">{w.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} label="作品详情">
        {active && (
          <div>
            <div className="grid grid-cols-3 gap-1 p-1">
              {active.shots.map((s, i) => (
                <div key={i} className={`h-32 rounded-2xl bg-gradient-to-br ${s}`} />
              ))}
            </div>
            <div className="p-8">
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs text-primary">{active.category}</span>
              <h3 className="mt-3 mb-3 text-2xl font-bold">{active.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-ink-600 dark:text-ink-400">{active.detail}</p>
              <p className="text-xs text-ink-400">我的角色：{active.role}</p>
              <button
                onClick={() => setActive(null)}
                className="mt-8 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm text-white"
              >
                关闭
              </button>
            </div>
          </div>
        )}
      </Modal>
    </Section>
  )
}
