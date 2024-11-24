import { Injectable } from '@nestjs/common';
import { CreateRescueRequestDto } from './dto/create-rescue-request.dto';
import { UpdateRescueRequestDto } from './dto/update-rescue-request.dto';

@Injectable()
export class RescueRequestsService {
  create(createRescueRequestDto: CreateRescueRequestDto) {
    return 'This action adds a new rescueRequest';
  }

  findAll() {
    return `This action returns all rescueRequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rescueRequest`;
  }

  update(id: number, updateRescueRequestDto: UpdateRescueRequestDto) {
    return `This action updates a #${id} rescueRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} rescueRequest`;
  }
}
