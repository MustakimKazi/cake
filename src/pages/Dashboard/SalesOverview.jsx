import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DollarSign, Users, CreditCard, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchStats } from '../../services/api';

const SalesOverview = () => {
   const [stats, setStats] = useState({
      totalRevenue: 0,
      totalCustomers: 0,
      totalTransactions: 0,
      totalProducts: 0
   });

   useEffect(() => {
      const getStats = async () => {
         const data = await fetchStats();
         if (data) setStats(data);
      };
      getStats();
   }, []);

   const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
   };

   const data = [
      { name: 'Jan', uv: 4000, pv: 2400 },
      { name: 'Feb', uv: 3000, pv: 1398 },
      { name: 'Mar', uv: 2000, pv: 9800 },
      { name: 'Apr', uv: 2780, pv: 3908 },
      { name: 'May', uv: 1890, pv: 4800 },
      { name: 'Jun', uv: 2390, pv: 3800 },
   ];

   return (
      <div className="p-1">
         <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial="hidden"
            animate="visible"
            variants={{
               visible: { transition: { staggerChildren: 0.1 } }
            }}
         >
            {/* Revenue Card */}
            <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between dark:bg-slate-800 dark:border-slate-700">
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Revenue</p>
                     <h3 className="text-2xl font-bold text-slate-800 mt-1 dark:text-white">${stats.totalRevenue.toLocaleString()}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                     <DollarSign size={24} />
                  </div>
               </div>
               <div className="flex items-center text-sm">
                  <span className="text-green-500 font-medium">+12.5%</span>
                  <span className="text-slate-400 ml-2">from last month</span>
               </div>
            </motion.div>

            {/* Customers Card */}
            <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between dark:bg-slate-800 dark:border-slate-700">
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Customers</p>
                     <h3 className="text-2xl font-bold text-slate-800 mt-1 dark:text-white">{stats.totalCustomers}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                     <Users size={24} />
                  </div>
               </div>
               <div className="flex items-center text-sm">
                  <span className="text-green-500 font-medium">+8.2%</span>
                  <span className="text-slate-400 ml-2">new customers</span>
               </div>
            </motion.div>

            {/* Transactions Card */}
            <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between dark:bg-slate-800 dark:border-slate-700">
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Orders</p>
                     <h3 className="text-2xl font-bold text-slate-800 mt-1 dark:text-white">{stats.totalTransactions}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                     <ShoppingBag size={24} />
                  </div>
               </div>
               <div className="flex items-center text-sm">
                  <span className="text-red-500 font-medium">-2.4%</span>
                  <span className="text-slate-400 ml-2">from last week</span>
               </div>
            </motion.div>

            {/* Products Card */}
            <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between dark:bg-slate-800 dark:border-slate-700">
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Products</p>
                     <h3 className="text-2xl font-bold text-slate-800 mt-1 dark:text-white">{stats.totalProducts}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                     <CreditCard size={24} />
                  </div>
               </div>
               <div className="flex items-center text-sm">
                  <span className="text-slate-400">In Inventory</span>
               </div>
            </motion.div>
         </motion.div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div 
               className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.2 }}
            >
               <h3 className="text-lg font-bold text-slate-800 mb-6 dark:text-white">Revenue Analytics</h3>
               <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={data}>
                        <defs>
                           <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#7d8035" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#7d8035" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
                        <Tooltip 
                           contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                        />
                        <Area type="monotone" dataKey="uv" stroke="#7d8035" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </motion.div>

            <motion.div 
               className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.3 }}
            >
               <h3 className="text-lg font-bold text-slate-800 mb-6 dark:text-white">Visitor Stats</h3>
               <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
                        <Tooltip 
                           cursor={{fill: '#F1F5F9'}}
                           contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="pv" fill="#a4d96c" radius={[4, 4, 0, 0]} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </motion.div>
         </div>
      </div>
   );
};

export default SalesOverview;
