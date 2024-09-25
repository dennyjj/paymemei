'use client';

import React from 'react';
import NewEventButton from './components/NewEventButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Paymemei</h1>
        <NewEventButton />
      </div>
    </div>
  );
}
