export const formatThaiDate = (dateString, format = 'long') => {
  if (!dateString) return ''
  const date = new Date(dateString)
  
  const options = format === 'long' 
    ? {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        calendar: 'buddhist'
      }
    : {
        year: '2-digit', 
        month: 'short', 
        day: 'numeric',
        calendar: 'buddhist'
      }

  return new Intl.DateTimeFormat('th-TH', options).format(date)
}

export const formatThaiTime = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  
  return new Intl.DateTimeFormat('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date) + ' น.'
}
