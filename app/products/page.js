'use client';
import { useState } from 'react';

export default function AddProductPage() {
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState('');
  const [expense, setExpense] = useState('');
  const [expenseError, setExpenseError] = useState('');

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
    const selected = Array.from(e.target.files).slice(0, 4); // Max 4
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
    });
    alert('Form submitted! (Check console)');
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
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

        {/* Single File Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Images (Max 4)</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="flex-1 border-2 border-emerald-400 rounded-lg bg-emerald-50 text-gray-700 p-3"
            />
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>

        {/* Price / Expense / Category */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              placeholder="0.0"
              className="w-full border border-gray-300 rounded-md p-2"
              defaultValue="49.99"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expense ($)</label>
            <input
              type="number"
              value={expense}
              onChange={handleExpenseChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {expenseError && <p className="text-red-600 text-sm mt-1">{expenseError}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              placeholder="Category"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input
            type="text"
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            onKeyDown={handleTagInput}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Press Enter to add"
          />
          <div className="flex flex-wrap mt-2 gap-2">
            {tags.map((tag, idx) => (
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
              placeholder="Collections"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Colors</label>
            <input
              type="text"
              placeholder="Colors"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sizes</label>
            <input
              type="text"
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
