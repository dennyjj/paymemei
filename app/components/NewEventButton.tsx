import React, { useState } from 'react';
import AddParticipantForm, { Participant } from './AddParticipantForm';
import EventOverview from './EventOverview';

export default function NewEventButton() {
  const [eventCreated, setEventCreated] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const handleCreateEvent = () => {
    setEventCreated(true);
  };

  return (
    <div className="flex justify-center mt-8">
      {!eventCreated ? (
        <button
          onClick={handleCreateEvent}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          New Event
        </button>
      ) : (
        <div>
          <AddParticipantForm participants={participants} setParticipants={setParticipants} />
          <EventOverview participants={participants} />
        </div>
      )}
    </div>
  );
}
