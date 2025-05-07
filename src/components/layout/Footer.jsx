import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-white font-bold text-2xl">INFINIX</span>
              <span className="ml-1 text-accent-500 font-light text-xl">furniture</span>
            </Link>
            <p className="text-neutral-300 mb-4">
              Creating beautiful spaces with exquisite furniture designs since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-neutral-300 hover:text-accent-500 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-neutral-300 hover:text-accent-500 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-neutral-300 hover:text-accent-500 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" aria-label="Pinterest" className="text-neutral-300 hover:text-accent-500 transition-colors">
                <FaPinterest size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/furniture" className="text-neutral-300 hover:text-white transition-colors">
                  All Furniture
                </Link>
              </li>
              <li>
                <Link to="/furniture?category=living-room" className="text-neutral-300 hover:text-white transition-colors">
                  Living Room
                </Link>
              </li>
              <li>
                <Link to="/furniture?category=bedroom" className="text-neutral-300 hover:text-white transition-colors">
                  Bedroom
                </Link>
              </li>
              <li>
                <Link to="/furniture?category=dining" className="text-neutral-300 hover:text-white transition-colors">
                  Dining
                </Link>
              </li>
              <li>
                <Link to="/furniture?category=office" className="text-neutral-300 hover:text-white transition-colors">
                  Office
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                  Warranty
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                  Care & Maintenance
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-neutral-300 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full rounded-l-md focus:outline-none text-neutral-800"
              />
              <button 
                type="submit" 
                className="bg-accent-500 hover:bg-accent-600 px-4 py-2 rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Infinix Furniture. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer