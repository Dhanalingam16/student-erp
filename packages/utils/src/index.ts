export function formatCurrency(amount: number, currency = 'INR'): string {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

export function calculateGrade(percentage: number): { grade: string; color: string } {
  if (percentage >= 90) return { grade: 'A+', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  if (percentage >= 80) return { grade: 'A', color: 'text-blue-700 bg-blue-50 border-blue-200' };
  if (percentage >= 70) return { grade: 'B+', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
  if (percentage >= 60) return { grade: 'B', color: 'text-slate-700 bg-slate-50 border-slate-200' };
  if (percentage >= 50) return { grade: 'C', color: 'text-amber-700 bg-amber-50 border-amber-200' };
  return { grade: 'F', color: 'text-rose-700 bg-rose-50 border-rose-200' };
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
