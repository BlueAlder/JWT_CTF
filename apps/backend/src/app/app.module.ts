import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FlagModule } from './flag/flag.module';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';


@Module({
  imports: [UserModule,
            FlagModule,
            MorganModule.forRoot()],
  controllers: [AppController],
  providers: [AppService,
    { provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined')}],
})
export class AppModule {}
