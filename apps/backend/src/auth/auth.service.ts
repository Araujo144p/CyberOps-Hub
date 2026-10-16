import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema/user.schema';
import { RegisterDto } from './dto/register.dto/register-user.dto';
import { LoginDto } from './dto/login.dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

    
  async register(dto: RegisterDto) {
    const name = dto.name.trim();
    const email = dto.email.trim().toLowerCase();
    const password = dto.password.trim();
    
    if(Buffer.byteLength(password, 'utf-8') > 72){
      throw new BadRequestException('Password must be less than or equal to 72 bytes');
    }
    // O motivo da utilização do Buffer.byteLength em um if é para verificar o tamanho da senha em bytes, em vez de caracteres. Isso é importante porque algumas senhas podem conter caracteres que ocupam mais de um byte, como caracteres especiais ou emojis. O bcrypt, que é usado para hash de senhas, tem uma limitação de tamanho de entrada de 72 bytes. Portanto, ao usar Buffer.byteLength, garantimos que a senha não exceda esse limite, evitando erros durante o processo de hash. 

    const passwordHash = await bcrypt.hash(password, 12);

    try {
      const user = await this.userModel.create({
        name,
        email,
        passwordHash,
      })

      return { 
        id: user._id, 
        name: user.name, 
        email: user.email
      };
    }
    catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 11000
      ) {
        throw new ConflictException(
          'Unable to register this email.',
        );
      }
      throw error;
    }
    //esse catch e throw identifica e trata especificamente a duplicidade de e-mail, sem esconder outros erros inesperados.
  }


  async login(dto: LoginDto) {
    const email = dto.email.trim().toLowerCase();
    const password = dto.password.trim();

    if(Buffer.byteLength(password, 'utf-8') > 72){
      throw new BadRequestException('Password must be less than or equal to 72 bytes');
    }

    const user = await this.userModel.findOne({ email}).select('+passwordHash').exec();

    if(!user || !(await bcrypt.compare(password, user.passwordHash))){
      throw new UnauthorizedException('Invalid credentials');
    }

    const acessToken = await this.jwtService.signAsync({ sub: user._id.toString(), email: user.email });

    return { 
      acess_token: acessToken,
      token_type: 'Bearer',
      expires_in: 3600,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    };
  }
}
