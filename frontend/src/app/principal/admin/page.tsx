"use client";

import { useState, useEffect } from "react";
import API_BASE_URL from "../../utils/apiConfig";
import EventCard from "@/components/EventCardProps";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  total_tickets: number;
  available_tickets: number;
}

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/events`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Failed to fetch admin events");
        }
      } catch (error) {
        console.error("Error fetching admin events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setMessage("Event deleted successfully.");
        setEvents(events.filter((event) => event.id !== id));
      } else {
        setMessage("Failed to delete event.");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      setMessage("Error deleting event.");
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/principal/admin/edit-event/${id}`);
  };

  const handleAddEvent = () => {
    router.push("/principal/admin/add-event");
  };

  return (
    <div className="p-8">
      <div className="flex flex-wrap gap-2 items-center justify-between mb-6">
        <h1 className="flex-1 text-3xl font-bold text-white">Admin Panel</h1>
        <button
          onClick={handleAddEvent}
          className="flex-2 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
        >
          Add New Event
        </button>
      </div>
      

      {message && (
        <p className="mb-4 text-center text-lg text-green-500">{message}</p>
      )}

      {loading ? (
        <div className="text-center mt-10 text-white">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="text-center mt-10 text-white">No events found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id}>
            <EventCard
              key={event.id}
              event={event}
              onEdit={() => handleEdit(event.id)}
              onDelete={() => handleDelete(event.id)}
            />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
