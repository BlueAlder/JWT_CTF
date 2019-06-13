import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { AdminAuthGuard } from '../shared/admin.guard';
import { FlagService } from './flag.service';

@Controller('flag')
export class FlagController {

  constructor(private flagService: FlagService) {}

  @Get()
  @UseGuards(new AdminAuthGuard())
  getFlag() {
    return this.flagService.getFlag();
  }
}
