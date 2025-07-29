"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

const genreOptions = ["Normal", "Down-Shoulder"];
const sizeOptions = ["S", "M", "L", "XL", "XXL"];
const stockOptions = ["In Stock", "Out of Stock"];

const AdminManageProducts = () => {
  const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

  const [products, setProducts] = useState({
    Normal: [],
    "Down-Shoulder": [],
  });

  const [formData, setFormData] = useState({
    genre: "Normal",
    name: "",
    price: 0,
    originalPrice: "",
    description: "",
    images: ["", "", "", ""],
    sizes: [],
    colors: [],
    stockStatus: "In Stock",
    newColor: "#000000",
  });

  const [imagePreviews, setImagePreviews] = useState(["", "", "", ""]);
  const [imageFiles, setImageFiles] = useState([null, null, null, null]);
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
    const res = await axios.get(`/api/genre-products`);

      setProducts(res.data);
    } catch (err) {
      console.error("❌ Failed to load products", err);
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({
      ...f,
      [name]: name === "price" || name === "originalPrice" ? Number(value) : value,
    }));
  };

  const handleImageUpload = (index, file) => {
    const files = [...imageFiles];
    const previews = [...imagePreviews];
    files[index] = file;
    previews[index] = URL.createObjectURL(file);
    setImageFiles(files);
    setImagePreviews(previews);
  };

  const toggleSize = (size) => {
    setFormData((f) => ({
      ...f,
      sizes: f.sizes.includes(size)
        ? f.sizes.filter((s) => s !== size)
        : [...f.sizes, size],
    }));
  };

  const addColor = () => {
    const color = formData.newColor;
    if (!formData.colors.includes(color) && formData.colors.length < 4) {
      setFormData((f) => ({
        ...f,
        colors: [...f.colors, color],
        newColor: "#000000",
      }));
    }
  };

  const removeColor = (color) => {
    setFormData((f) => ({
      ...f,
      colors: f.colors.filter((c) => c !== color),
    }));
  };

  const mergeEditedImages = (uploadedUrls) => {
    const merged = [...formData.images];
    for (let i = 0; i < 4; i++) {
      if (imageFiles[i]) {
        merged[i] = uploadedUrls.shift();
      }
    }
    return merged;
  };

  const handleAddOrUpdate = async () => {
    if (!formData.name || !formData.price || (!editingId && !imageFiles[0])) {
      alert("Name, price, and at least one image are required.");
      return;
    }

    try {
      const form = new FormData();
      form.append("genre", formData.genre);
      form.append("name", formData.name);
      form.append("price", formData.price);
      form.append("originalPrice", formData.originalPrice);
      form.append("description", formData.description);
      form.append("stockStatus", formData.stockStatus);
      form.append("sizes", JSON.stringify(formData.sizes));
      form.append("colors", JSON.stringify(formData.colors));

      imageFiles.forEach((file) => {
        if (file) form.append("images", file);
      });

      let res;
      if (editingId) {
        res = await axios.put(`${API_BASE}/api/genre-products/${editingId}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Product updated successfully");
      } else {
        res = await axios.post(`${API_BASE}/api/genre-products`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Product added successfully");
      }

      await fetchProducts();
      resetForm();
    } catch (err) {
      console.error("❌ Save failed", err.response?.data || err.message);
      alert("❌ Save failed");
    }
  };

  const handleEdit = (genre, id) => {
    const product = products[genre].find((p) => p._id === id);
    if (!product) return;

    const previews = product.images?.map((img) => img || "") || [];

    setFormData({
      ...product,
      newColor: "#000000",
    });

    setImagePreviews(previews);
    setImageFiles([null, null, null, null]);
    setEditingId(id);
  };

  const handleDelete = async (genre, id) => {
    try {
      await axios.delete(`${API_BASE}/api/genre-products/${id}`);
      await fetchProducts();
      alert("🗑️ Product deleted successfully");
    } catch (err) {
      console.error("❌ Delete failed", err);
      alert("❌ Delete failed");
    }
  };

  const resetForm = () => {
    setFormData({
      genre: "Normal",
      name: "",
      price: 0,
      originalPrice: "",
      description: "",
      images: ["", "", "", ""],
      sizes: [],
      colors: [],
      stockStatus: "In Stock",
      newColor: "#000000",
    });
    setImagePreviews(["", "", "", ""]);
    setImageFiles([null, null, null, null]);
    setEditingId(null);
  };

 return (
  <div className="min-h-screen bg-[#0f0e0d] text-[#f4ede4] px-4 py-10 sm:px-6 font-poppins">
    <h1 className="text-center text-2xl sm:text-3xl font-bold mb-6 text-[#d2b48c]">
      Manage Genre Products
    </h1>

    {/* Form */}
    <div className="max-w-6xl mx-auto bg-[#2b1e16] rounded-lg border border-[#3a2d00] p-4 sm:p-6 mb-10">
      <h2 className="text-lg sm:text-xl mb-4">{editingId ? "Edit Product" : "Add New Product"}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select name="genre" value={formData.genre} onChange={handleInput} className="bg-[#1a1715] p-2 rounded text-white w-full">
          {genreOptions.map((g) => <option key={g}>{g}</option>)}
        </select>

        <select name="stockStatus" value={formData.stockStatus} onChange={handleInput} className="bg-[#1a1715] p-2 rounded text-white w-full">
          {stockOptions.map((s) => <option key={s}>{s}</option>)}
        </select>

        <input name="name" value={formData.name} onChange={handleInput} placeholder="Product Name" className="bg-[#1a1715] p-2 rounded text-white w-full" />
        <input name="price" type="number" value={formData.price} onChange={handleInput} placeholder="Price" className="bg-[#1a1715] p-2 rounded text-white w-full" />
        <input name="originalPrice" type="number" value={formData.originalPrice} onChange={handleInput} placeholder="Original Price" className="bg-[#1a1715] p-2 rounded text-white w-full" />

        <textarea name="description" value={formData.description} onChange={handleInput} placeholder="Description" className="col-span-1 sm:col-span-2 bg-[#1a1715] p-2 rounded text-white w-full resize-none" />
      </div>

      {/* Sizes */}
      <div className="mt-4">
        <p className="text-[#d2b48c] mb-1">Sizes:</p>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((s) => (
            <label key={s} className={`border px-3 py-1 rounded cursor-pointer ${formData.sizes.includes(s) ? "bg-[#d2b48c] text-black" : "border-[#3a2d00]"}`}>
              <input type="checkbox" className="hidden" checked={formData.sizes.includes(s)} onChange={() => toggleSize(s)} />
              {s}
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="mt-6">
        <p className="text-[#d2b48c] mb-1">Add Color (Hex):</p>
        <div className="flex flex-wrap gap-4 mb-2">
          <input name="newColor" value={formData.newColor} onChange={handleInput} className="bg-[#1a1715] p-2 rounded text-white w-32" />
          <button type="button" onClick={addColor} disabled={formData.colors.length >= 4} className="bg-[#d2b48c] text-[#1a120a] px-4 py-1 rounded">
            Add
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {formData.colors.map((c) => (
            <div key={c} className="w-6 h-6 rounded-full border border-white cursor-pointer" style={{ backgroundColor: c }} onClick={() => removeColor(c)} title="Click to remove" />
          ))}
        </div>
      </div>

      {/* Image Uploads */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {imagePreviews.map((preview, i) => (
          <div key={i} className="flex flex-col">
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(i, e.target.files[0])} className="text-[#e8e1d9]" />
            {preview && <Image src={preview} alt={`Preview ${i + 1}`} width={100} height={100} className="rounded mt-1 object-cover" />}
          </div>
        ))}
      </div>

      <button onClick={handleAddOrUpdate} className="mt-6 w-full bg-[#d2b48c] text-[#1a120a] py-2 font-semibold rounded">
        {editingId ? "Update Product" : "Add Product"}
      </button>
    </div>

    {/* Product Display */}
  {genreOptions.map((genre) => (
  <div key={genre} className="max-w-6xl mx-auto mb-10">
    <h3 className="text-xl text-[#e8e1d9] mb-4">{genre} Products</h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products[genre]?.map((prod) => (
        <div key={prod._id} className="bg-[#1a1715] p-4 rounded-lg border border-[#3a2d00]">
          {/* Horizontal scrollable image carousel */}
          <div className="flex overflow-x-auto gap-2 mb-2 pb-1">
            {Array.isArray(prod.images) && prod.images.length > 0 ? (
              prod.images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`Product image ${i}`}
                  width={150}
                  height={150}
                  className="rounded object-cover w-[150px] h-[120px] flex-shrink-0"
                />
              ))
            ) : (
              <p className="text-sm text-red-400">No images</p>
            )}
          </div>

          <p className="text-lg font-semibold text-white">{prod.name}</p>
          <p className="text-sm text-[#e8e1d9]">{prod.description}</p>

          <p className="text-sm text-[#d2b48c] mt-1">₹{prod.price}</p>
          {prod.originalPrice && (
            <p className="text-xs line-through text-gray-400">₹{prod.originalPrice}</p>
          )}

          <p className="text-sm mt-1">Sizes: {prod.sizes?.join(", ")}</p>

          <div className="flex gap-1 items-center mt-1 flex-wrap">
            <p className="text-sm">Color:</p>
            {prod.colors?.map((c, i) => (
              <span key={i} className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: c }} />
            ))}
          </div>

          <p className={`mt-1 ${prod.stockStatus === "In Stock" ? "text-green-400" : "text-red-400"}`}>
            {prod.stockStatus}
          </p>

          <div className="flex justify-between mt-4 flex-wrap gap-2">
            <button onClick={() => handleEdit(genre, prod._id)} className="bg-blue-600 px-3 py-1 rounded text-white w-full sm:w-auto">
              Edit
            </button>
            <button onClick={() => handleDelete(genre, prod._id)} className="bg-red-600 px-3 py-1 rounded text-white w-full sm:w-auto">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
))}

  </div>
);

};

export default AdminManageProducts;
