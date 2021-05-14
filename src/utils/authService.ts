import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';

import { IUser, Token } from '../types';

import User from '../models/user';
import { UserInputError } from 'apollo-server';


class AuthService {
  static async allUsers(): Promise<IUser[]> {
    return await User.find({});
  }

  static async findUser(args: { username: string }): Promise<IUser | null> {
    return await User.findOne({ username: args.username });
  }

  static async addUser(args: Omit<IUser, 'id'>): Promise<IUser> {
    const saltRounds = 10;
    
    const password: string = await bcrypt.hash(args.password , saltRounds);

    const user: IUser = new User({
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
    const user = await User.findByIdAndRemove(args.id);
    if (user === null) return false;
    return true;
  }

  static async login(args: Omit<IUser, 'id'>): Promise<Token> {
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