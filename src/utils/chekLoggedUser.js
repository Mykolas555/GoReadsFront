export const checkAuthStatus = async () => {
    return fetch(`${LOGIN_URL}auth/status`, { credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  };
  