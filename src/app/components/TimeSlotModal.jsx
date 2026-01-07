"use client";
import React from "react";

export default function TimeSlotModal({
  isOpen,
  onClose,
  timeSlots = [],
  bookedSlots = [],
  selectedSlot,
  onSelectSlot,
}) {
  if (!isOpen) return null;

  const getSlotStyle = (isBooked, isSelected) => {
    if (isBooked)
      return "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed";
    if (isSelected)
      return "ring-2 ring-teal-400 border-teal-400 bg-teal-50";
    return "border-gray-300 text-gray-700 hover:border-teal-400 hover:bg-teal-50";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Select Time Slot</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Slots List */}
        <div className="p-4 grid gap-2">
          {timeSlots.length > 0 ? (
            timeSlots.map(({ id, label, price, duration }) => {
              const isBooked = bookedSlots.includes(label);
              const isSelected = selectedSlot === label;

              return (
                <button
                  key={id}
                  disabled={isBooked}
                  onClick={() => !isBooked && onSelectSlot(label)}
                  className={`px-4 py-2 rounded-md border text-left transition-all ${getSlotStyle(
                    isBooked,
                    isSelected
                  )}`}
                >
                  {label} — ₹{price} ({duration})
                  {isBooked && " (Booked)"}
                </button>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm">No time slots available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
