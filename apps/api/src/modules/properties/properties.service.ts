import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto/createProperty.dto';

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  listForOwner(ownerId: string) {
    return this.prisma.property.findMany({
      where: { ownerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  createForOwner(ownerId: string, dto: CreatePropertyDto) {
    return this.prisma.property.create({
      data: {
        ownerId,
        label: dto.label,
        addressLine1: dto.addressLine1,
        addressLine2: dto.addressLine2,
        locality: dto.locality,
        city: dto.city,
        state: dto.state,
        pincode: dto.pincode,
        propertyType: dto.propertyType ?? 'apartment',
      },
    });
  }
}

