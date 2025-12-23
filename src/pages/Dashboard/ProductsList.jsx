import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchProducts } from '../../services/api';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await fetchProducts();
            if (data) setProducts(data);
            setLoading(false);
        };
        load();
    }, []);

    const filtered = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

    const handleDelete = (id) => {
       if (confirm('Are you sure you want to delete this product?')) {
          setProducts(prev => prev.filter(p => p.id !== id));
          // Call API delete here
       }
    };

    if (loading) return <div className="p-8 text-center text-slate-500 dark:text-slate-400">Loading inventory...</div>;

    return (
        <motion.div 
           className="p-1"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
               <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Products Inventory</h2>
                  <p className="text-slate-500 dark:text-slate-400">Manage your cakes and stock levels</p>
               </div>
               <div className="flex gap-4 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                     <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-primary-green focus:ring-1 focus:ring-primary-green outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                     />
                  </div>
                  <button className="bg-primary-green text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-colors shadow-lg shadow-green-900/10">
                     <Plus size={18} />
                     <span className="hidden sm:inline">Add New</span>
                  </button>
               </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden dark:bg-slate-800 dark:border-slate-700">
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 dark:bg-slate-700/50 dark:border-slate-700">
                           <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">Product</th>
                           <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">Category</th>
                           <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">Price</th>
                           <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">Status</th>
                           <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400 text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {filtered.length > 0 ? filtered.map((product) => (
                           <motion.tr 
                              key={product.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="hover:bg-slate-50 transition-colors dark:hover:bg-slate-700/30"
                           >
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-4">
                                    <img 
                                       src={product.image} 
                                       alt={product.title} 
                                       className="w-12 h-12 rounded-lg object-cover border border-slate-100 dark:border-slate-600" 
                                    />
                                    <div>
                                       <h4 className="font-semibold text-slate-800 dark:text-slate-100">{product.title}</h4>
                                       <span className="text-xs text-slate-400">{product.weight}</span>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{product.flavor || 'Cake'}</td>
                              <td className="px-6 py-4 font-medium text-slate-800 dark:text-white">${product.price}</td>
                              <td className="px-6 py-4">
                                 <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                    In Stock
                                 </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <div className="flex items-center justify-end gap-2">
                                    <button className="p-2 text-slate-400 hover:text-primary-green hover:bg-green-50 rounded-lg transition-colors dark:hover:bg-slate-700">
                                       <Edit size={16} />
                                    </button>
                                    <button 
                                       onClick={() => handleDelete(product.id)}
                                       className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors dark:hover:bg-slate-700"
                                    >
                                       <Trash2 size={16} />
                                    </button>
                                 </div>
                              </td>
                           </motion.tr>
                        )) : (
                           <tr>
                              <td colSpan="5" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                                 No products found matching "{search}"
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
        </motion.div>
    );
};

export default ProductsList;
