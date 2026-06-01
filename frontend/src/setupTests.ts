// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Polyfill import.meta for Jest testing
if (!global.import) {
  (global as any).import = {};
}
if (!(global as any).import.meta) {
  (global as any).import.meta = {
    env: {
      VITE_API_BASE_URL: 'api.example.com',
    },
  };
}
