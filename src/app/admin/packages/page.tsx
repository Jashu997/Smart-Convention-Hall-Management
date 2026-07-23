"use client";

import { useEffect, useState } from "react";

type Package = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  async function loadPackages() {
    try {
      const response = await fetch("/api/packages");

      if (!response.ok) {
        throw new Error("Failed to load packages");
      }

      const data = await response.json();

      setPackages(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function addPackage(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/packages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        price: Number(form.price),
        description: form.description,
      }),
    });

    if (response.ok) {
      setForm({
        name: "",
        price: "",
        description: "",
      });

      loadPackages();
    } else {
      alert("Failed to add package");
    }
  }

  function editPackage(pkg: Package) {
    setEditingId(pkg.id);
    setIsEditing(true);

    setForm({
      name: pkg.name,
      price: pkg.price.toString(),
      description: pkg.description,
    });
  }

  async function updatePackage(e: React.FormEvent) {
    e.preventDefault();

    if (!editingId) return;

    const response = await fetch(`/api/packages/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        price: Number(form.price),
        description: form.description,
      }),
    });

    if (response.ok) {
      setEditingId(null);
      setIsEditing(false);

      setForm({
        name: "",
        price: "",
        description: "",
      });

      loadPackages();
    } else {
      alert("Failed to update package");
    }
      }

  async function deletePackage(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this package?"
    );

    if (!confirmDelete) return;

    const response = await fetch(`/api/packages/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadPackages();
    } else {
      alert("Failed to delete package");
    }
  }

  useEffect(() => {
    void (async () => {
      try {
        await loadPackages();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="p-8">

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-cyan-400">
          Packages Management
        </h1>

        <p className="mt-2 text-slate-400">
          Manage all hall packages here.
        </p>
      </div>

      <form
        onSubmit={isEditing ? updatePackage : addPackage}
        className="mb-10 rounded-2xl bg-slate-900 p-6 space-y-4"
      >

        <h2 className="text-xl font-semibold text-white">
          {isEditing ? "Edit Package" : "Add New Package"}
        </h2>

        <input
          type="text"
          placeholder="Package Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: e.target.value,
            })
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          required
        />

        <button
          type="submit"
          className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950"
        >
          {isEditing ? "Update Package" : "Add Package"}
        </button>

      </form>

      <div className="overflow-hidden rounded-2xl border border-slate-800">

        <table className="min-w-full">

          <thead className="bg-slate-900">

            <tr>
              <th className="px-6 py-4 text-left">Package</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

  {packages.length === 0 ? (
    <tr>
      <td
        colSpan={4}
        className="px-6 py-10 text-center text-slate-400"
      >
        No packages found.
      </td>
    </tr>
  ) : (
    packages.map((pkg) => (
      <tr
        key={pkg.id}
        className="border-t border-slate-800"
      >
        <td className="px-6 py-4">
          {pkg.name}
        </td>

        <td className="px-6 py-4">
          ₹{pkg.price.toLocaleString()}
        </td>

        <td className="px-6 py-4">
          {pkg.description}
        </td>

        <td className="px-6 py-4">
          <div className="flex gap-2">

            <button
              onClick={() => editPackage(pkg)}
              className="rounded-lg bg-yellow-500 px-4 py-2 text-black hover:bg-yellow-600"
            >
              Edit
            </button>

            <button
              onClick={() => deletePackage(pkg.id)}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Delete
            </button>

          </div>
        </td>

      </tr>
    ))
  )}
  
        </tbody>

        </table>

      </div>

    </div>
  );
}