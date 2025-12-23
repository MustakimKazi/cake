import React from 'react';
import { Star, Truck, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full dark:bg-slate-800 dark:border-slate-700">
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button 
               className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary-green hover:text-white shadow-lg"
               onClick={() => onAddToCart && onAddToCart(product)}
            >
               <ShoppingCart size={18} />
               Add to Cart
            </button>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
           <h3 className="font-semibold text-slate-800 truncate flex-1 pr-2 dark:text-slate-100" title={product.title}>
             {product.title}
           </h3>
           <div className="flex items-center gap-1 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
             <span>{product.rating}</span>
             <Star size={10} fill="currentColor" />
           </div>
        </div>

        <div className="mt-auto">
           <div className="flex items-baseline gap-2 mb-2">
             <span className="text-lg font-bold text-slate-900 dark:text-white">₹{product.price}</span>
             <span className="text-xs text-slate-400 line-through">₹{product.price + 150}</span>
             <span className="text-xs text-green-600 font-bold ml-auto dark:text-green-400">15% OFF</span>
           </div>

           <div className="flex items-center gap-1.5 text-green-700 text-xs font-medium bg-green-50 p-2 rounded-lg dark:bg-green-900/20 dark:text-green-400">
             <Truck size={14} />
             <span>{product.deliveryTime}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
