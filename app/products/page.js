'use client';
import { useState, useRef } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProductPage() {
  const [data, setData] = useState({
    tags: [],
    inputTag: '',
    expense: '',
    category: '',
    price: '49.99',
    collections: '',
    colors: '',
    sizes: ''
  });
  const [expenseError, setExpenseError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState(['', '', '', '']);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'expense') {
      setExpenseError(value && parseFloat(value) < 0.1 ? 'Number must be ≥ 0.1' : '');
    }
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && data.inputTag.trim() !== '') {
      e.preventDefault();
      if (!data.tags.includes(data.inputTag.trim())) {
        setData(prev => ({
          ...prev,
          tags: [...prev.tags, prev.inputTag.trim()],
          inputTag: ''
        }));
      } else {
        setData(prev => ({ ...prev, inputTag: '' }));
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files).slice(0, 4);
    setImageFiles(selected);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) {
      toast.error('Please select files to upload', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    setIsUploading(true);
    const urls = [];

    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.url) {
          urls.push(data.url);
        } else {
          toast.error('One of the uploads failed', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          break;
        }
      } catch (error) {
        console.error(error);
        toast.error('Upload error', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        break;
      }
    }

    const filled = [...urls];
    while (filled.length < 4) filled.push('');
    setUploadedImageUrls(filled);
    setIsUploading(false);
    
    toast.success('All images uploaded!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          images: uploadedImageUrls,
          tags: data.tags,
          expense: data.expense,
          category: data.category,
          price: data.price,
          collections: data.collections,
          colors: data.colors,
          sizes: data.sizes
        }),
      });

      if (!response.ok) throw new Error('Submission failed');
      
      toast.success('Form submitted successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      // Reset form
      setData({
        tags: [],
        inputTag: '',
        expense: '',
        category: '',
        price: '49.99',
        collections: '',
        colors: '',
        sizes: ''
      });
      setUploadedImageUrls(['', '', '', '']);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Submission failed. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">

        {/* Image Previews */}
        <div className="flex gap-3 mb-6">
          {uploadedImageUrls.map((url, i) =>
            url ? (
              <img key={i} src={url} className="w-24 h-32 object-cover rounded-md" alt={`Image ${i + 1}`} />
            ) : (
              <div key={i} className="w-24 h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-sm">
                No Image
              </div>
            )
          )}
        </div>

        {/* File Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Images (Max 4)</label>
          <form onSubmit={handleUpload} className="flex items-center gap-4">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="flex-1 border-2 border-emerald-400 rounded-lg bg-emerald-50 text-gray-700 p-3"
            />
            <button
              type="submit"
              disabled={isUploading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>

        {/* Price, Expense, Category */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              placeholder="0.0"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expense ($)</label>
            <input
              type="number"
              name="expense"
              value={data.expense}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {expenseError && <p className="text-red-600 text-sm mt-1">{expenseError}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={data.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
            >
              <option value="">Select Category</option>
              <option value="Shirts">Shirts</option>
              <option value="T-Shirts">T-Shirts</option>
              <option value="Jeans">Jeans</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input
            type="text"
            name="inputTag"
            value={data.inputTag}
            onChange={handleChange}
            onKeyDown={handleTagInput}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Press Enter to add"
          />
          <div className="flex flex-wrap mt-2 gap-2">
            {data.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm cursor-pointer"
                onClick={() => removeTag(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Collections / Colors / Sizes */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Collections</label>
            <input
              type="text"
              name="collections"
              value={data.collections}
              onChange={handleChange}
              placeholder="Collections"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Colors</label>
            <input
              type="text"
              name="colors"
              value={data.colors}
              onChange={handleChange}
              placeholder="Colors"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sizes</label>
            <input
              type="text"
              name="sizes"
              value={data.sizes}
              onChange={handleChange}
              placeholder="Sizes"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
          <button className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400">
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}