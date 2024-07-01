export const dateFormatter = (dateString) => {
    if (!dateString) return 'Invalid date';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
  
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
  
      const formattedDate = new Intl.DateTimeFormat('default', options).format(date);
      return formattedDate.replace(',', '');
    } catch (error) {
      return 'Invalid date'
    }
  }
  