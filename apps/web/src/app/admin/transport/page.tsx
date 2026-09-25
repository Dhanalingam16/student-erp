'use client';

import React, { useState } from 'react';
import { useERPStore } from '@/lib/store';
import { DataTable, ColumnDef } from '@/components/tables/DataTable';
import { BusRoute } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Bus,
  MapPin,
  Phone,
  Navigation,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

export default function TransportPage() {
  const { busRoutes } = useERPStore();
  const [selectedRoute, setSelectedRoute] = useState<BusRoute>(busRoutes[0]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Column defs for Fleet Table
  const fleetColumns: ColumnDef<BusRoute>[] = [
    {
      header: 'Route #',
      accessorKey: 'routeNumber',
      sortable: true,
      className: 'font-bold text-slate-900',
    },
    {
      header: 'Vehicle Model & Reg',
      accessorKey: 'busNumber',
      className: 'font-mono text-slate-700',
    },
    {
      header: 'Assigned / Cap',
      cell: (r) => (
        <span className="font-mono">
          {r.assignedStudents} / {r.capacity} Seats
        </span>
      ),
    },
    {
      header: 'Driver & Attendant',
      cell: (r) => (
        <div>
          <span className="font-semibold text-slate-900">{r.driverName}</span>
          <span className="block text-[10px] text-slate-400">
            Attendant: {r.attendantName} ({r.attendantPhone})
          </span>
        </div>
      ),
    },
    {
      header: 'Trip Status',
      accessorKey: 'currentStatus',
      sortable: true,
      cell: (r) => (
        <Badge variant={r.currentStatus === 'on_route' ? 'warning' : 'success'}>
          {r.currentStatus.toUpperCase()}
        </Badge>
      ),
    },
    {
      header: 'Tracking',
      cell: (r) => (
        <Button
          variant="outline"
          size="sm"
          className="h-6 px-2 text-[11px]"
          onClick={() => setSelectedRoute(r)}
        >
          <Navigation className="h-3 w-3 mr-1 text-blue-600" />
          Track
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Bus className="h-5 w-5 text-blue-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              School Transport Fleet & GPS Tracking
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Live telemetry, route stop progress, driver contact, and passenger safety logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="success">16 Buses Operational</Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSimulating(!isSimulating)}
            className="text-xs"
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${isSimulating ? 'animate-spin' : ''}`} />
            Live GPS Polling: 5s
          </Button>
        </div>
      </div>

      {/* Interactive Map & Telemetry Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* GPS Map Simulation Panel (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">
                  {selectedRoute.routeNumber}: {selectedRoute.routeName}
                </span>
                <Badge variant="warning">On Route (Morning)</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Bus: <span className="font-mono font-medium">{selectedRoute.busNumber}</span>
              </p>
            </div>
            <div className="text-right text-xs">
              <span className="text-slate-400 block text-[10px]">Speed Telemetry</span>
              <span className="font-mono font-bold text-slate-800">34 km/h (Normal)</span>
            </div>
          </div>

          {/* Interactive Map Graphic Canvas */}
          <div className="w-full h-64 bg-slate-900 rounded-lg border border-slate-800 p-4 relative overflow-hidden flex flex-col justify-between text-white">
            {/* Map Roads Overlay simulation */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path d="M 20 220 Q 150 180 280 120 T 550 40" fill="none" stroke="#60A5FA" strokeWidth="4" />
                <path d="M 0 100 H 600" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="4" />
                <path d="M 200 0 V 300" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="4" />
              </svg>
            </div>

            {/* Top Left GPS tag */}
            <div className="z-10 bg-slate-800/90 backdrop-blur-xs border border-slate-700 px-3 py-1.5 rounded inline-flex items-center gap-2 max-w-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <div className="text-[11px]">
                <p className="font-mono font-semibold text-white">GPS Coordinate: 28.5921° N, 77.0460° E</p>
                <p className="text-slate-300 text-[10px]">{selectedRoute.currentLocationName}</p>
              </div>
            </div>

            {/* Simulated Live Bus Icon on Route */}
            <div className="z-10 flex items-center justify-center my-auto">
              <div className="bg-amber-500 text-navy-950 p-2.5 rounded-full shadow-lg border-2 border-white animate-bounce flex items-center gap-1.5 font-bold text-xs">
                <Bus className="h-5 w-5" />
                <span>{selectedRoute.routeNumber}</span>
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="z-10 bg-slate-800/90 backdrop-blur-xs border border-slate-700 px-3 py-1.5 rounded flex items-center justify-between text-[11px]">
              <span>Next Designated Stop: Sector 10 District Court Crossing</span>
              <span className="font-mono text-amber-300 font-bold">Estimated Arrival: 07:32 AM</span>
            </div>
          </div>

          {/* Sequential Route Stop Progression */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Route Stop Progression & Schedule
            </h4>
            <div className="space-y-2">
              {selectedRoute.stops.map((stop, idx) => (
                <div
                  key={stop.stopId}
                  className={`p-3 rounded border text-xs flex items-center justify-between ${
                    stop.status === 'passed'
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                      : stop.status === 'approaching'
                      ? 'bg-amber-50 border-amber-300 font-semibold text-slate-900 ring-1 ring-amber-300'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        stop.status === 'passed'
                          ? 'bg-emerald-600 text-white'
                          : stop.status === 'approaching'
                          ? 'bg-amber-500 text-white animate-pulse'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{stop.stopName}</p>
                      <p className="text-[10px] text-slate-500 font-mono">
                        Pickup: {stop.pickupTime} • Drop: {stop.dropTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-slate-600">
                      {stop.studentsCount} Students
                    </span>
                    <span
                      className={`uppercase text-[10px] font-bold px-2 py-0.5 rounded ${
                        stop.status === 'passed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : stop.status === 'approaching'
                          ? 'bg-amber-200 text-amber-900 font-bold'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {stop.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Crew & Safety Details (1 col) */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider border-b border-slate-100 pb-2">
              Vehicle & Crew Master
            </h3>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Assigned Driver</span>
                <p className="font-bold text-slate-900 text-sm">{selectedRoute.driverName}</p>
                <p className="text-slate-600 font-mono flex items-center gap-1">
                  <Phone className="h-3 w-3 text-emerald-600" />
                  {selectedRoute.driverPhone}
                </p>
                <span className="text-[10px] text-slate-400 block">DL: DL-0420120094182 (Valid to 2029)</span>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Bus Attendant</span>
                <p className="font-bold text-slate-900 text-sm">{selectedRoute.attendantName}</p>
                <p className="text-slate-600 font-mono flex items-center gap-1">
                  <Phone className="h-3 w-3 text-emerald-600" />
                  {selectedRoute.attendantPhone}
                </p>
                <span className="text-[10px] text-slate-400 block">Verified Police Clearance (2026)</span>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Safety Equipment Checklist</span>
                <div className="space-y-1 pt-1 text-[11px] text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>CCTV Cameras Active (Front & Rear Cabin)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Speed Governor Locked at 40 km/h</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Certified First-Aid Kit & Fire Extinguisher</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Table */}
      <DataTable
        data={busRoutes}
        columns={fleetColumns}
        searchPlaceholder="Search routes or bus numbers..."
        searchKey="routeNumber"
        exportFileName="school-bus-fleet-report"
      />
    </div>
  );
}
