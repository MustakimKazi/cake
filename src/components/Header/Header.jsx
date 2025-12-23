import React, { useState } from 'react';
import { Search, MapPin, ShoppingCart, User, Gift, ChevronDown, Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ cartCount, isDarkMode, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm dark:bg-slate-800 dark:shadow-slate-900/10 transition-colors duration-200 z-5000">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-1 text-slate-600 dark:text-slate-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <a href="/" className="block">
            <img src="https://www.fnp.com/assets/images/custom/new-logo-2023.svg" alt="FNP" height="40" className="h-8 md:h-10" />
          </a>

          <div className="hidden md:flex items-center bg-gray-100 rounded-lg overflow-hidden w-[350px] lg:w-[450px] ml-6 dark:bg-slate-700 transition-colors">
            <input
              type="text"
              placeholder="Search flowers, cakes, gifts, etc."
              className="flex-1 bg-transparent border-none py-2.5 px-4 outline-none text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
            />
            <button className="bg-primary-green p-2.5 flex items-center justify-center hover:bg-primary-dark transition-colors">
              <Search size={20} className="text-white" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={22} className="text-yellow-400" /> : <Moon size={22} />}
          </button>

          <div className="hidden lg:flex items-center gap-2 cursor-pointer group">
            <div className="text-slate-500 group-hover:text-primary-green transition-colors dark:text-slate-400">
              <MapPin size={20} />
            </div>
            <div>
              <span className="text-xs font-bold block text-slate-700 dark:text-slate-200">Delivery to</span>
              <span className="text-xs text-primary-green font-medium">Select Location</span>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center gap-0.5 cursor-pointer group text-slate-600 hover:text-primary-green dark:text-slate-400 dark:hover:text-primary-green">
            <Gift size={22} strokeWidth={1.5} />
            <span className="text-[10px] font-medium">Corporate</span>
          </div>

          <div className="flex flex-col items-center gap-0.5 cursor-pointer group text-slate-600 hover:text-primary-green relative dark:text-slate-400 dark:hover:text-primary-green">
            <div className="relative">
              <ShoppingCart size={22} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden md:block text-[10px] font-medium">Cart</span>
          </div>

          <div className="hidden md:flex flex-col items-center gap-0.5 cursor-pointer group text-slate-600 hover:text-primary-green dark:text-slate-400 dark:hover:text-primary-green">
            <User size={22} strokeWidth={1.5} />
            <span className="text-[10px] font-medium">Account</span>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block border-t border-slate-100 bg-white dark:bg-slate-800 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-between">
            {['Cakes', 'Flowers', 'Personalised', 'Plants', 'Combos', 'Chocolates', 'Birthday', 'Anniversary', 'Occasions'].map((item, idx) => (
              <li key={item} className={`py-3 px-2 text-sm font-medium flex items-center gap-1 cursor-pointer border-b-2 transition-all ${idx === 0 ? 'text-primary-green border-primary-green' : 'text-slate-600 border-transparent hover:text-primary-green hover:border-primary-green dark:text-slate-300 dark:hover:text-primary-green'}`}>
                {item} <ChevronDown size={14} className="opacity-50" />
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden dark:bg-slate-800 dark:border-slate-700"
          >
            <div className="p-4 flex flex-col gap-2">
              <div className="bg-slate-100 rounded-lg p-3 flex  mb-4 dark:bg-slate-700">
                <Search size={18} className="text-slate-400 mr-2" />
                <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-full dark:text-white" />
              </div>
              {['Cakes', 'Flowers', 'Personalised', 'Plants', 'Combos', 'Chocolates'].map(item => (
                <div key={item} className="py-2 border-b border-slate-50 text-slate-700 font-medium flex justify-between items-center dark:text-slate-200 dark:border-slate-700">
                  {item} <ChevronDown size={16} />
                </div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
