import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.userService.create(createUserDto);
    const response = {
      data,
      message: 'User created',
    };
    return response;
  }

  @Get()
  async findAll() {
    const data = await this.userService.findAll();
    const response = {
      data,
      message: 'Get all users',
    };
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.userService.findOne(id);
    const response = {
      data,
      message: 'Find one user',
    };
    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.userService.remove(id);
    const response = {
      data,
      message: 'Remove one user',
    };
    return response;
  }
}
