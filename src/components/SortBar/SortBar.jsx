import React from 'react';
import { ChevronDown } from 'lucide-react';

const SortBar = ({ count, sortOption, onSortChange }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center py-4 mb-6 border-b border-slate-200 dark:border-slate-700">
      <div className="text-slate-500 mb-4 sm:mb-0 dark:text-slate-400">
        Showing <strong className="text-slate-800 dark:text-white">{count}</strong> Cakes
      </div>
      
      <div className="relative group">
        <select 
          className="appearance-none bg-white border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl focus:outline-none focus:border-primary-green focus:ring-1 focus:ring-primary-green cursor-pointer dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="popularity">Popularity</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-primary-green transition-colors" />
      </div>
    </div>
  );
};

export default SortBar;
