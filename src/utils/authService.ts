import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';

import { AuthUser, IUser, Token } from '../types';

import MAuthUser from '../models/authUser';
import { UserInputError } from 'apollo-server';


class AuthService {
  static async allUsers(): Promise<IUser[]> {
    return await MAuthUser.find({});
  }

  static async findUser(args: { username: string }): Promise<IUser | null> {
    return await MAuthUser.findOne({ username: args.username });
  }

  static async addUser(args: Omit<AuthUser, 'id'>): Promise<IUser> {
    const saltRounds = 10;
    
    const password: string = await bcrypt.hash(args.password , saltRounds);

    const user: IUser = new MAuthUser({
      username: args.username,
      password
    });

    try {
      await user.save();
    } catch (e) {
      throw new UserInputError(e.message, {
        invalidArgs: args
      });
    }
    return user;
  }

  static async deleteUser(args: { id: string }): Promise<boolean> {
    const a = await MAuthUser.findByIdAndRemove(args.id);
    console.log(a);
    return true;
  }

  static async login(args: Omit<AuthUser, 'id'>): Promise<Token> {
    const user = await AuthService.findUser(args);
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const passCorrect: boolean = user === null
      ? false
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      : await bcrypt.compare(args.password, user.password);
    
    if(!passCorrect) {
      throw new UserInputError('wrong username or password');
    }

    // eslint-disable-next-line
    const token = jwt.sign(args.username, process.env.JWT_SECRET as Secret);
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { value: token };
  }
}

export default AuthService;