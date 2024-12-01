import bcrypt from "bcrypt";

const saveHashedPassword = async (password) => {
  try {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  } catch (error) {
    console.log(`error in hashing password`, error);
  }
};
const isPasswordCorrect = async (password, hashedPassword) => {
  try {
    const isMatched = await bcrypt.compare(password, hashedPassword);
    return isMatched;
  } catch (error) {
    console.log(`Password is nor matched==>`, error);
  }
};

export { saveHashedPassword, isPasswordCorrect };
