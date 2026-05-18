export const googleAuth = () =>
  (window.location.href = import.meta.env.VITE_BACKEND_URL + '/api/auth/google');
