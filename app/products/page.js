'use client';
import { useState } from 'react';

export default function AddProductPage() {
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState('');
  const [expense, setExpense] = useState('');
  const [expenseError, setExpenseError] = useState('');
  const [category, setCategory] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState(['', '', '', '']);

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && inputTag.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(inputTag.trim())) {
        setTags([...tags, inputTag.trim()]);
      }
      setInputTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleExpenseChange = (e) => {
    const value = e.target.value;
    setExpense(value);
    setExpenseError(value && parseFloat(value) < 0.1 ? 'Number must be ≥ 0.1' : '');
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files).slice(0, 4);
    setImageFiles(selected);
  };

  const handleUpload = async () => {
    if (imageFiles.length === 0) return alert('Please select files to upload');

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
          alert('One of the uploads failed');
        }
      } catch (error) {
        console.error(error);
        alert('Upload error');
      }
    }

    const filled = [...urls];
    while (filled.length < 4) filled.push('');
    setUploadedImageUrls(filled);
    setIsUploading(false);
    alert('All images uploaded!');
  };

  const handleSubmit = () => {
    console.log('Submitted with:', {
      images: uploadedImageUrls,
      tags,
      expense,
      category,
    });
    alert('Form submitted! (Check console)');
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-4xl mx-auto rounded-xl shadow-lg p-8 space-y-8 bg-gray-100">

        {/* Image Previews */}
        <div className="flex gap-4 justify-start flex-wrap">
          {uploadedImageUrls.map((url, i) =>
            url ? (
              <img key={i} src={url} className="w-24 h-32 object-cover rounded-lg shadow-sm" alt={`Image ${i + 1}`} />
            ) : (
              <div key={i} className="w-24 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-300">
                No Image
              </div>
            )
          )}
        </div>

        {/* File Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Images (Max 4)</label>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border-2 border-emerald-400 rounded-md bg-emerald-50 text-gray-700 p-3 transition"
            />
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>

        {/* Price, Expense, Category */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              placeholder="0.0"
              className="w-full border border-gray-300 rounded-lg p-2"
              defaultValue="49.99"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expense ($)</label>
            <input
              type="number"
              value={expense}
              onChange={handleExpenseChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            {expenseError && <p className="text-red-600 text-xs mt-1">{expenseError}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 "
            >
              <option value="">Select Category</option>
              <option value="Shirts">Shirts</option>
              <option value="T-Shirts">T-Shirts</option>
              <option value="Jeans">Jeans</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input
            type="text"
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            onKeyDown={handleTagInput}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Press Enter to add"
          />
          <div className="flex flex-wrap mt-3 gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-300 transition"
                onClick={() => removeTag(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Collections / Colors / Sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Collections</label>
            <input
              type="text"
              placeholder="Collections"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Colors</label>
            <input
              type="text"
              placeholder="Colors"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sizes</label>
            <input
              type="text"
              placeholder="Sizes"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
          <button className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition">
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}
