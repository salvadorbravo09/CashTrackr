import jwt from "jsonwebtoken";

export const generateJWT = (id: number) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  return token;
};
