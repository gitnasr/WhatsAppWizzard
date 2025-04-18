import Database from ".";
import { User } from "../../generated/prisma";
import { PrismaClient } from "../../generated/prisma/client";
import { ICreateUser } from '../../types/User';

class UserRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = Database.GetClient();
  }

  public async getUserByPhone(phone: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        phone,
      },
    });
    return user;
  }


  public async createOrUpdateUser(userData: ICreateUser): Promise<User> {
    return await this.prisma.user.upsert({
      where: { phone: userData.phone },
      update: userData,
      create: userData
    });
  }

  private async updateUser(userId:string, user: Partial<User>): Promise<User> {
 
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: user,
    });
  }
  public async getUser(phone: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        phone,
      },
    });
    return user;
  }
}

export default UserRepository;
