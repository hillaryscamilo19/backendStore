import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { AppointmentsEntity } from 'src/entity/appointments/entities/appointments.entity/appointments.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AppointmentsEntity)
    private readonly appointmentsRepo: Repository<AppointmentsEntity>,
  ) {}

  async getAvaliableSlots(
    professionalId: string,
    date: string,
    finalDurationMinutes: number,
  ): Promise<string[]> {
    //Definir horario de trebajo.
    const workStartHour = 9;
    const workEndHour = 18;

    const searchDate = new Date(date);
    const startOfDay = new Date(searchDate.setHours(workStartHour, 0, 0, 0));
    const endOfDay = new Date(searchDate.setHours(workEndHour, 0, 0, 0));

    // 2. Buscar citas existentes de este profesional en este día
    const existingAppointments = await this.appointmentsRepo.find({
      where: {
        profesional: {
          id: professionalId,
        },
        startTime: Between(startOfDay, endOfDay),
        status: 'CONFIRMED',
      },
      order: {
        startTime: 'ASC',
      },
    });

    // 3. Generar b0loques de tiempo (ej. cada 30 minutos) y verificar si caben
    const availableSlots: string[] = [];
    let currentSlot = new Date(startOfDay);

    while (currentSlot < endOfDay) {
      const slotEnd = new Date(
        currentSlot.getTime() + finalDurationMinutes * 60000,
      );

      // Si el servicio termina después del cierre, no ofrecer esta hora
      if (slotEnd > endOfDay) break;

      // Verificar si este bloque choca con alguna cita existente
      const isOverlapping = existingAppointments.some((appt) => {
        const apptStart = new Date(appt.startTime);
        const apptEnd = new Date(appt.endTime);
        // Lógica de colisión de tiempo
        return currentSlot < apptEnd && slotEnd > apptStart;
      });

      if (!isOverlapping) {
        // Formato HH:MM (ej. "14:30")
        availableSlots.push(
          currentSlot.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          }),
        );
      }

      // Avanzar el iterador 30 minutos
      currentSlot = new Date(currentSlot.getTime() + 30 * 60000);
    }

    return availableSlots;
  }
}
