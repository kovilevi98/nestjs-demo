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
            synchronize: false,
            extra: {
                trustServerCertificate: true, },
            keepConnectionAlive: true,
    }
  }
}

export const OrmConfig = {
    type: 'mysql',
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            entities: ['dist/**/*.entity.js'],
            synchronize: true,
            extra: {
                trustServerCertificate: true,
              },
            keepConnectionAlive: true, 
            migrations: ['src/migrations/*{.ts,.js}'],
            cli: {
              migrationsDir: 'src/migrations'
            },
            factories: ['dist/**/seeding/factories/**/*.js'],
            
        };


export default OrmConfig;