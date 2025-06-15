export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Type assertion to ensure TypeScript knows this is a string
if (!BACKEND_URL) {
  throw new Error(
    "BACKEND_URL is not defined. Please set VITE_BACKEND_URL in your environment variables."
  );
}
