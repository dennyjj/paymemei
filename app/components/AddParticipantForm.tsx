import React, { useState } from 'react';

export interface Participant {
  name: string;
  amountPaid: number;
  needsToPay?: number;
  collectsFrom?: { name: string; amount: number }[];
}

interface AddParticipantFormProps {
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
}

export default function AddParticipantForm({ participants, setParticipants }: AddParticipantFormProps) {
  const [name, setName] = useState('');
  const [amountPaid, setAmountPaid] = useState(0);

  const handleAddParticipant = () => {
    const newParticipant: Participant = { name, amountPaid: parseFloat(amountPaid.toFixed(2)) };
    setParticipants([...participants, newParticipant]);
    setName('');
    setAmountPaid(0);
  };

  const calculateAmounts = () => {
    const totalAmount = participants.reduce((sum, p) => sum + p.amountPaid, 0);
    const equalShare = totalAmount / participants.length;

    return participants.map((p) => ({
      ...p,
      needsToPay: parseFloat((equalShare - p.amountPaid).toFixed(2)),
      collectsFrom: participants
        .filter((other) => other.amountPaid < equalShare && other !== p)
        .map((other) => ({
          name: other.name,
          amount: parseFloat(Math.min(equalShare - other.amountPaid, p.amountPaid - equalShare).toFixed(2)),
        })),
    }));
  };

  const updatedParticipants = calculateAmounts();

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Add Participant</h2>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 bg-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Amount Paid"
              value={amountPaid}
              onChange={(e) => setAmountPaid(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 bg-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={handleAddParticipant}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Add Participant
          </button>
        </form>
      </div>
      <div className="bg-black shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-2xl font-bold mb-4">Participants</h2>
        {updatedParticipants.map((p) => (
          <div key={p.name} className="mb-4 p-4 bg-gray-500 rounded-lg">
            <p className="font-semibold">
              {p.name} paid ${p.amountPaid.toFixed(2)} and needs to pay ${p.needsToPay.toFixed(2)}
            </p>
            {p.collectsFrom.length > 0 && (
              <div className="mt-2">
                <p className="font-medium">{p.name} collects:</p>
                <ul className="list-disc list-inside">
                  {p.collectsFrom.map((c) => (
                    <li key={c.name}>
                      {c.name} owes {p.name} ${c.amount.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
