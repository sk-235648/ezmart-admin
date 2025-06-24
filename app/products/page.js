'use client';
import { useState } from 'react';

export default function AddProductPage() {
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState('');
  const [expense, setExpense] = useState('');
  const [expenseError, setExpenseError] = useState('');

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
    if (value && parseFloat(value) < 0.1) {
      setExpenseError('Number must be greater than or equal to 0.1');
    } else {
      setExpenseError('');
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Upload Preview (Dummy for now) */}
        <div className="flex gap-3 mb-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-24 h-32 bg-gray-200 rounded-md overflow-hidden" />
          ))}
        </div>

        {/* Upload Image */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <button className="border border-gray-400 px-4 py-2 rounded-md text-sm font-medium bg-gray-100">
            + Upload Image
          </button>
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
              placeholder="Expense"
              className="w-full border border-gray-300 rounded-md p-2"
              value={expense}
              onChange={handleExpenseChange}
            />
            {expenseError && (
              <p className="text-red-600 text-sm mt-1">{expenseError}</p>
            )}
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
            placeholder="Tags"
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            onKeyDown={handleTagInput}
            className="w-full border border-gray-300 rounded-md p-2"
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
              placeholder="🔍 Collections"
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
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Submit
          </button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}