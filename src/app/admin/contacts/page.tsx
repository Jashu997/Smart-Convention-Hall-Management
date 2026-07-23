"use client";

import { useEffect, useState } from "react";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
};

export default function ContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  async function loadContacts() {
    const response = await fetch("/api/contact");
    const data = await response.json();
    setContacts(data);
  }

  useEffect(() => {
    void (async () => {
      try {
        await loadContacts();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  async function markAsRead(contact: Contact) {
    const response = await fetch(`/api/contact/${contact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: contact.status === "Unread" ? "Read" : "Unread",
      }),
    });

    if (response.ok) {
      loadContacts();
    } else {
      alert("Failed to update contact");
    }
  }

  async function deleteContact(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );

    if (!confirmDelete) return;

    const response = await fetch(`/api/contact/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadContacts();
    } else {
      alert("Failed to delete contact");
    }
  }
  return (
  <div className="p-8">
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-cyan-400">
        Contact Enquiries
      </h1>

      <p className="mt-2 text-slate-400">
        View and manage customer enquiries.
      </p>
    </div>

    <div className="overflow-hidden rounded-2xl border border-slate-800">
      <table className="min-w-full">
        <thead className="bg-slate-900">
          <tr>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Contact</th>
            <th className="px-6 py-4 text-left">Subject</th>
            <th className="px-6 py-4 text-left">Message</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-10 text-center text-slate-400"
              >
                No enquiries found.
              </td>
            </tr>
          ) : (
            contacts.map((contact) => (
              <tr
                key={contact.id}
                className="border-t border-slate-800"
              >
                <td className="px-6 py-4">
                  <div className="font-semibold">
                    {contact.name}
                  </div>

                  <div className="text-sm text-slate-400">
                    {contact.email}
                  </div>
                </td>

                <td className="px-6 py-4">
                  {contact.phone}
                </td>

                <td className="px-6 py-4">
                  {contact.subject}
                </td>

                <td className="max-w-sm px-6 py-4">
                  {contact.message}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      contact.status === "Unread"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {contact.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => markAsRead(contact)}
                      className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 hover:bg-cyan-600"
                    >
                      {contact.status === "Unread"
                        ? "Mark Read"
                        : "Mark Unread"}
                    </button>

                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
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