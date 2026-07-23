"use client";

import { useEffect, useState } from "react";

type Gallery = {
  id: string;
  title: string;
  imageUrl: string;
};

export default function GalleryPage() {
  const [gallery, setGallery] = useState<Gallery[]>([]);

  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  async function loadGallery() {
    const response = await fetch("/api/gallery");

    if (response.ok) {
      const data = await response.json();
      setGallery(data);
    }
  }

  async function addImage(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/gallery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setForm({
        title: "",
        imageUrl: "",
      });

      loadGallery();
    }
  }

  function editImage(image: Gallery) {
    setEditingId(image.id);
    setIsEditing(true);

    setForm({
      title: image.title,
      imageUrl: image.imageUrl,
    });
  }

  async function updateImage(e: React.FormEvent) {
    e.preventDefault();

    if (!editingId) return;

    const response = await fetch(`/api/gallery/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setEditingId(null);
      setIsEditing(false);

      setForm({
        title: "",
        imageUrl: "",
      });

      loadGallery();
    }
  }

  async function deleteImage(id: string) {
    if (!confirm("Delete this image?")) return;

    const response = await fetch(`/api/gallery/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadGallery();
    }
  }

  useEffect(() => {
    void (async () => {
      try {
        await loadGallery();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="p-8">

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-cyan-400">
          Gallery Management
        </h1>

        <p className="mt-2 text-slate-400">
          Manage hall gallery images.
        </p>
      </div>

      <form
        onSubmit={isEditing ? updateImage : addImage}
        className="mb-10 rounded-2xl bg-slate-900 p-6 space-y-4"
      >

        <h2 className="text-xl font-semibold text-white">
          {isEditing ? "Edit Image" : "Add New Image"}
        </h2>

        <input
          type="text"
          placeholder="Image Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) =>
            setForm({
              ...form,
              imageUrl: e.target.value,
            })
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          required
        />

        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Preview"
            className="h-40 w-64 rounded-lg object-cover border border-slate-700"
          />
        )}

        <button
          type="submit"
          className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950"
        >
          {isEditing ? "Update Image" : "Add Image"}
        </button>

      </form>

      <div className="overflow-hidden rounded-2xl border border-slate-800">

        <table className="min-w-full">

          <thead className="bg-slate-900">
            <tr>
              <th className="px-6 py-4 text-left">Preview</th>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Image URL</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {gallery.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-slate-400"
                >
                  No images found.
                </td>
              </tr>
            ) : (
              gallery.map((image) => (
                <tr
                  key={image.id}
                  className="border-t border-slate-800"
                >

                  <td className="px-6 py-4">
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="h-20 w-28 rounded-lg object-cover"
                    />
                  </td>

                  <td className="px-6 py-4">
                    {image.title}
                  </td>

                  <td className="px-6 py-4 break-all">
                    {image.imageUrl}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">

                      <button
                        onClick={() => editImage(image)}
                        className="rounded-lg bg-yellow-500 px-4 py-2 text-black hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteImage(image.id)}
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