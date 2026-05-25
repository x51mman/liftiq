import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterCompanyDto {
  @IsNotEmpty()
  @IsString()
  company_name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  tax_number!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}