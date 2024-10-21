import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/rest/user/schemas/user.schema';
import { Model } from 'mongoose';
import { UtilService } from 'src/util/util.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private utilService: UtilService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }

    const passwordMatches = await this.utilService.comparePassword(
      password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new BadRequestException('Credentials do not match');
    }

    const payload = { sub: user._id };

    const token = this.jwtService.sign(payload);

    return { token };
  }
}
