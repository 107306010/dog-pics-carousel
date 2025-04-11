export const ENV = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
  TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "5000", 10),
};