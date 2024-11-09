const serverProduction = import.meta.env.VITE_API_URL;
const serverDevelopment = `http://${import.meta.env.VITE_SERVER_URL}:${
  import.meta.env.VITE_SERVER_PORT
}`;
export const API = serverProduction || serverDevelopment;
