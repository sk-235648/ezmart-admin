// app/admin/signup/page.js
"use client";
import { useState } from "react";

export default function AdminSignup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(`${e.target.name} - ${e.target.value}`);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/admin/signup", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);

    if (res.ok) {
      setForm({ name: "", email: "", password: "" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Add Admin</h2>
        {message && <p className="text-sm mb-3 text-center">{message}</p>}
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={form.name}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={form.email}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={form.password}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Password"
          required
        />
        <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          Create Admin
        </button>
      </form>
    </div>
  );
}
