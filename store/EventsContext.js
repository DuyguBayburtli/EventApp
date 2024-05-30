import { createContext, useReducer, useState, useEffect } from 'react';
import { db } from '../firebase'; // Firestore bağlantısını içe aktar

export const EventsContext = createContext({
  events: [],
  isAdmin: false,
  addEvent: ({ description, amount, date }) => {},
  setEvents: (events) => {},
  deleteEvent: (id) => {},
  updateEvent: (id, { description, amount, date }) => {},
  loginAsAdmin: () => {},
  logout: () => {},
});

function eventsReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'DELETE':
      return state.filter((event) => event.id !== action.payload);
    case 'SET':
      return action.payload.reverse();
    case 'UPDATE':
      const updatableEventIndex = state.findIndex(
        (event) => event.id === action.payload.id
      );
      const updatedEvent = { ...state[updatableEventIndex], ...action.payload.data };
      const updatedEvents = [...state];
      updatedEvents[updatableEventIndex] = updatedEvent;
      return updatedEvents;
    default:
      return state;
  }
}

function EventsContextProvider({ children }) {
  const [eventsState, dispatch] = useReducer(eventsReducer, []);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsRef = db.collection('events');
      const snapshot = await eventsRef.get();
      const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      dispatch({ type: 'SET', payload: eventsData });
    };

    fetchEvents();
  }, []);

  function addEvent(eventData) {
    dispatch({ type: 'ADD', payload: eventData });
  }

  function deleteEvent(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function setEvents(events) {
    dispatch({ type: 'SET', payload: events });
  }

  function updateEvent(id, eventData) {
    dispatch({ type: 'UPDATE', payload: { id, data: eventData } });
  }

  function loginAsAdmin() {
    setIsAdmin(true);
  }

  function logout() {
    setIsAdmin(false);
  }

  const value = {
    events: eventsState,
    isAdmin,
    addEvent,
    setEvents,
    deleteEvent,
    updateEvent,
    loginAsAdmin,
    logout,
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}

export default EventsContextProvider;
