import { motion } from 'framer-motion'

const skills = ['产品设计', '交互设计', 'UI 设计', '手绘草图', '用户调研', '3D 建模']

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-28 px-4 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass rounded-3xl p-8 shadow-glass md:p-12"
      >
        <h2 className="mb-6 text-3xl font-bold">关于我</h2>
        <p className="mb-8 max-w-2xl leading-relaxed text-ink-600 dark:text-ink-400">
          我是贾静瑄，天津仁爱学院数智传媒与设计艺术学院产品设计专业大三学生。
          喜欢把模糊的想法拆成可以被看见、被使用的东西——从一张草图到一台能敲响的实物。
          目前正在进行课程项目与竞赛实践，也在持续补足交互与前端实现能力。
        </p>
        <div className="flex flex-wrap gap-3">
          {skills.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded-full border border-black/5 bg-white/60 px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
