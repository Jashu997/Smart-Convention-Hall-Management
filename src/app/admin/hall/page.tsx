"use client";

import { useEffect, useState } from "react";

type Hall = {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  capacity: number;
  mapUrl: string;
  heroImage: string;
};

export default function HallPage() {
  const [hallData, setHallData] = useState<Hall[]>([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    capacity: "",
    mapUrl: "",
    heroImage: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  async function loadHall() {
    const res = await fetch("/api/hall");
    const data = await res.json();
    setHallData(data);
  }

  useEffect(() => {
    void (async () => {
      try {
        await loadHall();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  async function addHall(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/hall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        capacity: Number(form.capacity),
      }),
    });

    if (response.ok) {
      setForm({
        name: "",
        description: "",
        address: "",
        phone: "",
        email: "",
        capacity: "",
        mapUrl: "",
        heroImage: "",
      });

      loadHall();
    } else {
      alert("Failed to add hall details");
    }
  }

  function editHall(hall: Hall) {
    setEditingId(hall.id);
    setIsEditing(true);

    setForm({
      name: hall.name,
      description: hall.description,
      address: hall.address,
      phone: hall.phone,
      email: hall.email,
      capacity: hall.capacity.toString(),
      mapUrl: hall.mapUrl,
      heroImage: hall.heroImage,
    });
  }

  async function updateHall(e: React.FormEvent) {
    e.preventDefault();

    if (!editingId) return;

    const response = await fetch(`/api/hall/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        capacity: Number(form.capacity),
      }),
    });

    if (response.ok) {
      setEditingId(null);
      setIsEditing(false);

      setForm({
        name: "",
        description: "",
        address: "",
        phone: "",
        email: "",
        capacity: "",
        mapUrl: "",
        heroImage: "",
      });

      loadHall();
    } else {
      alert("Failed to update hall details");
    }
  }

  async function deleteHall(id: string) {
    if (!window.confirm("Delete this hall record?")) return;

    const response = await fetch(`/api/hall/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadHall();
    } else {
      alert("Failed to delete hall details");
    }
  }
  return (
  <div className="p-8">
    <div className="mb-10">
      <h1 className="text-4xl font-bold text-cyan-400">
        Hall Details Management
      </h1>

      <p className="mt-2 text-slate-400">
        Manage your convention hall information.
      </p>
    </div>

    <form
      onSubmit={isEditing ? updateHall : addHall}
      className="mb-10 space-y-4 rounded-2xl bg-slate-900 p-6"
    >
      <input
        type="text"
        placeholder="Hall Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        required
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        required
      />

      <input
        type="text"
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        required
      />

      <input
        type="text"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        required
      />

      <input
        type="number"
        placeholder="Capacity"
        value={form.capacity}
        onChange={(e) => setForm({ ...form, capacity: e.target.value })}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        required
      />

      <input
        type="text"
        placeholder="Google Map URL"
        value={form.mapUrl}
        onChange={(e) => setForm({ ...form, mapUrl: e.target.value })}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
      />

      <input
        type="text"
        placeholder="Hero Image URL"
        value={form.heroImage}
        onChange={(e) =>
          setForm({ ...form, heroImage: e.target.value })
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
      />

      <button
        type="submit"
        className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950"
      >
        {isEditing ? "Update Hall" : "Add Hall"}
      </button>
    </form>

    <div className="space-y-6">
      {hallData.map((hall) => (
        <div
          key={hall.id}
          className="rounded-xl border border-slate-800 bg-slate-900 p-6"
        >
          <h2 className="text-2xl font-bold text-white">
            {hall.name}
          </h2>

          <p className="mt-2 text-slate-300">
            {hall.description}
          </p>

          <div className="mt-4 space-y-2 text-slate-400">
            <p><strong>Address:</strong> {hall.address}</p>
            <p><strong>Phone:</strong> {hall.phone}</p>
            <p><strong>Email:</strong> {hall.email}</p>
            <p><strong>Capacity:</strong> {hall.capacity}</p>
            <p><strong>Map:</strong> {hall.mapUrl}</p>
            <p><strong>Hero Image:</strong> {hall.heroImage}</p>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => editHall(hall)}
              className="rounded-lg bg-yellow-500 px-4 py-2 font-medium text-black hover:bg-yellow-600"
            >
              Edit
            </button>

            <button
              onClick={() => deleteHall(hall.id)}
              className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}