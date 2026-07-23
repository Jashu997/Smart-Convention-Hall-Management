"use client";

import { useEffect, useState } from "react";

type Service = {
  id: string;
  name: string;
  price: number;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  async function loadServices() {
    try {
      const response = await fetch("/api/services");

      if (!response.ok) {
        throw new Error("Failed to load services");
      }

      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function addService(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        price: Number(form.price),
      }),
    });

    if (response.ok) {
      setForm({
        name: "",
        price: "",
      });

      loadServices();
    } else {
      alert("Failed to add service");
    }
  }

  function editService(service: Service) {
    setEditingId(service.id);
    setIsEditing(true);

    setForm({
      name: service.name,
      price: service.price.toString(),
    });
  }

  async function updateService(e: React.FormEvent) {
    e.preventDefault();

    if (!editingId) return;

    const response = await fetch(`/api/services/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        price: Number(form.price),
      }),
    });

    if (response.ok) {
      setEditingId(null);
      setIsEditing(false);

      setForm({
        name: "",
        price: "",
      });

      loadServices();
    } else {
      alert("Failed to update service");
    }
  }
    async function deleteService(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmDelete) return;

    const response = await fetch(`/api/services/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadServices();
    } else {
      alert("Failed to delete service");
    }
  }

  useEffect(() => {
    void (async () => {
      try {
        await loadServices();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="p-8">

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-cyan-400">
          Services Management
        </h1>

        <p className="mt-2 text-slate-400">
          Manage all hall services here.
        </p>
      </div>

      <form
        onSubmit={isEditing ? updateService : addService}
        className="mb-10 rounded-2xl bg-slate-900 p-6 space-y-4"
      >

        <h2 className="text-xl font-semibold text-white">
          {isEditing ? "Edit Service" : "Add New Service"}
        </h2>

        <input
          type="text"
          placeholder="Service Name"
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

        <button
          type="submit"
          className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950"
        >
          {isEditing ? "Update Service" : "Add Service"}
        </button>

      </form>

      <div className="overflow-hidden rounded-2xl border border-slate-800">

        <table className="min-w-full">

          <thead className="bg-slate-900">
            <tr>
              <th className="px-6 py-4 text-left">Service</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
                        {services.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-10 text-center text-slate-400"
                >
                  No services found.
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr
                  key={service.id}
                  className="border-t border-slate-800"
                >
                  <td className="px-6 py-4">
                    {service.name}
                  </td>

                  <td className="px-6 py-4">
                    ₹{service.price.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">

                      <button
                        type="button"
                        onClick={() => editService(service)}
                        className="rounded-lg bg-yellow-500 px-4 py-2 text-black hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteService(service.id)}
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