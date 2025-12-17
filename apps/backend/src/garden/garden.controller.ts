import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { OllamaService } from '../ai/ollama.service';
import { GardenProfile } from '@garden-manager/shared';
import { AuthGuard } from '@nestjs/passport';

@Controller('garden')
@UseGuards(AuthGuard('jwt'))
export class GardenController {
  constructor(private readonly ollamaService: OllamaService) {}

  @Post('plan')
  async generatePlan(
    @Request() req,
    @Body() profile: Omit<GardenProfile, 'id' | 'userId'>,
  ) {
    // Associate garden with user
    const gardenProfile: Omit<GardenProfile, 'id'> = {
      ...profile,
      userId: req.user.id,
    };

    return this.ollamaService.generatePlantingPlan(gardenProfile);
  }

  @Post('diagnose')
  async diagnose(@Body() data: { description: string; image?: string }) {
    return this.ollamaService.diagnosePlant(data.description, data.image);
  }
}
