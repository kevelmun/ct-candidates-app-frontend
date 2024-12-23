import { render, screen } from "@testing-library/react";
import EventCard from "@/components/EventCardProps";

const mockEvent = {
  id: "1",
  name: "Sample Event",
  description: "This is a test event",
  date: "2024-12-26", 
  location: "Test Location",
  total_tickets: 100,
  available_tickets: 50,
};

describe("EventCard Component", () => {
  test("renders event details correctly", () => {
    render(<EventCard event={mockEvent} />);

    // Verificar que el nombre del evento se renderiza correctamente
    expect(screen.getByRole("heading", { name: /Sample Event/i })).toBeInTheDocument();

    // Obtener la fecha en el formato local
    const localDate = new Date(mockEvent.date).toLocaleDateString("en-US");

    // Verificar que la fecha y la ubicación se renderizan correctamente
    const eventInfo = screen.getByTestId("event-info");
    expect(eventInfo).toHaveTextContent(localDate);
    expect(eventInfo).toHaveTextContent("Test Location");

    // Verificar que los boletos se renderizan correctamente
    expect(screen.getByText(/🎟️ 50\/100/i)).toBeInTheDocument();
  });
});
