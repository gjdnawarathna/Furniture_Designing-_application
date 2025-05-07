import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClass = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  }

  return (
    <div className="flex justify-center items-center h-full min-h-[200px]">
      <motion.div
        className={`${sizeClass[size]} border-4 border-neutral-200 border-t-primary-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

export default LoadingSpinner