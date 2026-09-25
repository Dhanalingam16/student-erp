'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Download,
  Filter,
  CheckSquare,
  Square,
  FileSpreadsheet,
  Printer,
  MoreVertical,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T | string;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchPlaceholder?: string;
  searchKey?: keyof T | ((item: T) => string);
  filterOptions?: {
    label: string;
    key: keyof T | string;
    options: { label: string; value: string }[];
  }[];
  bulkActions?: {
    label: string;
    action: (selectedRows: T[]) => void;
    variant?: 'primary' | 'danger' | 'outline';
  }[];
  exportFileName?: string;
  title?: string;
  actions?: React.ReactNode;
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  searchPlaceholder = 'Search records...',
  searchKey,
  filterOptions = [],
  bulkActions = [],
  exportFileName = 'school-erp-export',
  title,
  actions,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string | number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 1. Filter logic
  const filteredData = useMemo(() => {
    return data.filter((item: any) => {
      // Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        let matchesSearch = false;
        if (typeof searchKey === 'function') {
          matchesSearch = searchKey(item).toLowerCase().includes(query);
        } else if (searchKey && item[searchKey]) {
          matchesSearch = String(item[searchKey]).toLowerCase().includes(query);
        } else {
          // Search across all string values
          matchesSearch = Object.values(item).some(
            (val) => val && String(val).toLowerCase().includes(query)
          );
        }
        if (!matchesSearch) return false;
      }

      // Dropdown filters
      for (const [key, value] of Object.entries(selectedFilters)) {
        if (value && item[key] !== value) {
          return false;
        }
      }

      return true;
    });
  }, [data, searchTerm, searchKey, selectedFilters]);

  // 2. Sort logic
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    return [...filteredData].sort((a: any, b: any) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal === bVal) return 0;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sortConfig.direction === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortConfig]);

  // 3. Pagination logic
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Selection handlers
  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row: any) => selectedRowIds.has(row.id));

  const toggleSelectAll = () => {
    const newSelected = new Set(selectedRowIds);
    if (isAllSelected) {
      paginatedData.forEach((row: any) => newSelected.delete(row.id));
    } else {
      paginatedData.forEach((row: any) => {
        if (row.id) newSelected.add(row.id);
      });
    }
    setSelectedRowIds(newSelected);
  };

  const toggleRow = (id: string | number) => {
    const newSelected = new Set(selectedRowIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRowIds(newSelected);
  };

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = columns.map((c) => c.header).join(',');
    const rows = sortedData.map((row: any) => {
      return columns
        .map((col) => {
          const val = col.accessorKey ? row[col.accessorKey] : '';
          return `"${String(val ?? '').replace(/"/g, '""')}"`;
        })
        .join(',');
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${exportFileName}-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden flex flex-col">
      {/* Table Toolbar */}
      <div className="p-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white">
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
          {/* Search Input */}
          <div className="relative flex-1 max-w-xs">
            <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 focus:border-navy-600 transition-colors"
            />
          </div>

          {/* Filter Dropdowns */}
          {filterOptions.map((f) => (
            <div key={String(f.key)} className="flex items-center text-xs">
              <select
                value={selectedFilters[String(f.key)] || ''}
                onChange={(e) => {
                  setSelectedFilters({ ...selectedFilters, [String(f.key)]: e.target.value });
                  setCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 text-slate-700 py-1.5 px-2.5 rounded text-xs focus:outline-none focus:ring-1 focus:ring-navy-600"
              >
                <option value="">All {f.label}</option>
                {f.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Actions & Export */}
        <div className="flex items-center gap-2">
          {actions}
          <Button variant="outline" size="sm" onClick={handleExportCSV} title="Export to CSV">
            <Download className="h-3.5 w-3.5 mr-1" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()} title="Print Table">
            <Printer className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Bulk Actions Banner */}
      {selectedRowIds.size > 0 && (
        <div className="bg-navy-900 text-white px-4 py-2 flex items-center justify-between text-xs animate-in fade-in">
          <span className="font-medium">
            {selectedRowIds.size} {selectedRowIds.size === 1 ? 'record' : 'records'} selected
          </span>
          <div className="flex items-center gap-2">
            {bulkActions.map((ba, idx) => (
              <Button
                key={idx}
                size="sm"
                variant={ba.variant || 'outline'}
                className="bg-navy-800 text-white border-navy-700 hover:bg-navy-700 text-xs h-7"
                onClick={() => {
                  const selectedItems = data.filter((d: any) => selectedRowIds.has(d.id));
                  ba.action(selectedItems);
                }}
              >
                {ba.label}
              </Button>
            ))}
            <button
              onClick={() => setSelectedRowIds(new Set())}
              className="text-navy-300 hover:text-white underline ml-2 text-xs"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Main Table Area */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700 border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px] select-none">
            <tr>
              {/* Checkbox column */}
              <th className="py-2.5 px-3 w-8">
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  className="flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {isAllSelected ? (
                    <CheckSquare className="h-4 w-4 text-navy-800" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                </button>
              </th>

              {columns.map((col, index) => {
                const isSorted = sortConfig?.key === col.accessorKey;
                return (
                  <th
                    key={index}
                    onClick={() => col.sortable && col.accessorKey && handleSort(String(col.accessorKey))}
                    className={`py-2.5 px-3 ${col.className || ''} ${
                      col.sortable ? 'cursor-pointer hover:bg-slate-100 transition-colors' : ''
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className="text-slate-400">
                          {isSorted ? (
                            sortConfig?.direction === 'asc' ? (
                              <ChevronUp className="h-3.5 w-3.5 text-navy-800 font-bold" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5 text-navy-800 font-bold" />
                            )
                          ) : (
                            <ChevronsUpDown className="h-3 w-3" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-8 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="font-medium text-slate-600">No records found</p>
                    <p className="text-xs text-slate-400">Try adjusting your search or active filters.</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row: any, rowIndex) => {
                const isSelected = selectedRowIds.has(row.id);
                return (
                  <tr
                    key={row.id || rowIndex}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isSelected ? 'bg-blue-50/50' : rowIndex % 2 === 1 ? 'bg-slate-50/30' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3">
                      <button
                        type="button"
                        onClick={() => toggleRow(row.id)}
                        className="flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                      >
                        {isSelected ? (
                          <CheckSquare className="h-4 w-4 text-navy-800" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </button>
                    </td>

                    {columns.map((col, colIndex) => (
                      <td key={colIndex} className={`py-2.5 px-3 text-slate-800 ${col.className || ''}`}>
                        {col.cell
                          ? col.cell(row)
                          : col.accessorKey
                          ? String(row[col.accessorKey] ?? '—')
                          : '—'}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-slate-200 bg-white rounded px-2 py-0.5 text-xs text-slate-700 focus:outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="ml-2">
            Showing {(currentPage - 1) * pageSize + 1} to{' '}
            {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} records
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="px-2 font-medium text-slate-700">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
