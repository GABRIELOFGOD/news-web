import { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"

const AnimationWrapper = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  className
}: {
  children: ReactNode,
  initial?: { opacity: number },
  animate?: { opacity: number },
  transition?: { duration: number },
  className?: string
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
export default AnimationWrapper;