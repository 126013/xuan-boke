import { motion } from 'framer-motion'
import Section from './Section.jsx'
import { contacts } from '../data/site.js'

export default function Contact() {
  return (
    <Section id="contact" title="联系方式" desc="欢迎交流课程项目、设计合作或只是聊聊（示例占位，待替换为真实账号）。">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {contacts.map((c, i) => (
          <motion.a
            key={c.label}
            href={c.href}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="glass flex items-center gap-3 rounded-2xl p-4 text-sm shadow-glass"
          >
            <span className="text-lg">{c.icon}</span>
            <span>
              <span className="block text-xs text-ink-400">{c.label}</span>
              <span>{c.value}</span>
            </span>
          </motion.a>
        ))}
      </div>
    </Section>
  )
}
