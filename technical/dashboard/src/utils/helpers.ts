export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (date: Date): string => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateTime = (date: Date): string => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getWQIStatus = (value: number): 'good' | 'medium' | 'bad' => {
  if (value > 70) return 'good';
  if (value > 40) return 'medium';
  return 'bad';
};

export const getWQIColor = (value: number): string => {
  if (value > 70) return '#27AE60'; // Green
  if (value > 40) return '#F39C12'; // Yellow
  return '#E74C3C'; // Red
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active':
      return '#27AE60';
    case 'maintenance':
      return '#F39C12';
    case 'inactive':
      return '#95A5A6';
    default:
      return '#95A5A6';
  }
};

export const truncate = (text: string, length: number): string => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

export const roundToDecimals = (value: number, decimals: number): number => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Calculate average from array
 */
export const calculateAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
};

/**
 * Download file utility
 */
export const downloadFile = (content: string, filename: string, mimeType: string = 'text/plain') => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:${mimeType};charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

/**
 * Local storage utilities
 */
export const storage = {
  get: (key: string, defaultValue?: any) => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage?.getItem(key) : null;
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return defaultValue;
    }
  },
  set: (key: string, value: any) => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage?.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error writing to localStorage: ${key}`, error);
    }
  },
  remove: (key: string) => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage?.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing from localStorage: ${key}`, error);
    }
  },
};
