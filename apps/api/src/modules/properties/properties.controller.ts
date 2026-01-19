import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { CurrentUser } from '../auth/currentUser.decorator';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { PropertiesService } from './properties.service';

@UseGuards(JwtAuthGuard)
@Controller('properties')
export class PropertiesController {
  constructor(private readonly props: PropertiesService) {}

  @Get()
  list(@CurrentUser() user: { userId: string }) {
    return this.props.listForOwner(user.userId);
  }

  @Post()
  create(@CurrentUser() user: { userId: string }, @Body() dto: CreatePropertyDto) {
    return this.props.createForOwner(user.userId, dto);
  }
}

