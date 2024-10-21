import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './rest/ticket/ticket.module';
import { ConfigurationModule } from './rest/configuration/configuration.module';
import { UserModule } from './rest/user/user.module';
import { AuthModule } from './rest/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilModule } from './util/util.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './common/strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    TicketModule,
    ConfigurationModule,
    UserModule,
    AuthModule,
    UtilModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
  exports: [JwtModule],
})
export class AppModule {}
