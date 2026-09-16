export const colors = {
  navy: {
    50: '#f0f4f8',
    100: '#d9e2ec',
    200: '#bcccdc',
    300: '#9fb3c8',
    400: '#829ab1',
    500: '#627d98',
    600: '#486581',
    700: '#334e68',
    800: '#243b53',
    900: '#102a43',
    950: '#0b1d3a', // Deep primary navy
  },
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  semantic: {
    success: {
      light: '#f0fdf4',
      border: '#bbf7d0',
      text: '#166534',
      solid: '#16a34a',
    },
    warning: {
      light: '#fffbeb',
      border: '#fef3c7',
      text: '#92400e',
      solid: '#d97706',
    },
    danger: {
      light: '#fef2f2',
      border: '#fecaca',
      text: '#991b1b',
      solid: '#dc2626',
    },
    info: {
      light: '#eff6ff',
      border: '#bfdbfe',
      text: '#1e40af',
      solid: '#2563eb',
    },
  },
  surface: {
    background: '#f8fafc',
    card: '#ffffff',
    sidebar: '#0f172a',
    border: '#e2e8f0',
  }
} as const;

export const typography = {
  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
  },
} as const;

export const radii = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  card: '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
} as const;
