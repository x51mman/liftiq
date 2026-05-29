import { Controller, Post, Body, Get, Req, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterCompanyDto } from './dto/register-company.dto';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('refresh')
  refresh(
    @Req() req: ExpressRequest,
    @Body() body: { refresh_token: string }) {

    const ip =
      req.ip || (req.headers['x-forwarded-for'] as string) || 'unknown';

    const userAgent =
      req.headers['user-agent'] || 'unknown';

    return this.authService.refresh(body.refresh_token, ip, userAgent,);
  }

  @Throttle({ 
    default: {limit: 5, ttl: 6000,} // 5 próbálkozás / perc
    }) 
  @Post('login')
  login(@Req() req: ExpressRequest, @Body() body: { email: string; password: string }) 
  
  {
  const ip = req.ip || (req.headers['x-forwarded-for'] as string) || 'unknown';
  
  const userAgent = req.headers['user-agent'] || 'unknown';

  return this.authService.login(body.email, body.password, ip, userAgent);
  }

  
  @Throttle({
    default: {limit: 5, ttl: 6000} 
    })
  @Post('logout')
  logout(@Body() body: { refresh_token: string })
  {
    return this.authService.logout(
      body.refresh_token,
    );
  }  

  @Throttle({
     default: {limit: 5, ttl: 6000} 
    })
  @UseGuards(JwtAuthGuard)
  @Post('logout-all')
  logoutAll(
    @Req() req: ExpressRequest,
  ) {

  const user = (req as any).user;

  return this.authService.logoutAll(
    user.sub,
  );
  }

  @Throttle({
     default: {limit: 5, ttl: 6000} 
    })
  @Post('register-company')
  register(@Req() req: ExpressRequest, @Body() body: RegisterCompanyDto) 
  
  {const ip = req.ip || (req.headers['x-forwarded-for'] as string) || 'unknown';

  return this.authService.registerCompany({...body, ip});
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  changePassword(
    @Req() req: ExpressRequest,

    @Body()
    body: {
      currentPassword: string;
      newPassword: string;
    },
  ) {

    const user = (req as any).user;

    return this.authService.changePassword(
      user.sub,
      body.currentPassword,
      body.newPassword,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('sessions')
  getSessions(@Req() req: any) {

    return this.authService.getSessions(
      req.user.sub,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout-session/:id')
  logoutSession(
    @Req() req: any,
    @Param('id') id: string) {

    return this.authService.logoutSession(
      req.user.sub,
      Number(id),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('mfa/setup')
  setupMfa(@Req() req: any) {
    return this.authService.setupMfa(
      req.user.sub,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('mfa/verify')
  verifyMfa(@Req() req: any, @Body() body: {code: string;},) {
    return this.authService.verifyMfa(
      req.user.sub,
      body.code,
    );
  }

  @Post('mfa/login')
  verifyLoginMfa( 
    @Req() req: ExpressRequest,
    @Body() body: {
      temp_token: string;
      code: string;
    },
  ) {

  const ip = req.ip || (req.headers['x-forwarded-for'] as string) || 'unknown';

  const userAgent = req.headers['user-agent'] || 'unknown';

    return this.authService.verifyLoginMfa(
      body.temp_token,
      body.code,
      ip,
      userAgent,
    );
}

 
}