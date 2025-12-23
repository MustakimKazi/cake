import React, { useState } from 'react';
import { Search, Eye, MoreHorizontal, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Orders = () => {
    const [status, setStatus] = useState('all');
    
    // Mock Data
    const orders = [
       { id: '#ORD-001', customer: 'John Doe', date: '2024-03-10', total: 120, status: 'Delivered', items: 2 },
       { id: '#ORD-002', customer: 'Sarah Smith', date: '2024-03-11', total: 85, status: 'Pending', items: 1 },
       { id: '#ORD-003', customer: 'Michael Brown', date: '2024-03-12', total: 240, status: 'Processing', items: 4 },
       { id: '#ORD-004', customer: 'Emily White', date: '2024-03-12', total: 45, status: 'Cancelled', items: 1 },
    ];

    const filtered = status === 'all' ? orders : orders.filter(o => o.status.toLowerCase() === status.toLowerCase());

    const getStatusColor = (status) => {
       switch(status.toLowerCase()) {
          case 'delivered': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
          case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
          case 'processing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
          case 'cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
          default: return 'bg-slate-100 text-slate-700';
       }
    };

    return (
        <motion.div 
           className="p-1"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
               <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Orders Management</h2>
                  <p className="text-slate-500 dark:text-slate-400">Track and manage customer orders</p>
               </div>
               <div className="flex gap-4">
                  <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700">
                     <Filter size={18} />
                     <span>Filter</span>
                  </button>
                  <button className="bg-primary-green text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-green-900/10">
                     Export Report
                  </button>
               </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden dark:bg-slate-800 dark:border-slate-700">
               {/* Tabs */}
               <div className="flex border-b border-slate-100 dark:border-slate-700">
                  {['All', 'Pending', 'Delivered', 'Cancelled'].map(tab => (
                     <button 
                        key={tab}
                        onClick={() => setStatus(tab.toLowerCase())}
                        className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                           status === tab.toLowerCase() 
                           ? 'border-primary-green text-primary-green' 
                           : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                        }`}
                     >
                        {tab}
                     </button>
                  ))}
               </div>

               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 dark:bg-slate-700/50 dark:border-slate-700">
                           <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">Order ID</th>
                           <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">Customer</th>
                           <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">Date</th>
                           <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">Total</th>
                           <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">Status</th>
                           <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400 text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {filtered.length > 0 ? filtered.map((order) => (
                           <motion.tr 
                              key={order.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="hover:bg-slate-50 transition-colors dark:hover:bg-slate-700/30"
                           >
                              <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">{order.id}</td>
                              <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                                       {order.customer.charAt(0)}
                                    </div>
                                    {order.customer}
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{order.date}</td>
                              <td className="px-6 py-4 font-medium text-slate-800 dark:text-white">${order.total}</td>
                              <td className="px-6 py-4">
                                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                    {order.status}
                                 </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <div className="flex items-center justify-end gap-2">
                                    <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors dark:hover:bg-slate-700">
                                       <Eye size={16} />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors dark:hover:bg-slate-700 dark:hover:text-slate-200">
                                       <MoreHorizontal size={16} />
                                    </button>
                                 </div>
                              </td>
                           </motion.tr>
                        )) : (
                           <tr>
                              <td colSpan="6" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                                 No orders found
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

export default Orders;
