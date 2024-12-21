import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { TourSchedule } from './entities/tour-schedule.entity';
import { CreateTourScheduleDto } from './dto/create-tour-schedule.dto';
import { UpdateTourScheduleDto } from './dto/update-tour-schedule.dto';
import { User } from 'src/users/entities/user.entity';
import { Tour } from 'src/tours/entities/tour.entity';

@Injectable()
export class TourSchedulesService {
  constructor(
    @InjectRepository(TourSchedule)
    private readonly tourScheduleRepository: Repository<TourSchedule>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
  ) {}

  // Создание расписания
  async create(
    userId: string,
    createTourScheduleDto: CreateTourScheduleDto,
  ): Promise<TourSchedule> {
    const { tourId, guideId, startDate, endDate, userIds } =
      createTourScheduleDto;

    // Проверка существования тура
    const tour = await this.tourRepository.findOne({ where: { id: tourId } });
    if (!tour) {
      throw new NotFoundException(`Tour with ID ${tourId} not found`);
    }

    // Проверка существования гида
    const guide = await this.userRepository.findOne({ where: { id: guideId } });
    if (!guide) {
      throw new NotFoundException(`Guide with ID ${guideId} not found`);
    }

    // Проверка, что пользователь — это гид
    if (userId !== guideId) {
      throw new BadRequestException(
        `You are not allowed to create a schedule for another guide`,
      );
    }

    // Проверка пользователей
    const users = await this.userRepository.findByIds(userIds);
    if (users.length !== userIds.length) {
      throw new BadRequestException(
        `One or more users in the list do not exist`,
      );
    }

    // Проверка пересечения времени для гида
    const overlappingSchedules = await this.tourScheduleRepository.find({
      where: {
        guide,
        startDate: LessThanOrEqual(endDate),
        endDate: MoreThanOrEqual(startDate),
      },
    });
    if (overlappingSchedules.length > 0) {
      throw new BadRequestException(
        `The guide already has a schedule overlapping with this time`,
      );
    }

    // Создание расписания
    const schedule = this.tourScheduleRepository.create({
      tour,
      guide,
      startDate,
      endDate,
      users,
    });
    return this.tourScheduleRepository.save(schedule);
  }

  // Получение всех расписаний для гида
  async findAll(userId: string): Promise<TourSchedule[]> {
    return this.tourScheduleRepository.find({
      where: { guide: { id: userId } },
      relations: ['tour', 'users'],
    });
  }

  // Обновление расписания
  async update(
    userId: string,
    id: number,
    updateTourScheduleDto: UpdateTourScheduleDto,
  ): Promise<TourSchedule> {
    const schedule = await this.tourScheduleRepository.findOne({
      where: { id },
      relations: ['guide'],
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }

    // Проверка, что пользователь является гидом для этого расписания
    if (schedule.guide.id !== userId) {
      throw new BadRequestException(
        `You are not allowed to update this schedule`,
      );
    }

    // Обновление данных
    const { tourId, guideId, startDate, endDate, userIds } =
      updateTourScheduleDto;

    if (tourId) {
      const tour = await this.tourRepository.findOne({ where: { id: tourId } });
      if (!tour) {
        throw new NotFoundException(`Tour with ID ${tourId} not found`);
      }
      schedule.tour = tour;
    }

    if (guideId) {
      const guide = await this.userRepository.findOne({
        where: { id: guideId },
      });
      if (!guide) {
        throw new NotFoundException(`Guide with ID ${guideId} not found`);
      }
      schedule.guide = guide;
    }

    if (startDate && endDate) {
      const overlappingSchedules = await this.tourScheduleRepository.find({
        where: {
          guide: schedule.guide,
          startDate: LessThanOrEqual(endDate),
          endDate: MoreThanOrEqual(startDate),
          id: Not(id),
        },
      });
      if (overlappingSchedules.length > 0) {
        throw new BadRequestException(
          `The guide already has a schedule overlapping with this time`,
        );
      }
      schedule.startDate = startDate;
      schedule.endDate = endDate;
    }

    if (userIds) {
      const users = await this.userRepository.findByIds(userIds);
      if (users.length !== userIds.length) {
        throw new BadRequestException(
          `One or more users in the list do not exist`,
        );
      }
      schedule.users = users;
    }

    return this.tourScheduleRepository.save(schedule);
  }

  // Удаление расписания
  async remove(userId: string, id: number): Promise<void> {
    const schedule = await this.tourScheduleRepository.findOne({
      where: { id },
      relations: ['guide'],
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }

    // Проверка, что пользователь является гидом для этого расписания
    if (schedule.guide.id !== userId) {
      throw new BadRequestException(
        `You are not allowed to delete this schedule`,
      );
    }

    await this.tourScheduleRepository.remove(schedule);
  }
}
