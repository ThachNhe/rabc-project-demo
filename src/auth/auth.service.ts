import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@/db/entities';
import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: EntityRepository<User>,
    private jwtService: JwtService,
  ) {}

  public async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepo.findOne({
      email: username,
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      return wrap(user).toObject();
    }

    return null;
  }

  async getAuthUser(user: User) {
    const accessToken = this.getAccessToken(user.id, user.email, '1d');

    const refreshToken = this.getAccessToken(user.id, user.email, '30d');

    return { ...user, accessToken, refreshToken };
  }

  getAccessToken(
    userId: string,
    email: string,
    expiresIn: string | number = '30m',
  ) {
    return this.jwtService.sign(
      {
        sub: userId,
        email,
      },
      { expiresIn },
    );
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}


