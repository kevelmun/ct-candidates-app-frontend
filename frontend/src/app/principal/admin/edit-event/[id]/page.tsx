"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import API_BASE_URL from "../../../../utils/apiConfig";

interface Event {
    id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    total_tickets: number;
    available_tickets: number;
}

export default function EditEventPage() {
    const { id } = useParams();
    const router = useRouter();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [totalTicketsError, setTotalTicketsError] = useState("");
    const [reservedTickets, setReservedTickets] = useState(0);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/events/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setEvent({
                        ...data,
                    });
                    setReservedTickets(data.total_tickets - data.available_tickets); 
                } else {
                    console.error("Failed to fetch event details");
                    router.push("/principal/admin");
                }
            } catch (error) {
                console.error("Error fetching event details:", error);
                router.push("/principal/admin");
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id, router]);

    const validateTotalTickets = (total: number) => {
      if (!event) return true;
      if (total < reservedTickets) {
          setTotalTicketsError(
              `The total tickets cannot be less than the reserved tickets (${reservedTickets}).`
          );
          return false;
      }
      setTotalTicketsError("");
      return true;
   };
  
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!event) return;

        // Validación del cliente
        const isTotalValid = validateTotalTickets(event.total_tickets);
        if (!isTotalValid) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/admin/events/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(event),
            });

            if (response.ok) {
                setMessage("Evento actualizado exitosamente!");
                setTimeout(() => {
                    router.push("/principal/admin");
                }, 2000);
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message || "No se pudo actualizar el evento."}`);
            }
        } catch (error) {
            console.error("Error updating event:", error);
            setMessage("Error al actualizar el evento.");
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (!event) {
        return <div className="text-center mt-10">Event not found!</div>;
    }

    // Validar si el formulario es válido para habilitar/deshabilitar el botón de envío
    const isFormValid = event.total_tickets >= reservedTickets;

    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Edit Event</h1>
        {message && (
            <p
                className={`mb-4 text-center text-lg ${
                    message.includes("Error") ? "text-red-500" : "text-green-500"
                }`}
            >
                {message}
            </p>
        )}
        <form onSubmit={handleUpdate} className="grid gap-4 max-w-lg mx-auto">
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
                    onChange={(e) => setEvent({ ...event, location: e.target.value })}
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-200">Total Tickets</label>
                <input
                    type="number"
                    value={event.total_tickets}
                    onChange={(e) => {
                        const total = parseInt(e.target.value, 10);
                        setEvent({ ...event, total_tickets: total });
                        validateTotalTickets(total);
                    }}
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                    required
                />
                {totalTicketsError && (
                    <p className="text-red-500 text-sm mt-1">{totalTicketsError}</p>
                )}
            </div>
            <p className="text-gray-400 text-sm">
                Reserved Tickets: {reservedTickets}
            </p>
            <button
                type="submit"
                disabled={!isFormValid}
                className={`px-4 py-2 ${
                    isFormValid ? "bg-blue-700 hover:bg-blue-800" : "bg-gray-500 cursor-not-allowed"
                } text-white rounded`}
            >
                Update Event
            </button>
        </form>
      </div>
    );
}
