import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UtilService } from 'src/util/util.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private utilService: UtilService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const randomPassword = await this.utilService.generateRandomPassword(8);

    const salt = await this.utilService.generateRandomSalt(16);
    const passwordHash = await this.utilService.hashPassword(
      randomPassword,
      salt,
    );

    try {
      const user = await this.userModel.create({ email, passwordHash });
      const response = {
        email: user.email,
        password: randomPassword,
      };

      return response;
    } catch (error) {
      throw new BadRequestException('User already exists');
    }
  }

  async findAll() {
    return await this.userModel.find({}).select('-passwordHash');
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).select('-passwordHash');
  }

  async remove(id: string) {
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      const response = {
        email: user.email,
      };

      return response;
    } catch (error) {
      throw new BadRequestException('Failed to remove user');
    }
  }
}
