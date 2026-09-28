import { motion } from 'framer-motion'

/** 模块区块统一外壳：锚点定位（避开固定导航）+ 标题渐显 */
export default function Section({ id, title, desc, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-3xl font-bold">{title}</h2>
        {desc && <p className="mt-2 text-sm text-ink-600 dark:text-ink-400">{desc}</p>}
      </motion.div>
      {children}
    </section>
  )
}
