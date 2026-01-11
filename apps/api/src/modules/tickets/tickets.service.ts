import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/createTicket.dto';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  listForOwner(ownerId: string) {
    return this.prisma.ticket.findMany({
      where: { property: { ownerId } },
      include: { property: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createForOwner(ownerId: string, dto: CreateTicketDto) {
    const property = await this.prisma.property.findUnique({ where: { id: dto.propertyId } });
    if (!property || property.ownerId !== ownerId) throw new ForbiddenException('Invalid property');

    return this.prisma.ticket.create({
      data: {
        propertyId: property.id,
        createdById: ownerId,
        category: dto.category,
        priority: dto.priority,
        description: dto.description,
      },
    });
  }
}

