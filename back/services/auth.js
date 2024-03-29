import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET = "Esto es un secreto";

export const signService = (user) => {
  delete user.passwd;
  const payload = {
    id: user.id,
  };
  const token = jwt.sign(JSON.stringify(payload), SECRET);
  return { user, token };
};

export const verifyService = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

export const hashService = (passwd) => {
  const salt = 10;
  return bcrypt.hashSync(passwd, salt);
};

export const compareService = (passwd = "", hash = "") => {
  console.log(passwd, hash);
  return bcrypt.compareSync(passwd, hash);
};
