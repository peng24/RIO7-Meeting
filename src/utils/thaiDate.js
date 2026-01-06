// Utility to format dates to Thai locale without moment.js
export const formatThaiDate = (dateString, type = 'medium') => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) return '-';

  const options = {
    year: 'numeric',
    month: type === 'short' ? 'short' : 'long',
    day: 'numeric',
    calendar: 'buddhist'
  };

  try {
    return new Intl.DateTimeFormat('th-TH', options).format(date);
  } catch (e) {
    return dateString;
  }
};

export const formatThaiTime = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) return '-';

  try {
    return new Intl.DateTimeFormat('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date) + ' น.';
  } catch (e) {
    return '';
  }
};
