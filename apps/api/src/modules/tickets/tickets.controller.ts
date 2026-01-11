import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { CurrentUser } from '../auth/currentUser.decorator';
import { CreateTicketDto } from './dto/createTicket.dto';
import { TicketsService } from './tickets.service';

@UseGuards(JwtAuthGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly tickets: TicketsService) {}

  @Get()
  list(@CurrentUser() user: { userId: string }) {
    return this.tickets.listForOwner(user.userId);
  }

  @Post()
  create(@CurrentUser() user: { userId: string }, @Body() dto: CreateTicketDto) {
    return this.tickets.createForOwner(user.userId, dto);
  }
}

