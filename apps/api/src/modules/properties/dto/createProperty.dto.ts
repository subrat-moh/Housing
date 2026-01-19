import { IsIn, IsOptional, IsString, Length } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  label!: string;

  @IsString()
  addressLine1!: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsOptional()
  @IsString()
  locality?: string;

  @IsString()
  city!: string;

  @IsString()
  state!: string;

  @IsString()
  @Length(6, 6)
  pincode!: string;

  @IsOptional()
  @IsIn(['apartment', 'villa', 'independent_house', 'plot'])
  propertyType?: string;
}

