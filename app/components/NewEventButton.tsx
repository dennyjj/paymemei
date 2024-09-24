import React, { useState } from 'react';
import AddParticipantForm, { Participant } from './AddParticipantForm';

const NewEventButton: React.FC = () => {
  const [eventCreated, setEventCreated] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const handleCreateEvent = () => {
    setEventCreated(true);
  };

  return (
    <div>
      {!eventCreated ? (
        <button onClick={handleCreateEvent}>New Event</button>
      ) : (
        <AddParticipantForm participants={participants} setParticipants={setParticipants} />
      )}
    </div>
  );
};

export default NewEventButton;
