import React from 'react';

interface Participant {
  name: string;
  amountPaid: number;
}

interface EventOverviewProps {
  participants: Participant[];
}

export default function EventOverview({ participants }: EventOverviewProps) {
  const totalAmount = participants.reduce((sum, p) => sum + p.amountPaid, 0);
  const equalShare = totalAmount / participants.length;

  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded px-8 pt-6 pb-8">
      <h2 className="text-2xl font-bold mb-4">Event Overview</h2>
      <p className="text-lg font-semibold mb-4">Total Amount: ${totalAmount.toFixed(2)}</p>
      <p className="text-lg font-semibold mb-4">Amount Per Person: ${equalShare.toFixed(2)}</p>
    </div>
  );
}
