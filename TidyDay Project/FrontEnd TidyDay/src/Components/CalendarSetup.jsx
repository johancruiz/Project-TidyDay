import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Modal from "react-modal";
import "./MyCalendar.css"; // Asegúrate de que este archivo esté presente

const localizer = momentLocalizer(moment);

Modal.setAppElement("#root");

const MyCalendar = () => {
  const userId = localStorage.getItem("userId") || "defaultUser";
  const userName = localStorage.getItem("userName") || "Guest";

  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem(`events-${userId}`);
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  useEffect(() => {
    localStorage.setItem(`events-${userId}`, JSON.stringify(events));
  }, [events, userId]);

  const openModal = ({ start, end }) => {
    setNewEvent({ ...newEvent, start, end });
    setModalIsOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.classList.remove("modal-open");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEvent.title) {
      setEvents((prevEvents) => [...prevEvents, { ...newEvent, userName }]);
      closeModal();
    }
  };

  return (
    <div>
      <h2>Calendar for {userName}</h2>
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          onSelectSlot={openModal}
          views={["month", "agenda"]}
          defaultView="month"
        />
      </div>

      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Add Event"
  style={{
    content: {
      background: "#020817",
      color: "white",
      padding: "20px",
      maxWidth: "500px",
      margin: "5% auto",
      borderRadius: "8px",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
      position: "relative",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  }}
>

        <h2 className="modal-title">Add New Event</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label className="modal-label">
            Event Title:
            <input
              type="text"
              className="modal-input"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              required
            />
          </label>
          <label className="modal-label">
            Start Time:
            <input
              type="datetime-local"
              className="modal-input"
              value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
              required
            />
          </label>
          <label className="modal-label">
            End Time:
            <input
              type="datetime-local"
              className="modal-input"
              value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
              required
            />
          </label>
          <div className="modal-buttons">
            <button type="submit" className="modal-button modal-button-submit">
              Add Event
            </button>
            <button type="button" className="modal-button modal-button-cancel" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyCalendar;
