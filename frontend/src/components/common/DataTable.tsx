import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Download, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  onRowClick?: (item: T) => void;
  title?: string;
  subtitle?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  } | undefined;
  filterOptions?: {
    key: keyof T;
    label: string;
    options: { label: string; value: string }[];
  }[];
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchPlaceholder = 'Search records...',
  onRowClick,
  title,
  subtitle,
  primaryAction,
  filterOptions,
}: DataTableProps<T>) {
  const { lang, t } = useApp();
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => {
      const next = { ...prev };
      if (value === 'all' || !value) {
        delete next[key];
      } else {
        next[key] = value;
      }
      return next;
    });
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search check
      if (search.trim() !== '') {
        const query = search.toLowerCase();
        const matchesSearch = Object.values(item as Record<string, any>).some((val) =>
          val ? String(val).toLowerCase().includes(query) : false
        );
        if (!matchesSearch) return false;
      }

      // Dropdown filter checks
      for (const [key, filterVal] of Object.entries(activeFilters)) {
        const itemVal = (item as any)[key];
        if (itemVal && String(itemVal).toLowerCase() !== filterVal.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [data, search, activeFilters]);

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];

      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const strA = String(aVal).toLowerCase();
      const strB = String(bVal).toLowerCase();

      if (strA < strB) return sortDirection === 'asc' ? -1 : 1;
      if (strA > strB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (colKey?: keyof T) => {
    if (!colKey) return;
    if (sortColumn === colKey) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else setSortColumn(null);
    } else {
      setSortColumn(colKey);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Header bar */}
      {(title || primaryAction || searchPlaceholder || filterOptions) && (
        <div className="p-4 sm:p-5 border-b border-slate-200/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              {title && <h3 className="panel-title text-slate-900">{t(title)}</h3>}
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{t(subtitle)}</p>}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(lang === 'ar' ? 'تم تصدير التقرير التجريبي كملف CSV' : 'Simulated report exported as CSV/Excel')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                {lang === 'ar' ? 'تصدير' : 'Export'}
              </button>

              {primaryAction && (
                <button
                  onClick={primaryAction.onClick}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-2xs cursor-pointer"
                >
                  {primaryAction.icon}
                  {t(primaryAction.label)}
                </button>
              )}
            </div>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="relative flex-1 min-w-[220px]">
              <Search className={`w-4 h-4 absolute top-1/2 -translate-y-1/2 text-slate-400 ${lang === 'ar' ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={t(searchPlaceholder)}
                className={`w-full py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 transition-all ${
                  lang === 'ar' ? 'pr-9 pl-4' : 'pl-9 pr-4'
                }`}
              />
            </div>

            {filterOptions?.map((f) => (
              <div key={String(f.key)} className="flex items-center gap-1.5">
                <select
                  value={activeFilters[String(f.key)] || 'all'}
                  onChange={(e) => handleFilterChange(String(f.key), e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-700 font-medium focus:outline-none focus:border-slate-400 cursor-pointer"
                >
                  <option value="all">{lang === 'ar' ? `كل ${t(f.label)}` : `All ${f.label}`}</option>
                  {f.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {t(opt.label)}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className={`w-full text-xs ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-mono">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={{ width: col.width }}
                  onClick={() => col.sortable && handleSort(col.accessorKey)}
                  className={`px-4 py-3 font-semibold ${
                    col.sortable ? 'cursor-pointer select-none hover:text-slate-900' : ''
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {t(col.header)}
                    {col.sortable && col.accessorKey && (
                      <span className="text-slate-400">
                        {sortColumn === col.accessorKey ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="w-3.5 h-3.5 text-blue-600" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-blue-600" />
                          )
                        ) : (
                          <ChevronDown className="w-3 h-3 opacity-40" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={`transition-colors ${
                    onRowClick
                      ? 'cursor-pointer hover:bg-slate-50/80 group'
                      : 'hover:bg-slate-50/40'
                  }`}
                >
                  {columns.map((col, idx) => (
                    <td key={idx} className="px-4 py-3.5 text-slate-700 align-middle">
                      {col.cell
                        ? col.cell(item)
                        : col.accessorKey
                        ? String(item[col.accessorKey] ?? '')
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-slate-400">
                  <Filter className="w-8 h-8 mx-auto mb-2 text-slate-300 stroke-[1.5]" />
                  <p className="font-medium text-slate-600">
                    {lang === 'ar' ? 'لم يتم العثور على سجلات' : 'No records found'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {lang === 'ar' ? 'يرجى تعديل كلمات البحث أو خيارات التصفية.' : 'Try adjusting search keywords or active filters.'}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3.5 sm:px-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 bg-slate-50/30">
        <div>
          {lang === 'ar' ? (
            <>
              عرض{' '}
              <span className="font-semibold text-slate-700">
                {sortedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
              </span>{' '}
              إلى{' '}
              <span className="font-semibold text-slate-700">
                {Math.min(currentPage * pageSize, sortedData.length)}
              </span>{' '}
              من أصل <span className="font-semibold text-slate-700">{sortedData.length}</span> سجل
            </>
          ) : (
            <>
              Showing{' '}
              <span className="font-semibold text-slate-700">
                {sortedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
              </span>{' '}
              to{' '}
              <span className="font-semibold text-slate-700">
                {Math.min(currentPage * pageSize, sortedData.length)}
              </span>{' '}
              of <span className="font-semibold text-slate-700">{sortedData.length}</span> entries
            </>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 rounded border border-slate-200 bg-white text-slate-700 cursor-pointer"
          >
            <option value={5}>{lang === 'ar' ? '5 لكل صفحة' : '5 per page'}</option>
            <option value={10}>{lang === 'ar' ? '10 لكل صفحة' : '10 per page'}</option>
            <option value={25}>{lang === 'ar' ? '25 لكل صفحة' : '25 per page'}</option>
          </select>

          <div className="flex items-center space-x-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className={`w-4 h-4 text-slate-600 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </button>
            <span className="px-2 font-medium text-slate-700 font-mono">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className={`w-4 h-4 text-slate-600 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
