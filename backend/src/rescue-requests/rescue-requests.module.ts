import { Module } from '@nestjs/common';
import { RescueRequestsService } from './rescue-requests.service';
import { RescueRequestsController } from './rescue-requests.controller';

@Module({
  controllers: [RescueRequestsController],
  providers: [RescueRequestsService],
})
export class RescueRequestsModule {}
