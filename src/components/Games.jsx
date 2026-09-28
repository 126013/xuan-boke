import { motion } from 'framer-motion'
import Section from './Section.jsx'
import { games } from '../data/site.js'

export default function Games() {
  return (
    <Section id="games" title="游戏分享" desc="业余时间玩过的一些游戏，也是我的灵感来源（示例数据，待替换）。">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {games.map((g, i) => (
          <motion.article
            key={g.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="glass group overflow-hidden rounded-2xl shadow-glass transition-shadow hover:shadow-glow"
          >
            <div className={`h-32 bg-gradient-to-br ${g.cover}`} />
            <div className="p-5">
              <div className="mb-3 flex items-center gap-2 text-xs">
                <span className="rounded-full bg-primary/15 px-2 py-1 text-primary">{g.platform}</span>
                <span className="text-ink-400">{g.status}</span>
              </div>
              <h3 className="mb-2 text-base font-semibold">{g.name}</h3>
              <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-400">{g.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
