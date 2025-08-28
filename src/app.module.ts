import { UserModule } from '@/infrastructure/modules/user.module';
import configuration from '@/shared/config/configuration';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host', 'localhost'),
        port: configService.get<number>('database.port', 5432),
        username: configService.get<string>('database.username', 'postgres'),
        password: configService.get<string>('database.password', 'password'),
        database: configService.get<string>('database.name', 'testdb'),
        entities: [process.cwd() + 'src/infrastructure/database/entities/*.ts'],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    UserModule,
  ],
})
export class AppModule {}
