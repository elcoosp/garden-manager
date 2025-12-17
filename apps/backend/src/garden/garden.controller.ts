import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  UseGuards, 
  Request,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiBody, 
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OllamaService } from '../ai/ollama.service';
import { AuthGuard } from '@nestjs/passport';
import { 
  GardenProfileEntity, 
  PlantDiagnosisEntity 
} from '../database/entities';
import {
  CreateGardenPlanDto,
  GardenPlanResponseDto,
  GardenProfileResponseDto,
  DiagnosePlantDto,
  DiagnosisResponseDto,
  DiagnosisListItemDto,
} from './garden-journal.dto';

@ApiTags('Garden')
@ApiBearerAuth()
@Controller('garden')
@UseGuards(AuthGuard('jwt'))
export class GardenController {
  constructor(
    private readonly ollamaService: OllamaService,
    @InjectRepository(GardenProfileEntity)
    private readonly gardenRepository: Repository<GardenProfileEntity>,
    @InjectRepository(PlantDiagnosisEntity)
    private readonly diagnosisRepository: Repository<PlantDiagnosisEntity>,
  ) {}

  @Post('plan')
  @ApiOperation({ 
    summary: 'Generate planting plan',
    description: 'Generate an AI-powered planting plan based on garden profile and save it to the database'
  })
  @ApiBody({ type: CreateGardenPlanDto })
  @ApiCreatedResponse({ 
    description: 'Planting plan generated and saved successfully',
    type: GardenPlanResponseDto,
  })
  async generatePlan(
    @Request() req,
    @Body() profile: CreateGardenPlanDto,
  ): Promise<GardenPlanResponseDto> {
    // Generate the planting plan using AI
    const plantingPlan = await this.ollamaService.generatePlantingPlan({
      ...profile,
      userId: req.user.id,
    });

    // Create and save garden profile with the generated plan
    const gardenProfile = this.gardenRepository.create({
      userId: req.user.id,
      zipCode: profile.zipCode,
      gardenSize: profile.gardenSize,
      sunlightHours: profile.sunlightHours,
      experienceLevel: profile.experienceLevel,
      goals: profile.goals,
      plantingPlan: JSON.stringify(plantingPlan),
    });

    await this.gardenRepository.save(gardenProfile);

    return {
      gardenId: gardenProfile.id,
      plantingPlan,
    };
  }

  @Get('profiles')
  @ApiOperation({ 
    summary: 'Get all garden profiles',
    description: 'Retrieve all garden profiles for the authenticated user'
  })
  @ApiOkResponse({ 
    description: 'List of garden profiles',
    type: [GardenProfileResponseDto],
  })
  async getProfiles(@Request() req): Promise<GardenProfileResponseDto[]> {
    const profiles = await this.gardenRepository.find({
      where: { userId: req.user.id },
      order: { createdAt: 'DESC' },
    });

    return profiles.map(profile => ({
      id: profile.id,
      userId: profile.userId,
      zipCode: profile.zipCode,
      gardenSize: profile.gardenSize,
      sunlightHours: profile.sunlightHours,
      experienceLevel: profile.experienceLevel,
      goals: profile.goals,
      plantingPlan: profile.plantingPlan ? JSON.parse(profile.plantingPlan) : null,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    }));
  }

  @Get('profiles/:id')
  @ApiOperation({ 
    summary: 'Get garden profile by ID',
    description: 'Retrieve a specific garden profile by its ID'
  })
  @ApiParam({ name: 'id', description: 'Garden profile ID' })
  @ApiOkResponse({ 
    description: 'Garden profile details',
    type: GardenProfileResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Garden profile not found' })
  async getProfile(
    @Request() req, 
    @Param('id') id: string
  ): Promise<GardenProfileResponseDto> {
    const profile = await this.gardenRepository.findOne({
      where: { id, userId: req.user.id },
    });

    if (!profile) {
      throw new NotFoundException('Garden profile not found');
    }

    return {
      id: profile.id,
      userId: profile.userId,
      zipCode: profile.zipCode,
      gardenSize: profile.gardenSize,
      sunlightHours: profile.sunlightHours,
      experienceLevel: profile.experienceLevel,
      goals: profile.goals,
      plantingPlan: profile.plantingPlan ? JSON.parse(profile.plantingPlan) : null,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }

  @Post('diagnose')
  @ApiOperation({ 
    summary: 'Diagnose plant issues',
    description: 'Use AI to diagnose plant problems based on description and optional image'
  })
  @ApiBody({ type: DiagnosePlantDto })
  @ApiCreatedResponse({ 
    description: 'Plant diagnosis completed and saved',
    type: DiagnosisResponseDto,
  })
  async diagnose(
    @Request() req,
    @Body() data: DiagnosePlantDto,
  ): Promise<DiagnosisResponseDto> {
    // Generate diagnosis using AI
    const diagnosis = await this.ollamaService.diagnosePlant(
      data.description,
      data.image,
    );

    // Save diagnosis to database
    const diagnosisEntity = this.diagnosisRepository.create({
      userId: req.user.id,
      description: data.description,
      imageUrl: data.image,
      diagnosis: JSON.stringify(diagnosis),
    });

    await this.diagnosisRepository.save(diagnosisEntity);

    return {
      diagnosisId: diagnosisEntity.id,
      diagnosis,
    };
  }

  @Get('diagnoses')
  @ApiOperation({ 
    summary: 'Get all plant diagnoses',
    description: 'Retrieve all plant diagnoses for the authenticated user'
  })
  @ApiOkResponse({ 
    description: 'List of plant diagnoses',
    type: [DiagnosisListItemDto],
  })
  async getDiagnoses(@Request() req): Promise<DiagnosisListItemDto[]> {
    const diagnoses = await this.diagnosisRepository.find({
      where: { userId: req.user.id },
      order: { createdAt: 'DESC' },
    });

    return diagnoses.map(d => ({
      id: d.id,
      description: d.description,
      imageUrl: d.imageUrl,
      diagnosis: JSON.parse(d.diagnosis),
      createdAt: d.createdAt,
    }));
  }
}