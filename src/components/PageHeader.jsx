import { motion } from 'framer-motion'

export default function PageHeader({ title, subtitle, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10 text-center"
    >
      <div className="mb-3 text-4xl">{icon}</div>
      <h1 className="text-3xl font-black tracking-wide text-fg">{title}</h1>
      {subtitle && <p className="mt-3 text-sm text-ink-400">{subtitle}</p>}
      <div className="mx-auto mt-5 h-0.5 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
    </motion.div>
  )
}
