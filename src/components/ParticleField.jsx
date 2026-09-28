import { useEffect, useRef } from 'react'

/**
 * 光粒子交互背景：Canvas 粒子 + 连线 + 鼠标视差。
 * 深浅色自动取色；尊重 prefers-reduced-motion（静止不空转）。
 */
export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const count = Math.min(90, Math.floor((width * height) / 16000))
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.8
    }))

    const pointer = { x: -9999, y: -9999 }
    let raf = 0

    // 流星（仅深色模式，低频触发）
    const meteors = []
    const spawnMeteor = () => {
      const fromLeft = Math.random() < 0.5
      meteors.push({
        x: fromLeft ? Math.random() * width * 0.5 : width * (0.5 + Math.random() * 0.5),
        y: Math.random() * height * 0.45,
        vx: (fromLeft ? 1 : -1) * (5 + Math.random() * 3),
        vy: 2.2 + Math.random() * 1.4,
        len: 90 + Math.random() * 90,
        life: 1
      })
    }
    const drawMeteor = (m) => {
      const tailX = m.x - m.vx * (m.len / Math.hypot(m.vx, m.vy))
      const tailY = m.y - m.vy * (m.len / Math.hypot(m.vx, m.vy))
      const g = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
      g.addColorStop(0, 'rgba(226, 232, 240, 0.85)')
      g.addColorStop(0.4, 'rgba(147, 197, 253, 0.35)')
      g.addColorStop(1, 'rgba(147, 197, 253, 0)')
      ctx.beginPath()
      ctx.moveTo(m.x, m.y)
      ctx.lineTo(tailX, tailY)
      ctx.strokeStyle = g
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.stroke()
    }

    const colors = () => {
      const light = document.documentElement.classList.contains('light')
      // 浅色：喷泉日光下的紫色光尘与玫瑰花粉；深色：星海蓝紫
      return light
        ? {
            dot: 'rgba(154, 146, 216, 0.45)',
            line: 'rgba(240, 156, 138, 0.14)'
          }
        : {
            dot: 'rgba(56, 189, 248, 0.75)',
            line: 'rgba(129, 140, 248, 0.18)'
          }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const c = colors()
      const isLight = document.documentElement.classList.contains('light')

      // 流星：深色模式随机划过（减少动效偏好下不出现）
      if (!isLight && !reduce) {
        if (Math.random() < 0.0025 && meteors.length < 2) spawnMeteor()
        for (let k = meteors.length - 1; k >= 0; k--) {
          const m = meteors[k]
          m.x += m.vx
          m.y += m.vy
          if (m.x < -200 || m.x > width + 200 || m.y > height + 100) {
            meteors.splice(k, 1)
            continue
          }
          drawMeteor(m)
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (!reduce) {
          p.x += p.vx
          p.y += p.vy
        }
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // 鼠标视差：靠近时轻微被吸引
        const dx = pointer.x - p.x
        const dy = pointer.y - p.y
        const dist = Math.hypot(dx, dy)
        if (dist < 160) {
          p.x += dx * 0.0006
          p.y += dy * 0.0006
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = c.dot
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = c.line
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
    }
    const onResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  )
}
