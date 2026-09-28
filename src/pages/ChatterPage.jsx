import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader.jsx'
import { chatters, profile } from '../data/site.js'

export default function ChatterPage() {
  return (
    <div className="mx-auto w-full px-2 pb-16 pt-28 sm:px-3">
      <PageHeader icon="📝" title="云端杂谈" subtitle={`${profile.tagline} 的碎片记录`} />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {chatters.map((c, i) => (
          <motion.article
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 2) * 0.06 }}
            className="glass group overflow-hidden rounded-3xl shadow-glass transition-all duration-500 hover:scale-[1.02]"
          >
            <div className={`h-40 bg-gradient-to-tr ${c.cover} transition-transform duration-700 group-hover:scale-105`} />
            <div className="p-6">
              <h3 className="text-lg font-bold text-fg transition group-hover:text-primary">
                {c.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-ink-400">{c.description}</p>
              <span className="mt-4 inline-block text-xs text-ink-400">{c.date}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
