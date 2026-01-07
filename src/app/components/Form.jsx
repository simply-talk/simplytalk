"use client";
import React from "react";

export default function Form({
  name,
  setName,
  phone,
  handlePhoneChange,
  language,
  setLanguage,
  topic,
  setTopic,
  age,
  setAge,
  shortDescription,
  setShortDescription,
  date,
  setDate,
  timeSlot,
  setTimeSlot,
  showTimeSlots,
  timeSlots,
  bookedSlots,
  loadingSlots,
  loadingSubmit,
  handleSubmit,
  getSlotDisplayLabel,
}) {
  const Dropdown = ({ children, ...props }) => (
    <div className="relative">
      <select
        {...props}
        className={
          "appearance-none w-full rounded-md border px-3 py-2 text-sm md:text-base bg-transparent focus:outline-none focus:ring-1 focus:ring-teal-400 pr-8 " +
          (props.className || "")
        }
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path
            d="M6 8l4 4 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );

  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-5 md:gap-4 md:grid-cols-2 max-w-xl">
        {/* Name */}
        <input
          type="text"
          placeholder="Enter your name"
          className="rounded-md border px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-teal-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Phone Number */}
        <input
          type="tel"
          placeholder="Enter contact number"
          className="rounded-md border px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-teal-400"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={10}
          pattern="\d{10}"
          inputMode="numeric"
          aria-invalid={phone.length > 0 && phone.length !== 10 ? "true" : "false"}
        />

        {/* Language Selector */}
        <Dropdown value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="" disabled>
            Choose language
          </option>
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
          <option value="marathi">Marathi</option>
        </Dropdown>

        {/* Topic Selector */}
        <Dropdown value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option value="" disabled>
            Choose topic
          </option>
          <option value="relationship">Relationship</option>
          <option value="career">Career</option>
          <option value="mental_health">Mental Health</option>
          <option value="family">Family</option>
          <option value="other">Other</option>
        </Dropdown>

        {/* Age Input */}
        <input
          type="number"
          placeholder="Enter your age"
          className="rounded-md border px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-teal-400 appearance-none"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          min="12"
          max="100"
        />

        {/* Short Description */}
        <textarea
          placeholder="Describe your concern briefly (optional)"
          className="rounded-md border px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-teal-400 md:col-span-2"
          rows={3}
          maxLength={150}
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
        />

        {/* Date Picker */}
        <div className="relative w-full">
          <input
            type="date"
            className="w-full rounded-md border px-3 py-2 text-sm md:text-base bg-transparent appearance-none focus:outline-none focus:ring-1 focus:ring-teal-400"
            value={date}
            min={getTodayDateString()}
            onChange={(e) => {
              setDate(e.target.value);
              setTimeSlot("");
            }}
            ref={(input) => (window._dateInput = input)}
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => window._dateInput?.showPicker?.()}
            tabIndex={0}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="#282F57" strokeWidth="2" />
              <path d="M16 3v4M8 3v4" stroke="#282F57" strokeWidth="2" strokeLinecap="round" />
              <rect x="7" y="10" width="2" height="2" rx="1" fill="#282F57" />
              <rect x="11" y="10" width="2" height="2" rx="1" fill="#282F57" />
              <rect x="15" y="10" width="2" height="2" rx="1" fill="#282F57" />
            </svg>
          </span>
        </div>

        {/* Time Slot Dropdown */}
        {showTimeSlots && (
          <Dropdown
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            disabled={loadingSlots || loadingSubmit}
            className="md:col-span-2"
          >
            <option value="" disabled>
              {loadingSlots ? "Loading slots..." : "Select time slot"}
            </option>
            {timeSlots.map((slot) => {
              const isBooked = bookedSlots.includes(slot.label);
              return (
                <option
                  key={slot.id}
                  value={slot.label}
                  disabled={isBooked}
                  className={isBooked ? "text-gray-400 bg-gray-100" : ""}
                >
                  {getSlotDisplayLabel(slot)}
                </option>
              );
            })}
          </Dropdown>
        )}

        {/* Submit Button */}
        <div className="md:col-span-2 flex items-center justify-center mt-5">
          <button
            type="submit"
            className={`w-full rounded-full bg-foreground px-3 py-2 text-white text-sm md:text-base hover:bg-slate-900 ${
              loadingSubmit ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={loadingSubmit || !timeSlot}
          >
            {loadingSubmit ? "Processing..." : "Pay & Book"}
          </button>
        </div>
      </div>
    </form>
  );
}
