"use client";

import { useState, useEffect } from "react";
import API_BASE_URL from "../../utils/apiConfig";

interface Reservation {
  event_name: string;
  tickets: number;
  reservation_date: string;
  event_date: string;
  event_location: string;
}

interface GroupedReservation {
  event_name: string;
  reservation_date: string;
  total_tickets: number;
  event_date: string;
  event_location: string;
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<GroupedReservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/reservations`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data: Reservation[] = await response.json();
          console.log(data);

          const groupedReservations: GroupedReservation[] = [];

          data.forEach((reservation) => {
            const existing = groupedReservations.find(
              (r) => r.event_name === reservation.event_name
            );

            if (existing) {
              existing.total_tickets += reservation.tickets;
            } else {
              groupedReservations.push({
                event_name: reservation.event_name,
                reservation_date: reservation.reservation_date,
                total_tickets: reservation.tickets,
                event_date: reservation.event_date,
                event_location: reservation.event_location,
              });
            }
          });

          setReservations(groupedReservations);
        } else {
          console.error("Failed to fetch reservations");
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading reservations...</div>;
  }

  if (reservations.length === 0) {
    return <div className="text-center mt-10">No reservations found.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">My Reservations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((reservation, index) => (
          <div key={index}>
            <div
              className="relative max-w-md mx-auto border-2 border-dashed rounded-lg border-gray-400 bg-gradient-to-r from-slate-700 to-slate-900 shadow-md hover:shadow-xl shadow-white transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="px-10 py-4">
                <h3 className="font-title text-2xl font-extrabold text-gray-800 dark:text-white text-center uppercase tracking-wider">
                  {reservation.event_name}
                </h3>
                <p className="text-sm text-gray-800 dark:text-gray-200 text-center mt-2">
                  📅 {new Date(reservation.event_date).toLocaleDateString()} | 📍{" "}
                  {reservation.event_location}
                </p>
                <hr className="my-3 border-t border-gray-400" />
                <p className="text-md text-gray-900 dark:text-gray-100 truncate text-center italic">
                  Reserved on:{" "}
                  {new Date(reservation.reservation_date).toLocaleDateString()}
                </p>
                <div className="flex justify-between mt-4 text-gray-800 dark:text-gray-200">
                  <span className="font-bold">Tickets Reserved:</span>
                  <span className="font-medium">🎟️ {reservation.total_tickets}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
