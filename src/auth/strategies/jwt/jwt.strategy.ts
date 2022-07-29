import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      refresh_token: {
        rotation_type: 'non-rotating',
        expiration_type: 'expiring',
        token_lifetime: 2592000,
        infinite_token_lifetime:false,
        idle_token_lifetime: 604800,
        infinite_idle_token_lifetime: false,
      },
    });
  }

  async validate(payload: any) {
    const sessionExpired = new Date().getTime() < payload.exp;

    if (sessionExpired) return null;

    return { userId: payload.sub, username: payload.username };
  }
}
