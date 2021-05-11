/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import AuthService from "../utils/authService";
import jwt, { Secret } from 'jsonwebtoken';

type AuthorizedRequest = Request & { authorization: string };

export const context = async ({ req }: { req: AuthorizedRequest}) => {
  //@ts-ignore
  const auth: string | null = req ? req.headers.authorization : null;
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(
      auth.substring(7), process.env.JWT_SECRET as Secret 
    ) as string;
    const currentUser = await AuthService.findUser({ username: decodedToken });
    return { currentUser };
  }
  return null;
};