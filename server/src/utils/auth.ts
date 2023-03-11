import bcrypt from "bcrypt";

const hash = (p: string): string => bcrypt.hashSync(p, 10);

const verifyBcryptPassword = (password: string, hashes: any): boolean => bcrypt.compareSync(password, hashes);

export { hash, verifyBcryptPassword };
