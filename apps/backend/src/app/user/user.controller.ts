import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserDto } from '@lovely-jwt-security/authentication';
import { AuthGuard } from '../shared/auth.guard';
import { UserDec } from './user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {

  }

  @Get()
  @UseGuards(new AuthGuard())
  showAllUsers(@UserDec() user) {
    console.log(user);
    return this.userService.showAll();
  }


  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDto) {
    return this.userService.login(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDto) {
    return this.userService.register(data);
  }

}
