import { motion, useScroll, useTransform } from 'framer-motion'

// 3D-styled, animated title text with layered shadows and subtle wobble
export default function ThreeDTitle({ text, gradient = 'from-white to-white', shadowColor = 'rgba(0,0,0,0.5)', className = '' }) {
  const { scrollY } = useScroll()
  const rotate = useTransform(scrollY, [0, 600], [0, -2])
  const y = useTransform(scrollY, [0, 600], [0, -6])
  const scale = useTransform(scrollY, [0, 600], [1, 0.995])

  // Generate a smooth stacked shadow for faux-depth
  const shadowStack = Array.from({ length: 20 })
    .map((_, i) => `${i + 1}px ${i + 1}px ${(i % 4) + 1}px ${shadowColor}`)
    .join(', ')

  return (
    <motion.h1
      style={{ rotate, y, scale, textShadow: shadowStack }}
      className={`select-none will-change-transform bg-gradient-to-br ${gradient} bg-clip-text text-transparent ${className}`}
    >
      {text}
    </motion.h1>
  )
}
