'use client';

import React from 'react';
import { useERPStore } from '@/lib/store';
import { Bus, MapPin, Phone, ShieldCheck, Clock, Navigation } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ParentTransportPage() {
  const { selectedChild, busRoutes } = useERPStore();
  const route = busRoutes[0]; // Route 12 for Aarav

  return (
    <div className="space-y-4 text-xs">
      {/* Route & Live Status Header */}
      <div className="bg-navy-950 text-white rounded-lg p-4 shadow-sm space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <Bus className="h-5 w-5 text-amber-400" />
              <h2 className="text-sm font-bold text-white">{route.routeNumber}</h2>
            </div>
            <p className="text-[11px] text-navy-200 mt-0.5">{route.routeName}</p>
          </div>
          <Badge variant="warning">ON ROUTE (MORNING)</Badge>
        </div>

        <div className="p-2.5 bg-navy-900 rounded border border-navy-800 flex items-center justify-between text-[11px]">
          <span className="text-navy-300">Designated Child Stop:</span>
          <span className="font-bold text-amber-300">{selectedChild.busStopName}</span>
        </div>
      </div>

      {/* Live Map Telemetry Simulation */}
      <div className="bg-slate-900 text-white rounded-lg p-4 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-[11px] font-semibold">Live GPS Telemetry</span>
          </div>
          <span className="text-amber-400 font-mono font-bold text-[11px]">Speed: 34 km/h</span>
        </div>

        <div className="p-3 bg-slate-800/90 rounded border border-slate-700 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
            Current Position
          </span>
          <p className="font-semibold text-slate-100 text-xs">
            Approaching Sector 11 Metro Station (ETA 4 mins)
          </p>
          <p className="text-[10px] text-slate-400 font-mono">Telemetry updated 5 seconds ago</p>
        </div>
      </div>

      {/* Crew Contacts */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-3">
        <h3 className="font-bold text-slate-800 uppercase text-[10px] tracking-wider border-b border-slate-100 pb-1.5">
          Designated Crew Contacts
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Driver</span>
            <p className="font-bold text-slate-900">{route.driverName}</p>
            <a
              href={`tel:${route.driverPhone}`}
              className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-mono font-bold"
            >
              <Phone className="h-3 w-3" />
              {route.driverPhone}
            </a>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Attendant</span>
            <p className="font-bold text-slate-900">{route.attendantName}</p>
            <a
              href={`tel:${route.attendantPhone}`}
              className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-mono font-bold"
            >
              <Phone className="h-3 w-3" />
              {route.attendantPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Stops Timeline */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-2.5">
        <h3 className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">
          Route 12 Scheduled Stops
        </h3>

        <div className="space-y-2">
          {route.stops.map((stop, idx) => (
            <div
              key={stop.stopId}
              className={`p-2.5 rounded border flex items-center justify-between ${
                stop.stopName === selectedChild.busStopName
                  ? 'bg-amber-50 border-amber-300 font-semibold ring-1 ring-amber-300'
                  : stop.status === 'passed'
                  ? 'bg-slate-50 border-slate-200 text-slate-500'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    stop.status === 'passed'
                      ? 'bg-emerald-600 text-white'
                      : stop.status === 'approaching'
                      ? 'bg-amber-500 text-white animate-pulse'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {idx + 1}
                </span>
                <div>
                  <p className="text-slate-900 font-medium">{stop.stopName}</p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Pickup: {stop.pickupTime} • Drop: {stop.dropTime}
                  </p>
                </div>
              </div>

              <span
                className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                  stop.status === 'passed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : stop.status === 'approaching'
                    ? 'bg-amber-200 text-amber-900'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {stop.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
