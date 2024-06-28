export const useTokenAsBearer = (token: string) => {
  return `Bearer ${token}`;
};
