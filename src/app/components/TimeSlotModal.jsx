// components/TimeSlotModal.jsx
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

  const getSlotStyle = (type, isBooked) => {
    if (isBooked)
      return "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed";
    if (type === "free")
      return "bg-[#D1FFC1] border-transparent text-black";
    if (type === "paid")
      return "bg-[rgba(209,255,193,0.1)] border-[#D1FFC1] text-black";
    return "border-gray-300 text-gray-700";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h3 className="text-lg font-semibold">Select Time Slot</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ×
          </button>
        </div>

        <div className="p-4 grid gap-2">
          {timeSlots.length > 0 ? (
            timeSlots.map(({ id, label, type }) => {
              const isBooked = bookedSlots.includes(label);
              const isSelected = selectedSlot === label;

              return (
                <button
                  key={id}
                  disabled={isBooked}
                  onClick={() => !isBooked && onSelectSlot(label)}
                  className={`px-4 py-2 rounded-md border text-left transition-all ${
                    isSelected
                      ? "ring-2 ring-teal-400"
                      : getSlotStyle(type, isBooked)
                  }`}
                >
                  {label}
                  {isBooked && " (Booked)"}
                  {type === "paid" && " (Paid)"}
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