export const generateToken = () => {
  return Math.floor(Math.random() * 900000).toString();
};
