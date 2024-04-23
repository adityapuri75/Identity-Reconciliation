import { IsInt, IsString, IsOptional, IsEnum, IsDate } from 'class-validator';

enum LinkPrecedence {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export class CreateContactDto {
  @IsInt()
  public id: number;

  @IsString()
  @IsOptional()
  public phoneNumber?: string;

  @IsString()
  @IsOptional()
  public email?: string;

  @IsInt()
  @IsOptional()
  public linkedId?: number;

  @IsEnum(LinkPrecedence)
  public linkPrecedence: LinkPrecedence;

  @IsDate()
  public createdAt: Date;

  @IsDate()
  public updatedAt: Date;

  @IsDate()
  @IsOptional()
  public deletedAt?: Date;
}
export class IdentifyContactDto {

  @IsString()
  @IsOptional()
  public phoneNumber?: string;

  @IsString()
  @IsOptional()
  public email?: string;

}

export class UpdateContactDto {
  @IsString()
  @IsOptional()
  public phoneNumber?: string;

  @IsString()
  @IsOptional()
  public email?: string;

  @IsInt()
  @IsOptional()
  public linkedId?: number;

  @IsEnum(LinkPrecedence)
  @IsOptional()
  public linkPrecedence?: LinkPrecedence;

  @IsDate()
  @IsOptional()
  public createdAt?: Date;

  @IsDate()
  @IsOptional()
  public updatedAt?: Date;

  @IsDate()
  @IsOptional()
  public deletedAt?: Date;
}