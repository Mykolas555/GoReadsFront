export const checkAuthStatus = () => {
    return fetch('http://localhost:5000/auth/status', { credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  };
  