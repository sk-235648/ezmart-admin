"use client";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProductPage() {
  const [data, setData] = useState({
    title: "", // Added title field
    expense: "",
    category: "",
    price: "00",
    colors: "",
    sizes: "",
  });

  const [expenseError, setExpenseError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState(["", "", "", ""]);
  const fileInputRef = useRef(null);
  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    if (name === "expense") {
      setExpenseError(
        value && parseFloat(value) < 0.1 ? "Number must be ≥ 0.1" : ""
      );
    }
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files).slice(0, 4);
    setImageFiles(selected);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) {
      toast.error("Please select files to upload");
      return;
    }

    setIsUploading(true);
    const uploadedUrls = [];

    try {
      for (const file of imageFiles) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error(`Upload failed with ${res.status}`);
        const result = await res.json();

        if (result.url) {
          uploadedUrls.push(result.url);
        } else {
          throw new Error("No URL returned from upload");
        }
      }

      setUploadedImageUrls((prev) => {
        const newUrls = [...prev];
        uploadedUrls.forEach((url, index) => {
          newUrls[index] = url;
        });
        return newUrls;
      });

      toast.success("Images uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validImageUrls = uploadedImageUrls.filter((url) => url !== "");

    if (validImageUrls.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    if (!data.title) {
      toast.error("Please enter a product title");
      return;
    }

    const payload = {
      title: data.title, // Added title to payload
      price: parseFloat(data.price || "0"),
      expenses: data.expense !== "" ? parseFloat(data.expense) : 0,
      images: validImageUrls,
      category: data.category,
      colors: data.colors.trim(),
      sizes: data.sizes.trim(),
    };

    console.log("📦 Sending payload:", payload);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("❌ API Error Response:", result);
        throw new Error(result.error || "Submission failed");
      }

      toast.success("Product created successfully!");
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 py-6 md:py-10">
      <ToastContainer position="top-center" />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>
        
        {/* Image Previews */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {uploadedImageUrls.map((url, i) =>
            url ? (
              <div key={i} className="relative group">
                <img
                  src={url}
                  className="w-full h-32 sm:h-40 object-cover rounded-md border"
                  alt={`Image ${i + 1}`}
                />
              </div>
            ) : (
              <div
                key={i}
                className="w-full h-32 sm:h-40 bg-gray-100 rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm"
              >
                No Image
              </div>
            )
          )}
        </div>

        {/* File Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images (Max 4)
          </label>
          <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-3">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="flex-1 border-2 border-emerald-400 rounded-lg bg-emerald-50 text-gray-700 p-2 sm:p-3 text-sm sm:text-base"
            />
            <button
              type="submit"
              disabled={isUploading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
            >
              {isUploading ? "Uploading..." : "Upload Images"}
            </button>
          </form>
          <p className="mt-1 text-xs text-gray-500">
            Supported formats: JPG, PNG, WEBP (Max 5MB each)
          </p>
        </div>

        {/* Price, Expense, Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full border border-gray-300 rounded-md p-2 pl-8"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expense (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                name="expense"
                value={data.expense}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full border border-gray-300 rounded-md p-2 pl-8"
              />
            </div>
            {expenseError && (
              <p className="text-red-600 text-xs mt-1">{expenseError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
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
              <option value="Dresses">Dresses</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>

        {/* Title, Colors, Sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Title
            </label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Colors (comma separated)
            </label>
            <input
              type="text"
              name="colors"
              value={data.colors}
              onChange={handleChange}
              placeholder="Red, Blue, Green"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <p className="mt-1 text-xs text-gray-500">Example: Red,Blue,Green</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sizes (comma separated)
            </label>
            <input
              type="text"
              name="sizes"
              value={data.sizes}
              onChange={handleChange}
              placeholder="S,M,L,XL"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <p className="mt-1 text-xs text-gray-500">Example: S,M,L,XL</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex-1"
          >
            Save Product
          </button>
          <button 
            type="button"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors flex-1"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}