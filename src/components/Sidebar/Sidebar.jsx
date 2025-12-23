import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterSection = ({ title, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-slate-100 py-4 last:border-0 dark:border-slate-700">
      <div 
         className="flex justify-between items-center cursor-pointer mb-3" 
         onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="font-semibold text-slate-800 text-sm dark:text-slate-200">{title}</h4>
        {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
      </div>
      <AnimatePresence>
         {isOpen && (
            <motion.ul 
               initial={{ height: 0, opacity: 0 }} 
               animate={{ height: 'auto', opacity: 1 }} 
               exit={{ height: 0, opacity: 0 }}
               className="space-y-2 overflow-hidden"
            >
               {options.map((option) => (
                  <li key={option}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                     <div className="relative flex items-center">
                        <input
                           type="checkbox"
                           checked={selected.includes(option)}
                           onChange={() => onChange(option)}
                           className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded checked:bg-primary-green checked:border-primary-green transition-colors dark:border-slate-600 dark:checked:bg-primary-green"
                        />
                        <svg className="absolute w-3.5 h-3.5 pointer-events-none hidden peer-checked:block text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" viewBox="0 0 14 14" fill="none">
                           <path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                     </div>
                     <span className="text-sm text-slate-600 group-hover:text-primary-green transition-colors dark:text-slate-400 dark:group-hover:text-primary-green">{option}</span>
                  </label>
                  </li>
               ))}
            </motion.ul>
         )}
      </AnimatePresence>
    </div>
  );
};

const Sidebar = ({ filters, onFilterChange, isOpen, onClose }) => {
  const handleFilterChange = (category, value) => {
    onFilterChange(category, value);
  };

  const filterOptions = {
    flavors: ["Chocolate", "Red Velvet", "Black Forest", "Butterscotch", "Pineapple", "Blueberry", "Vanilla", "Fruit"],
    types: ["Cream", "Fondant", "Photo", "Dry", "Eggless"],
    weights: ["0.5 kg", "1 kg", "2 kg", "4 kg"]
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
         <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
            onClick={onClose}
         />
      )}
      
      <aside className={`
         fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-white h-full lg:h-[calc(100vh-100px)] lg:overflow-y-auto lg:top-[100px] lg:block p-6 shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out dark:bg-slate-800
         ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 lg:hidden dark:border-slate-700">
           <h3 className="text-lg font-bold text-slate-800 dark:text-white">Filters</h3>
           <button onClick={onClose} className="p-1 text-slate-500 hover:bg-slate-100 rounded-full dark:text-slate-400 dark:hover:bg-slate-700"><X size={20} /></button>
        </div>

        <h3 className="hidden lg:block text-lg font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100 dark:text-white dark:border-slate-700">Filters</h3>
        
        <div className="border-b border-slate-100 pb-6 mb-6 dark:border-slate-700">
           <div className="mb-4">
              <h4 className="font-semibold text-slate-800 text-sm mb-4 dark:text-slate-200">Price Range</h4>
           </div>
           <div className="px-2">
              <input type="range" min="399" max="2999" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-green dark:bg-slate-700" />
              <div className="flex justify-between text-xs font-medium mt-3 text-slate-500 dark:text-slate-400">
                 <span>₹ 399</span>
                 <span>₹ 2999+</span>
              </div>
           </div>
        </div>

        <FilterSection
          title="Flavour"
          options={filterOptions.flavors}
          selected={filters.flavors}
          onChange={(val) => handleFilterChange('flavors', val)}
        />

        <FilterSection
          title="Type"
          options={filterOptions.types}
          selected={filters.types}
          onChange={(val) => handleFilterChange('types', val)}
        />

        <FilterSection
          title="Weight"
          options={filterOptions.weights}
          selected={filters.weights}
          onChange={(val) => handleFilterChange('weights', val)}
        />
        
        <div className="mt-8 lg:hidden">
           <button 
              className="w-full bg-primary-green text-white font-bold py-3 rounded-xl shadow-lg shadow-green-900/10 hover:bg-primary-dark transition-colors" 
              onClick={onClose}
           >
              Apply Filters
           </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
