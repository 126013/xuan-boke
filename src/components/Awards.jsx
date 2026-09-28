import { useState } from 'react'
import { motion } from 'framer-motion'
import Section from './Section.jsx'
import { awards, stats } from '../data/site.js'

function FlipCard({ item, index }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group h-52 [perspective:1200px]"
    >
      <button
        onClick={() => setFlipped((v) => !v)}
        aria-label={`${item.name} 证书详情`}
        className={`relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* 正面 */}
        <div className="glass absolute inset-0 flex flex-col justify-between rounded-2xl p-5 text-left shadow-glass [backface-visibility:hidden]">
          <span className="w-fit rounded-full bg-accent/15 px-3 py-1 text-xs text-accent">{item.level}</span>
          <div>
            <h3 className="text-lg font-semibold leading-snug">{item.name}</h3>
            <p className="mt-2 text-xs text-ink-400">{item.date}</p>
          </div>
        </div>
        {/* 背面 */}
        <div className="glass absolute inset-0 flex flex-col justify-center rounded-2xl p-5 text-left shadow-glass [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="mb-2 text-sm font-medium text-primary">{item.issuer}</p>
          <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-400">{item.detail}</p>
        </div>
      </button>
    </motion.div>
  )
}

export default function Awards() {
  return (
    <Section id="awards" title="成绩与证书" desc="成绩概览与证书墙，鼠标悬停或点击卡片可翻面查看（示例数据，待替换）。">
      {/* 成绩概览 */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="glass rounded-2xl p-5 shadow-glass"
          >
            <p className="text-xs text-ink-400">{s.label}</p>
            <p className="mt-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-bold text-transparent">
              {s.value}
            </p>
            <p className="mt-1 text-xs text-ink-400">{s.note}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {awards.map((a, i) => (
          <FlipCard key={a.id} item={a} index={i} />
        ))}
      </div>
    </Section>
  )
}
