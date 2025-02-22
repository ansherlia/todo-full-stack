import { verify } from "jsonwebtoken";

const { hash, compare } = require("bcryptjs");

async function hashedPassword(password) {
  const hashed = await hash(password, 12);
  return hashed;
}

async function verifypassword(password, hashPassDB) {
  try {
    const result = await compare(password, hashPassDB);
    return result;
  } catch (error) {
    console.error(error);
  }
}

function verifyToken(token, secretKey) {
  try {
    const result = verify(token, secretKey);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export { hashedPassword, verifypassword, verifyToken };
