"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API_BASE_URL from "../../../utils/apiConfig";

export default function AddEventPage() {
  const router = useRouter();
  const [event, setEvent] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    total_tickets: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !event.name ||
      !event.description ||
      !event.date ||
      !event.location ||
      !event.total_tickets
    ) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...event,
          total_tickets: parseInt(event.total_tickets, 10),
        }),
      });

      if (response.ok) {
        setMessage("Event added successfully!");
        setTimeout(() => {
          router.push("/principal/admin");
        }, 2000);
      } else {
        const errorData = await response.json();
        setMessage(
          `Error: ${errorData.message || "Could not add the event."}`
        );
      }
    } catch (error) {
      console.error("Error adding event:", error);
      setMessage("Error adding the event.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Add New Event</h1>
      {message && (
        <p
          className={`mb-4 text-center text-lg ${
            message.includes("Error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-lg mx-auto">
        <div>
          <label className="block text-gray-200">Event Name</label>
          <input
            type="text"
            value={event.name}
            onChange={(e) => setEvent({ ...event, name: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-200">Description</label>
          <textarea
            value={event.description}
            onChange={(e) =>
              setEvent({ ...event, description: e.target.value })
            }
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-200">Date</label>
          <input
            type="date"
            value={event.date}
            onChange={(e) => setEvent({ ...event, date: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-200">Location</label>
          <input
            type="text"
            value={event.location}
            onChange={(e) =>
              setEvent({ ...event, location: e.target.value })
            }
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-200">Total Tickets</label>
          <input
            type="number"
            value={event.total_tickets}
            onChange={(e) =>
              setEvent({ ...event, total_tickets: e.target.value })
            }
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}
