import { useState } from 'react'
import { motion } from 'framer-motion'
import Section from './Section.jsx'
import Modal from './Modal.jsx'
import { journey } from '../data/site.js'

export default function Journey() {
  const [active, setActive] = useState(null)

  return (
    <Section id="journey" title="经历旅途" desc="从大一入学到现在大三的关键节点，点击节点查看详情（示例数据，待替换）。">
      <div className="relative">
        {/* 时间轴主线 */}
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2" />

        <ol className="space-y-8">
          {journey.map((n, i) => {
            const right = i % 2 === 1
            return (
              <motion.li
                key={n.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`relative pl-12 md:grid md:grid-cols-2 md:gap-10 md:pl-0 ${
                  right ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* 节点圆点 */}
                <span className="absolute left-0 top-5 grid h-8 w-8 place-items-center rounded-full border border-primary/40 bg-primary/15 text-sm md:left-1/2 md:-translate-x-1/2">
                  {n.icon}
                </span>

                <div className={right ? 'md:pl-10' : 'md:pr-10 md:text-right'}>
                  <button
                    onClick={() => setActive(n)}
                    className="glass w-full cursor-pointer rounded-2xl p-5 text-left shadow-glass transition hover:-translate-y-1"
                  >
                    <span className="text-xs tracking-widest text-primary">{n.period}</span>
                    <h3 className="mt-1 text-lg font-semibold">{n.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-400">{n.summary}</p>
                  </button>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} label="经历详情">
        {active && (
          <div className="p-8">
            <span className="text-xs tracking-widest text-primary">{active.period}</span>
            <h3 className="mt-1 mb-4 text-2xl font-bold">
              {active.icon} {active.title}
            </h3>
            <p className="leading-relaxed text-ink-600 dark:text-ink-400">{active.detail}</p>
            <button
              onClick={() => setActive(null)}
              className="mt-8 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm text-white"
            >
              关闭
            </button>
          </div>
        )}
      </Modal>
    </Section>
  )
}
