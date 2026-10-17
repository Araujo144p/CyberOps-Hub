import { Controller, Body, Post, Req, Get } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto/register-user.dto';
import { LoginDto } from './dto/login.dto/login.dto';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Get('me') // usada para recuperar a identidade do usuário usando a sessão autenticada.
    @UseGuards(JwtAuthGuard)
    async getMe(@Req() request: Request & { user: { userId: string; email: string } }) {
        return this.authService.getMe(request.user.userId);
    }
    
}
