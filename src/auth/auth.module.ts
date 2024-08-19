import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule], // Export JwtModule if needed elsewhere
})
export class AuthModule {}
