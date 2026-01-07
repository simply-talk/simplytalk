"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { FiSearch, FiXCircle } from "react-icons/fi";
import { toast } from "sonner";

export default function BookingTable() {
    const [bookings, setBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [slotType, setSlotType] = useState("all");
    const [searchFocused, setSearchFocused] = useState(false);
    
    // Call status management
    const [callingStatus, setCallingStatus] = useState({});
    const [callHistory, setCallHistory] = useState({});
    
    useEffect(() => {
        async function fetchBookings() {
            try {
                const res = await fetch("/api/booking-data");
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                setBookings(data);
            } catch (err) {
                console.error("Error fetching bookings:", err);
            }
        }
        fetchBookings();
    }, []);

    const getDurationInMinutes = (timeSlot) => {
        if (!timeSlot) return 0;
        const [start, end] = timeSlot.split(" - ");
        const parse = (t) => {
            const [time, meridiem] = t.trim().split(" ");
            let [hours, minutes] = time.split(":").map(Number);
            if (meridiem === "PM" && hours !== 12) hours += 12;
            if (meridiem === "AM" && hours === 12) hours = 0;
            return hours * 60 + minutes;
        };
        return parse(end) - parse(start);
    };

    const getSlotType = (timeSlot) => {
        const duration = getDurationInMinutes(timeSlot);
        return duration <= 5 ? "Free" : "Paid";
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${d.getFullYear().toString().slice(-2)}`;
    };

    // Get call button state based on current status
    const getCallButtonState = (booking) => {
        const bookingId = booking.id || booking._id || `${booking.name}-${booking.date}`;
        const status = callingStatus[bookingId];
        
        switch (status) {
            case 'calling':
                return { 
                    text: 'Calling...', 
                    disabled: true, 
                    className: 'bg-yellow-100 text-yellow-800 cursor-not-allowed',
                    icon: 'calling'
                };
            case 'connected':
                return { 
                    text: 'Connected', 
                    disabled: true, 
                    className: 'bg-green-100 text-green-800 cursor-not-allowed',
                    icon: 'connected'
                };
            case 'error':
                return { 
                    text: 'Error', 
                    disabled: true, 
                    className: 'bg-red-100 text-red-800 cursor-not-allowed',
                    icon: 'error'
                };
            default:
                return { 
                    text: 'Call', 
                    disabled: false, 
                    className: 'bg-green-100 text-green-800 hover:bg-green-200',
                    icon: 'call'
                };
        }
    };

    // Render call button icon based on state
    const renderCallIcon = (iconType) => {
        const baseClasses = "w-3 h-3 mr-1";
        
        switch (iconType) {
            case 'calling':
                return (
                    <svg className={`${baseClasses} animate-pulse`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                );
            case 'connected':
                return (
                    <svg className={baseClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                );
            case 'error':
                return (
                    <svg className={baseClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                );
            default:
                return (
                    <svg className={baseClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                );
        }
    };

    const filtered = bookings.filter((b) => {
        const matchesName = b.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = selectedDate ? b.date === selectedDate : true;
        const matchesSlotType =
            slotType === "all" ? true : getSlotType(b.time_slot).toLowerCase() === slotType;
        return matchesName && matchesDate && matchesSlotType;
    });

    // Updated handleCall function with Twilio integration
    async function handleCall(booking) {
        const bookingId = booking.id || booking._id || `${booking.name}-${booking.date}`;
        
        try {
            // Set calling status
            setCallingStatus(prev => ({ ...prev, [bookingId]: 'calling' }));

            const response = await fetch('/api/make-call', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    toNumber: booking.phone,
                    fromNumber: '+918668838262', // Replace with your business number
                    bookingId: bookingId,
                    customerName: booking.name,
                    topic:booking.topic,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setCallingStatus(prev => ({ ...prev, [bookingId]: 'connected' }));
                setCallHistory(prev => ({
                    ...prev,
                    [bookingId]: {
                        callSid: result.callSid,
                        timestamp: new Date().toISOString(),
                        status: 'initiated'
                    }
                }));
                
                // Reset status after 5 seconds
                setTimeout(() => {
                    setCallingStatus(prev => ({ ...prev, [bookingId]: null }));
                }, 5000);
                
                toast.success('Call initiated successfully!');
            } else {
                throw new Error(result.error || 'Failed to make call');
            }
        } catch (error) {
            console.error('Error making call:', error);
            setCallingStatus(prev => ({ ...prev, [bookingId]: 'error' }));
            toast.error(`Error: ${error.message}`);
            
            // Reset error status after 3 seconds
            setTimeout(() => {
                setCallingStatus(prev => ({ ...prev, [bookingId]: null }));
            }, 3000);
        }
    }

    return (
        <>
            {/* Filter Section */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex flex-wrap items-center gap-4 justify-end">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                            className="w-64 px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
                            placeholder=" "
                        />
                        <label
                            className={`absolute left-4 transition-all duration-200 pointer-events-none bg-white px-1 rounded-sm ${searchTerm || searchFocused
                                ? "-top-2.5 text-xs text-blue-600 font-medium"
                                : "top-2 text-sm text-gray-500"
                                }`}
                        >
                            Search by name
                        </label>
                        <div className="absolute right-3 top-3 text-gray-400">
                            <FiSearch className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="relative z-50">
                        <DatePicker
                            selected={selectedDate ? new Date(selectedDate) : null}
                            onChange={(date) =>
                                setSelectedDate(date ? date.toISOString().split("T")[0] : "")
                            }
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Filter by date"
                            className="z-50 px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white w-44 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                            <FaCalendarAlt size={16} />
                        </div>
                    </div>

                    <div className="relative">
                        <select
                            value={slotType}
                            onChange={(e) => setSlotType(e.target.value)}
                            className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg text-sm bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer hover:border-gray-400"
                        >
                            <option value="all">All Slots</option>
                            <option value="free">Free Slots</option>
                            <option value="paid">Paid Slots</option>
                        </select>

                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-gray-400"
                            >
                                <polyline points="6,9 12,15 18,9"></polyline>
                            </svg>
                        </div>
                    </div>
                    <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedDate("");
                                setSlotType("all");
                            }}
                            className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:text-blue-600 hover:border-blue-400 transition-all"
                        >
                            <FiXCircle className="w-4 h-4" />
                            <span>Clear Filters</span>
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white mb-6 rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
                    <table className="min-w-full">
                        <thead className="sticky top-0 z-20 bg-gray-50">
                            <tr className="border-b border-gray-200">
                                <th className="px-6 py-4 sticky left-0 bg-gray-50 z-30 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Call Date</th>
    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Slot</th>
    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (₹)</th>
    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filtered.length > 0 ? (
                                filtered.map((b, i) => {
                                    const slot = getSlotType(b.time_slot);
                                    const isFree = slot === "Free";
                                    const bookingId = b.id || b._id || `${b.name}-${b.date}`;
                                    const buttonState = getCallButtonState(b);
                                    const hasCallHistory = callHistory[bookingId];
                                    
                                    return (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 sticky left-0 bg-white z-10 border-r border-gray-200 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                        <span className="text-sm font-medium text-blue-600">{b.name?.charAt(0)}</span>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{b.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{b.age}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{b.phone}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{formatDate(b.created_at)}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{formatDate(b.date)}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{b.time_slot}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {b.plan_type || (getDurationInMinutes(b.time_slot) > 15 ? "30-min" : "15-min")}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {b.amount ? `₹${b.amount}` : b.plan_type === "30-min" ? "₹499" : "₹249"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isFree ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>{slot}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{b.topic}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                                                <div className="truncate" title={b.short_description}>{b.short_description}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col items-center space-y-1">
                                                    <button
                                                        onClick={() => handleCall(b)}
                                                        disabled={buttonState.disabled}
                                                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${buttonState.className}`}
                                                    >
                                                        {renderCallIcon(buttonState.icon)}
                                                        {buttonState.text}
                                                    </button>
                                                    
                                                    {hasCallHistory && (
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(hasCallHistory.timestamp).toLocaleTimeString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={10} className="px-6 py-12 text-center text-gray-500 text-sm">
                                        <div className="flex flex-col items-center">
                                            <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <p className="text-gray-500 font-medium">No bookings found</p>
                                            <p className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

    // Updated handleCall function with Twilio integration
    async function handleCall(booking) {
        const bookingId = booking.id || booking._id || `${booking.name}-${booking.date}`;
        
        try {
            // Set calling status
            setCallingStatus(prev => ({ ...prev, [bookingId]: 'calling' }));

            const response = await fetch('/api/make-call', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    toNumber: booking.phone,
                    fromNumber: '+918668838262', // Replace with your business number
                    bookingId: bookingId,
                    customerName: booking.name,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setCallingStatus(prev => ({ ...prev, [bookingId]: 'connected' }));
                setCallHistory(prev => ({
                    ...prev,
                    [bookingId]: {
                        callSid: result.callSid,
                        timestamp: new Date().toISOString(),
                        status: 'initiated'
                    }
                }));
                
                // Reset status after 5 seconds
                setTimeout(() => {
                    setCallingStatus(prev => ({ ...prev, [bookingId]: null }));
                }, 5000);
                
                toast.success('Call initiated successfully!');
            } else {
                throw new Error(result.error || 'Failed to make call');
            }
        } catch (error) {
            console.error('Error making call:', error);
            setCallingStatus(prev => ({ ...prev, [bookingId]: 'error' }));
            toast.error(`Error: ${error.message}`);
            
            // Reset error status after 3 seconds
            setTimeout(() => {
                setCallingStatus(prev => ({ ...prev, [bookingId]: null }));
            }, 3000);
        }
    }

    
}