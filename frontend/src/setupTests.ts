import '@testing-library/jest-dom';

(global as any).import = {
  meta: {
    env: {
      VITE_API_BASE_URL: 'api.example.com',
    },
  },
};