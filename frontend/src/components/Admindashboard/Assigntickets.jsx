import React from 'react'

export default function Assigntickets() {
  return (
    <div className="max-w-fit p-4 ml-10">
      <h2 className="text-xl font-semibold mb-4">Assign Tickets to Technicians</h2>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Ticket ID"
                className="w-full border p-2 rounded-md"
              />
              <select className="w-full border p-2 rounded-md">
                <option>Select Technician</option>
                <option value="tech1">John - Technician</option>
                <option value="tech2">Jane - Technician</option>
              </select>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Assign Ticket
              </button>
            </form>
    </div>
  )
}
