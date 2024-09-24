import React from 'react';

interface Participant {
  name: string;
  amountPaid: number;
  splitEqually: boolean;
}

interface EventOverviewProps {
  participants: Participant[];
}

const EventOverview: React.FC<EventOverviewProps> = ({ participants }) => {
  const totalAmount = participants.reduce((sum, p) => sum + p.amountPaid, 0);
  const equalShare = totalAmount / participants.length;

  return (
    <div>
      <h2>Event Overview</h2>
      <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      <ul>
        {participants.map((p, index) => (
          <li key={index}>
            {p.name} paid ${p.amountPaid.toFixed(2)} and needs to pay {p.splitEqually ? equalShare.toFixed(2) : p.amountPaid.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventOverview;
