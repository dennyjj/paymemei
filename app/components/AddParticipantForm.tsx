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

const AddParticipantForm: React.FC<AddParticipantFormProps> = ({ participants, setParticipants }) => {
  const [name, setName] = useState('');
  const [amountPaid, setAmountPaid] = useState(0);

  const handleAddParticipant = () => {
    const newParticipant: Participant = { name, amountPaid };
    setParticipants([...participants, newParticipant]);
    setName('');
    setAmountPaid(0);
  };

  const calculateAmounts = () => {
    const totalAmount = participants.reduce((sum, p) => sum + p.amountPaid, 0);
    const equalShare = totalAmount / participants.length;

    return participants.map((p) => ({
      ...p,
      needsToPay: equalShare - p.amountPaid,
      collectsFrom: participants
        .filter((other) => other.amountPaid < equalShare && other !== p)
        .map((other) => ({
          name: other.name,
          amount: Math.min(equalShare - other.amountPaid, p.amountPaid - equalShare),
        })),
    }));
  };

  const updatedParticipants = calculateAmounts();

  return (
    <div>
      <form>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Amount Paid" value={amountPaid} onChange={(e) => setAmountPaid(Number(e.target.value))} />
        <button type="button" onClick={handleAddParticipant}>
          Add Participant
        </button>
      </form>
      <div>
        <h2>Participants</h2>
        {updatedParticipants.map((p) => (
          <div key={p.name}>
            <p>
              {p.name} paid ${p.amountPaid.toFixed(2)} and needs to pay ${p.needsToPay.toFixed(2)}
            </p>
            {p.collectsFrom.length > 0 && (
              <div>
                <p>{p.name} collects:</p>
                <ul>
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
};

export default AddParticipantForm;
