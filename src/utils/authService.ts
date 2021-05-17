import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';

import { ILoginUser, IUser, Token } from '../types';

import User from '../models/user';
import { UserInputError } from 'apollo-server';


class AuthService {
  static async allUsers(): Promise<IUser[]> {
    return await User.find({});
  }

  static async findUser(args: { username: string }): Promise<IUser | null> {
    return await User.findOne({ username: args.username });
  }

  static async addUser(args: ILoginUser): Promise<IUser> {
    const saltRounds = 10;
    
    const password: string = await bcrypt.hash(args.password , saltRounds);

    const user: IUser = new User({
      username: args.username,
      password,
      likedRecipes: [],
      dislikedRecipes: []
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

  static async login(args: ILoginUser): Promise<Token> {
    const user = await AuthService.findUser(args);
    
    const passCorrect: boolean = user === null
      ? false
      : await bcrypt.compare(args.password, user.password);
    
    if(!passCorrect) {
      throw new UserInputError('Wrong username or password');
    }

    const token = jwt.sign(args.username, process.env.JWT_SECRET as Secret);
    
    return { token: token };
  }
}

export default AuthService;