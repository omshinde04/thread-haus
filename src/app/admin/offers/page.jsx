"use client";

import { useState, useEffect } from "react";

export default function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    discount: "",
    validFrom: "",
    validTo: "",
    text: "",
    icon: "gift",
  });

  // Fetch all offers
  useEffect(() => {
    fetchOffers();
  }, []);

  async function fetchOffers() {
    try {
      const res = await fetch("/api/offers");
      const data = await res.json();
      if (data.success) setOffers(data.data);
    } catch (err) {
      console.error("Fetch offers failed:", err);
    }
  }

  // Add new offer
  async function addOffer(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          discount: Number(form.discount),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setOffers([data.data, ...offers]);
        setForm({
          title: "",
          description: "",
          discount: "",
          validFrom: "",
          validTo: "",
          text: "",
          icon: "gift",
        });
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error("Add offer failed:", err);
    }
  }

  // Delete offer
  async function deleteOffer(id) {
    if (!confirm("Delete this offer?")) return;
    try {
      const res = await fetch(`/api/offers/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setOffers((prev) => prev.filter((o) => o._id !== id));
      } else {
        alert("Error deleting offer: " + data.error);
      }
    } catch (err) {
      console.error("Delete offer failed:", err);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-black">Manage Offers</h1>

      {/* Offer Form */}
      <form
        onSubmit={addOffer}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 border rounded-lg bg-white shadow text-black"
      >
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded text-black placeholder-gray-500"
          placeholder="Title"
          required
        />
        <input
          value={form.discount}
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
          type="number"
          min="0"
          max="100"
          className="border p-2 rounded text-black placeholder-gray-500"
          placeholder="Discount %"
          required
        />
        <input
          value={form.validFrom}
          onChange={(e) => setForm({ ...form, validFrom: e.target.value })}
          type="date"
          className="border p-2 rounded text-black"
          required
        />
        <input
          value={form.validTo}
          onChange={(e) => setForm({ ...form, validTo: e.target.value })}
          type="date"
          className="border p-2 rounded text-black"
          required
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded col-span-1 md:col-span-2 text-black placeholder-gray-500"
          placeholder="Description"
        />
        <input
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          className="border p-2 rounded col-span-1 md:col-span-2 text-black placeholder-gray-500"
          placeholder="Banner Text (for navbar)"
          required
        />
        <select
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
          className="border p-2 rounded col-span-1 md:col-span-2 text-black"
        >
          <option value="gift">🎁 Gift</option>
          <option value="bolt">⚡ Bolt</option>
          <option value="truck">🚚 Truck</option>
        </select>
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Add Offer
        </button>
      </form>

      {/* Offers List */}
      <div className="space-y-4">
        {offers.map((o) => (
          <div
            key={o._id}
            className="p-4 border rounded-lg bg-white shadow flex flex-col md:flex-row md:items-center md:justify-between text-black"
          >
            <div>
              <h2 className="text-lg font-semibold">{o.title}</h2>
              <p className="text-sm">{o.description}</p>
              <p className="text-sm">
                Discount: <span className="font-bold">{o.discount}%</span>
              </p>
              <p className="text-xs text-gray-600">
                {new Date(o.validFrom).toLocaleDateString()} →{" "}
                {new Date(o.validTo).toLocaleDateString()}
              </p>
              <p className="text-sm mt-1">
                Banner: <span className="italic">{o.text}</span> ({o.icon})
              </p>
            </div>
            <button
              onClick={() => deleteOffer(o._id)}
              className="mt-2 md:mt-0 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
