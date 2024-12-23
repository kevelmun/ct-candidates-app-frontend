"use client";

import { useState, useEffect } from "react";
import API_BASE_URL from "../../utils/apiConfig";
import EventCard from "@/components/EventCardProps";
import Link from "next/link";

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  total_tickets: number;
  available_tickets: number;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState({
    date: "",
    location: "",
    minTickets: "",
  });

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
          setFilteredEvents(data);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = events;

    if (filters.date) {
      filtered = filtered.filter(
        (event) => new Date(event.date).toLocaleDateString() === filters.date
      );
    }

    if (filters.location) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minTickets) {
      const minTickets = parseInt(filters.minTickets, 10);
      if (!isNaN(minTickets)) {
        filtered = filtered.filter(
          (event) => event.available_tickets >= minTickets
        );
      }
    }

    setFilteredEvents(filtered);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Filter Events</h1>

      {/* Filtro */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 text-gray-400">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded border border-gray-300"
          placeholder="Select Date"
        />
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded border border-gray-300"
          placeholder="Enter Location"
        />
        <input
          type="number"
          name="minTickets"
          value={filters.minTickets}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded border border-gray-300"
          placeholder="Minimum Tickets"
        />
        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
        >
          Apply Filters
        </button>
      </div>

      {/* Lista de eventos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Link key={event.id} href={`/principal/events/${event.id}`}>
              <EventCard
                key={event.id}
                event={{
                  id: event.id,
                  name: event.name,
                  description: event.description,
                  date: event.date,
                  location: event.location,
                  total_tickets: event.total_tickets,
                  available_tickets: event.available_tickets,
                }}
              />
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-white">No events found.</p>
        )}
      </div>
    </div>
  );
}
