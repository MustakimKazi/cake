import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { addProduct } from '../../services/api';
import { motion } from 'framer-motion';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: 'Delicious cake for your special moments.',
        price: '',
        weight: '1kg',
        flavor: 'Chocolate',
        eggless: false
    });
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 5) {
            alert('Maximum 5 images allowed');
            return;
        }

        const newImages = [...images, ...files];
        setImages(newImages);

        const newUrls = files.map(file => URL.createObjectURL(file));
        setImageUrls([...imageUrls, ...newUrls]);
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        const newUrls = imageUrls.filter((_, i) => i !== index);
        setImages(newImages);
        setImageUrls(newUrls);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => data.append(key, formData[key]));
            images.forEach(image => data.append('images', image));

            await addProduct(data);
            alert('Product added successfully!');
            // Reset
            setFormData({
               title: '',
               description: 'Delicious cake for your special moments.',
               price: '',
               weight: '1kg',
               flavor: 'Chocolate',
               eggless: false
            });
            setImages([]);
            setImageUrls([]);
        } catch (error) {
            console.error(error);
            alert('Failed to add product');
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary-green focus:ring-1 focus:ring-primary-green outline-none transition-colors dark:bg-slate-700 dark:border-slate-600 dark:text-white";
    const labelClass = "block text-sm font-semibold text-slate-700 mb-2 dark:text-slate-300";

    return (
        <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden dark:bg-slate-800 dark:border-slate-700">
                <div className="p-8 border-b border-slate-100 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Add New Product</h2>
                    <p className="text-slate-500 mt-1 dark:text-slate-400">Add a new cake to your inventory</p>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div>
                          <label className={labelClass}>Product Title</label>
                          <input 
                              type="text" 
                              name="title" 
                              value={formData.title} 
                              onChange={handleChange} 
                              className={inputClass}
                              required 
                          />
                       </div>
                       <div>
                          <label className={labelClass}>Price ($)</label>
                          <input 
                              type="number" 
                              name="price" 
                              value={formData.price} 
                              onChange={handleChange} 
                              className={inputClass}
                              required 
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div>
                          <label className={labelClass}>Weight</label>
                          <select 
                              name="weight" 
                              value={formData.weight} 
                              onChange={handleChange} 
                              className={inputClass}
                          >
                             <option>0.5kg</option>
                             <option>1kg</option>
                             <option>2kg</option>
                             <option>5kg</option>
                          </select>
                       </div>
                       <div>
                          <label className={labelClass}>Flavor</label>
                          <select 
                              name="flavor" 
                              value={formData.flavor} 
                              onChange={handleChange} 
                              className={inputClass}
                          >
                             <option>Chocolate</option>
                             <option>Vanilla</option>
                             <option>Red Velvet</option>
                             <option>Butterscotch</option>
                             <option>Fruit</option>
                          </select>
                       </div>
                       <div className="flex items-center pt-8">
                           <label className="flex items-center gap-3 cursor-pointer">
                               <input 
                                  type="checkbox" 
                                  name="eggless" 
                                  checked={formData.eggless} 
                                  onChange={handleChange} 
                                  className="w-5 h-5 rounded border-gray-300 text-primary-green focus:ring-primary-green transition-colors"
                               />
                               <span className="font-medium text-slate-700 dark:text-slate-300">Eggless Cake</span>
                           </label>
                       </div>
                    </div>

                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea 
                           name="description" 
                           value={formData.description} 
                           onChange={handleChange} 
                           className={`${inputClass} h-32 resize-none`}
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className={labelClass}>Product Images (Max 5)</label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2">
                           {/* Upload Button */}
                           <label className="flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-slate-300 cursor-pointer hover:border-primary-green hover:bg-green-50 transition-colors dark:border-slate-600 dark:hover:border-primary-green dark:hover:bg-slate-700">
                               <Upload className="text-slate-400 mb-2" size={24} />
                               <span className="text-xs font-semibold text-slate-500">Upload</span>
                               <input 
                                   type="file" 
                                   multiple 
                                   accept="image/*" 
                                   onChange={handleImageChange} 
                                   className="hidden" 
                               />
                           </label>

                           {/* Previews */}
                           {imageUrls.map((url, i) => (
                               <div key={i} className="relative h-32 rounded-xl overflow-hidden group shadow-sm">
                                   <img src={url} alt="preview" className="w-full h-full object-cover" />
                                   <button 
                                      type="button" 
                                      onClick={() => removeImage(i)}
                                      className="absolute top-1 right-1 bg-white/90 p-1 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                   >
                                      <X size={14} />
                                   </button>
                               </div>
                           ))}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button 
                           type="submit" 
                           className="w-full md:w-auto px-8 py-3 bg-primary-green text-white font-bold rounded-xl hover:bg-primary-dark shadow-lg shadow-green-900/10 hover:shadow-green-900/20 transition-all transform hover:-translate-y-0.5"
                        >
                           Publish Product
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default AddProduct;
