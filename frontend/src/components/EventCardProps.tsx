interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  total_tickets: number;
  available_tickets: number;
}

interface EventCardProps {
  event: Event;
  onEdit?: (id: string) => void; 
  onDelete?: (id: string) => void; 
}


export default function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  return (
    <div className="relative max-w-md mx-auto border-2 border-dashed rounded-lg border-gray-400 bg-gradient-to-r from-slate-700 to-slate-900 shadow-md hover:shadow-xl shadow-white transition-transform duration-200 hover:-translate-y-1">
      <div className="px-6 py-4">
        <h3
          className="font-title text-2xl font-extrabold text-gray-800 dark:text-white text-center uppercase tracking-wider"
          role="heading"
        >
          {event.name}
        </h3>
        <p
          className="text-sm text-gray-800 dark:text-gray-200 text-center mt-2"
          data-testid="event-info"
        >
          📅 {new Date(event.date).toLocaleDateString()} | 📍 {event.location}
        </p>
        <hr className="my-3 border-t border-gray-400" />
        <p className="text-md text-gray-900 dark:text-gray-100 truncate text-center italic">
          "{event.description}"
        </p>
        <div
          className="flex justify-between mt-4 text-gray-800 dark:text-gray-200"
          data-testid="tickets-info"
        >
          <span className="font-bold">Tickets:</span>
          <span className="font-medium">
            🎟️ {event.available_tickets}/{event.total_tickets}
          </span>
        </div>
        {onEdit || onDelete ? (
          <div className="mt-4 flex gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(event.id)}
                className="flex-1 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(event.id)}
                className="flex-1 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
              >
                Delete
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

