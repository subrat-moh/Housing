import { IsIn, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  propertyId!: string;

  @IsString()
  @IsIn(['plumbing', 'electrical', 'cleaning', 'pest', 'security', 'general', 'emergency'])
  category!: string;

  @IsString()
  @IsIn(['low', 'normal', 'high', 'emergency'])
  priority!: string;

  @IsString()
  description!: string;
}

