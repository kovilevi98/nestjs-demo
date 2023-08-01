import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable() export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    public constructor(private readonly configService: ConfigService) {}

    public createTypeOrmOptions():TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.configService.get('MYSQL_HOST'),
            port: Number(this.configService.get('MYSQL_PORT')),
            username: this.configService.get('MYSQL_USER'),
            password: this.configService.get('MYSQL_PASSWORD'),
            database: this.configService.get('MYSQL_DATABASE'),
            entities: ['dist/entities/**/*.entity{.ts,.js}'],
            synchronize: true,
            extra: {
                trustServerCertificate: true, },
            keepConnectionAlive: true,
      
    }
  }
}