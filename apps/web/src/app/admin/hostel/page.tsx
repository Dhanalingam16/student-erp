'use client';

import React, { useState } from 'react';
import { Bed, Building, Users, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Room {
  roomNo: string;
  building: string;
  capacity: number;
  occupied: number;
  occupants: string[];
}

export default function HostelPage() {
  const [selectedBuilding, setSelectedBuilding] = useState<'Tagore Bhawan' | 'Shivaji Bhawan'>('Tagore Bhawan');

  const rooms: Room[] = [
    { roomNo: '201', building: 'Tagore Bhawan', capacity: 3, occupied: 3, occupants: ['Aditya Verma (10-A)', 'Manish Rawat (11-A)', 'Devansh Joshi (11-A)'] },
    { roomNo: '202', building: 'Tagore Bhawan', capacity: 3, occupied: 2, occupants: ['Karan Sethi (12-A)', 'Siddharth Rao (12-B)'] },
    { roomNo: '203', building: 'Tagore Bhawan', capacity: 3, occupied: 3, occupants: ['Nikhil Nair (9-A)', 'Gaurav Sen (9-B)', 'Varun Kapoor (9-A)'] },
    { roomNo: '204', building: 'Tagore Bhawan', capacity: 3, occupied: 1, occupants: ['Ayush Sharma (10-B)'] },
    { roomNo: '101', building: 'Shivaji Bhawan', capacity: 4, occupied: 4, occupants: ['Pranav Jha (12-A)', 'Arnav Ghosh (12-A)', 'Chirag Tomar (12-A)', 'Dhruv Saxena (12-A)'] },
    { roomNo: '102', building: 'Shivaji Bhawan', capacity: 4, occupied: 3, occupants: ['Harshit Verma (11-B)', 'Tushar Mehra (11-B)', 'Kunal Seth (11-B)'] },
  ];

  const currentRooms = rooms.filter((r) => r.building === selectedBuilding);
  const totalBeds = currentRooms.reduce((acc, r) => acc + r.capacity, 0);
  const occupiedBeds = currentRooms.reduce((acc, r) => acc + r.occupied, 0);

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Bed className="h-5 w-5 text-indigo-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Hostel Boarding & Bed Allocation
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Room occupancy, daily warden roll call, gate leaves, and residential mess catering.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded border border-slate-200 text-xs">
            <button
              onClick={() => setSelectedBuilding('Tagore Bhawan')}
              className={`px-3 py-1 font-semibold rounded ${
                selectedBuilding === 'Tagore Bhawan' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600'
              }`}
            >
              Tagore Bhawan (Senior Boys)
            </button>
            <button
              onClick={() => setSelectedBuilding('Shivaji Bhawan')}
              className={`px-3 py-1 font-semibold rounded ${
                selectedBuilding === 'Shivaji Bhawan' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600'
              }`}
            >
              Shivaji Bhawan (Junior Boys)
            </button>
          </div>
        </div>
      </div>

      {/* Occupancy Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <span className="text-slate-500 uppercase font-semibold text-[10px]">Total Bed Capacity</span>
          <p className="text-xl font-bold font-mono text-slate-900 mt-1">{totalBeds} Beds</p>
        </div>
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <span className="text-slate-500 uppercase font-semibold text-[10px]">Occupied Beds</span>
          <p className="text-xl font-bold font-mono text-emerald-700 mt-1">
            {occupiedBeds} ({Math.round((occupiedBeds / totalBeds) * 100)}% Occupancy)
          </p>
        </div>
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <span className="text-slate-500 uppercase font-semibold text-[10px]">Available Vacancies</span>
          <p className="text-xl font-bold font-mono text-blue-700 mt-1">{totalBeds - occupiedBeds} Beds</p>
        </div>
      </div>

      {/* Visual Bed Occupancy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {currentRooms.map((room) => (
          <div key={room.roomNo} className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="font-bold text-sm text-slate-900">Room {room.roomNo}</span>
              <Badge variant={room.occupied === room.capacity ? 'slate' : 'success'}>
                {room.occupied}/{room.capacity} Beds
              </Badge>
            </div>

            {/* Bed visual slots */}
            <div className="grid grid-cols-3 gap-1.5 py-1">
              {Array.from({ length: room.capacity }).map((_, bIdx) => (
                <div
                  key={bIdx}
                  className={`p-2 rounded border text-center font-mono font-bold text-[10px] ${
                    bIdx < room.occupied
                      ? 'bg-navy-900 text-white border-navy-900'
                      : 'bg-slate-50 text-slate-400 border-dashed border-slate-300'
                  }`}
                >
                  Bed {bIdx + 1}
                  <span className="block text-[8px] font-normal uppercase">
                    {bIdx < room.occupied ? 'Occupied' : 'Vacant'}
                  </span>
                </div>
              ))}
            </div>

            {/* Occupants List */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Occupants:
              </span>
              {room.occupants.map((occ, oIdx) => (
                <p key={oIdx} className="text-slate-700 font-medium truncate">
                  • {occ}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
