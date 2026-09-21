import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioModule } from './usuario/modules/usuario.module';
import { AuthModule } from './auth/module/auth.module';
import { ProductsModule } from './producto/products.module';
import { ServicioModule } from './module/servicio/servicio.module';
import { AppointmentsModule } from './module/appointments/appointments.module';
import { ProfesionalModule } from './module/profesional/profesional.module';
import { ExtraModule } from './module/extra/extra.module';
import { ProfessionalsService } from './service/professionals/professionals.service';
import { ProfessionalsController } from './controller/professionals/professionals.controller';


@Module({
  imports: [
    // Variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // PostgreSQL + TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Note: Removed ServicioModule from here, it shouldn't be here
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    // Módulos (This is where the magic happens)
    UsuarioModule,
    AuthModule,
    ProductsModule,
    ServicioModule,
    AppointmentsModule,
    ProfesionalModule,
    ExtraModule,
  ],
  providers: [ProfessionalsService],
  controllers: [ProfessionalsController],
})
export class AppModule {}