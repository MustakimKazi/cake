import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, ShoppingBag, Users, Settings, LogOut, Package, Menu, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ isDarkMode, toggleTheme }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
     if (isMobile) setCollapsed(true);
  }, [location.pathname, isMobile]);

  const menuItems = [
    { path: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { path: '/dashboard/products', label: 'Products', icon: <Package size={20} /> },
    { path: '/dashboard/orders', label: 'Orders', icon: <ShoppingBag size={20} /> },
    { path: '/dashboard/add-product', label: 'Add Product', icon: <PlusCircle size={20} /> },
    { path: '/dashboard/customers', label: 'Customers', icon: <Users size={20} /> },
    { path: '/dashboard/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className={`flex h-screen bg-slate-50 font-sans overflow-hidden transition-colors duration-200 dark:bg-slate-900 dark:text-slate-100`}>
      {/* Mobile Overlay */}
      {isMobile && !collapsed && (
         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setCollapsed(true)}
            className="fixed inset-0 bg-black/50 z-20"
         />
      )}

      {/* Sidebar */}
      <motion.aside 
         initial={false}
         animate={{ 
            width: isMobile ? (collapsed ? 0 : 260) : (collapsed ? 80 : 260),
            x: isMobile && collapsed ? -260 : 0
         }}
         transition={{ type: "spring", stiffness: 300, damping: 30 }}
         className={`bg-white border-r border-slate-200 flex flex-col z-30 shadow-xl dark:bg-slate-800 dark:border-slate-700 ${isMobile ? 'fixed h-full' : 'relative'}`}
      >
        <div className="h-16 flex items-center justify-center border-b border-slate-100 dark:border-slate-700">
          {(collapsed && !isMobile) ? (
             <span className="text-2xl font-black text-primary-green">C</span>
          ) : (
             <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary-green to-[#a4d96c]">
               CakeAdmin
             </h2>
          )}
        </div>
        
        <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
           <ul className="space-y-2">
              {menuItems.map((item) => {
                 const isActive = location.pathname === item.path;
                 return (
                    <li key={item.path} className="relative">
                       <Link 
                          to={item.path} 
                          title={collapsed && !isMobile ? item.label : ''}
                          className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors font-medium
                             ${isActive 
                               ? 'bg-green-50 text-primary-green dark:bg-green-900/20 dark:text-green-400' 
                               : 'text-slate-500 hover:bg-slate-50 hover:text-primary-green dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-slate-200'
                             }`}
                       >
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                             {item.icon}
                          </motion.div>
                          {(!collapsed || isMobile) && (
                             <motion.span 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                transition={{ delay: 0.1 }}
                                className="whitespace-nowrap"
                             >
                                {item.label}
                             </motion.span>
                          )}
                       </Link>
                       {isActive && (
                          <motion.div 
                             layoutId="activeTab" 
                             className="absolute left-0 top-0 bottom-0 w-1 bg-primary-green rounded-r" 
                             initial={false}
                          />
                       )}
                    </li>
                 );
              })}
           </ul>
        </nav>

        <div className="p-6 border-t border-slate-100 dark:border-slate-700">
           <button className="flex items-center gap-3 w-full text-red-500 font-medium hover:text-red-600 dark:text-red-400">
              <LogOut size={20} />
              {(!collapsed || isMobile) && <span>Logout</span>}
           </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-900">
         <header className="h-16 bg-white/80 backdrop-blur border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10 dark:bg-slate-800/80 dark:border-slate-700">
            <div className="flex items-center gap-4">
               <button onClick={() => setCollapsed(!collapsed)} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700">
                  <Menu size={20} />
               </button>
               <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                  {menuItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
               </h3>
            </div>
            
            <div className="flex items-center gap-6">
               <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700">
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
               </button>
               <div className="relative group">
                  <img 
                     src="https://ui-avatars.com/api/?name=Admin+User&background=random" 
                     alt="Admin" 
                     className="w-9 h-9 rounded-full border-2 border-white shadow-sm cursor-pointer hover:scale-105 transition-transform dark:border-slate-600"
                  />
               </div>
            </div>
         </header>
         
         <div className="flex-1 overflow-y-auto p-8 relative">
            <AnimatePresence mode="wait">
               <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
               >
                  <Outlet />
               </motion.div>
            </AnimatePresence>
         </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
