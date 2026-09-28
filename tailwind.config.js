/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // 主色 / 点缀色 / 纸面色均随主题切换（变量定义在 src/index.css）
        primary: 'rgb(var(--c-primary) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        // 语义文字色：随主题自动取「深色模式=亮字 / 浅色模式=深字」
        fg: 'rgb(var(--c-fg) / <alpha-value>)',
        ink: {
          900: 'rgb(var(--c-bg) / <alpha-value>)',
          800: 'rgb(var(--c-surface) / <alpha-value>)',
          600: 'rgb(var(--c-text2) / <alpha-value>)',
          400: 'rgb(var(--c-text3) / <alpha-value>)',
          50: 'rgb(var(--c-paper) / <alpha-value>)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'PingFang SC', 'Microsoft YaHei', 'sans-serif']
      },
      boxShadow: {
        glass: '0 8px 32px rgb(var(--c-shadow) / 0.14)',
        glow: '0 0 24px rgb(var(--c-glow) / 0.35)'
      }
    }
  },
  plugins: []
}
