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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
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

    UsuarioModule,
    AuthModule,
    ProductsModule,
    ServicioModule,
    AppointmentsModule,
    ProfesionalModule,
    ExtraModule,
  ],
})
export class AppModule {}