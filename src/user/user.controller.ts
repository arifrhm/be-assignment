import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() userData: { email: string; username: string; password: string },
  ) {
    return this.userService.register(userData);
  }

  @Post('login')
  async login(@Body() userData: { email: string; password: string }) {
    const user = await this.userService.validateUser(
      userData.email,
      userData.password,
    );
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.userService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.userService.findUserById(req.user.id);
  }
}
