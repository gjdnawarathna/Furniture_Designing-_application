import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { motion, AnimatePresence } from 'framer-motion'

const Layout = () => {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar scrolled={scrolled} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="fade-in"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  )
}

export default Layout