// src/services/authService.js

const USER_KEY = "admin_user";

// Save user data (e.g. after login)
export const saveUserToLocalStorage = (userData) => {
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
};

// Get user from localStorage
export const getUserFromLocalStorage = () => {
  const stored = localStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

// Remove user from localStorage (e.g. on logout)
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem(USER_KEY);
};
