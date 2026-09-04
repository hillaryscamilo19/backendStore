import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioModule } from './usuario/modules/usuario.module';
import { AuthModule } from './auth/module/auth.module';
import { ProductsModule } from './producto/products.module';
import { ServiceService } from './services/service/service.service';
import { AppointmentsService } from './services/appointments/appointments.service';
import { ServicioModule } from './module/servicio/servicio.module';
import { ServicioController } from './controller/servicio/servicio.controller';
import { ServicioService } from './services/servicio/servicio.service';

@Module({
  imports: [

    // Variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // PostgreSQL + TypeORM
    TypeOrmModule.forRootAsync({

      imports: [ConfigModule, ServicioModule],

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

    // Módulos
    UsuarioModule,

    AuthModule,

    ProductsModule,

    ServicioModule,

  ],
  providers: [ServiceService, AppointmentsService, ServicioService],
  controllers: [ServicioController],
})
export class AppModule {}