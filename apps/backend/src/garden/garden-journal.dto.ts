import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { 
  IsString, 
  IsEnum, 
  IsNumber, 
  IsArray, 
  IsOptional, 
  IsDateString,
  IsUUID,
  Min,
  Max,
} from 'class-validator';

// ========== Garden DTOs ==========

export class CreateGardenPlanDto {
  @ApiProperty({ 
    description: 'ZIP code for location-based recommendations',
    example: '90210' 
  })
  @IsString()
  zipCode: string;

  @ApiProperty({ 
    description: 'Size of the garden',
    enum: ['small', 'medium', 'large'],
    example: 'medium'
  })
  @IsEnum(['small', 'medium', 'large'])
  gardenSize: 'small' | 'medium' | 'large';

  @ApiProperty({ 
    description: 'Average daily sunlight hours',
    example: 6,
    minimum: 0,
    maximum: 24
  })
  @IsNumber()
  @Min(0)
  @Max(24)
  sunlightHours: number;

  @ApiProperty({ 
    description: 'Gardener experience level',
    enum: ['beginner', 'intermediate', 'expert'],
    example: 'beginner'
  })
  @IsEnum(['beginner', 'intermediate', 'expert'])
  experienceLevel: 'beginner' | 'intermediate' | 'expert';

  @ApiProperty({ 
    description: 'Garden goals and preferences',
    example: ['grow vegetables', 'attract pollinators'],
    type: [String]
  })
  @IsArray()
  @IsString({ each: true })
  goals: string[];
}

export class GardenPlanResponseDto {
  @ApiProperty({ 
    description: 'Unique garden profile ID',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
  })
  gardenId: string;

  @ApiProperty({ 
    description: 'Generated planting plan with recommendations'
  })
  plantingPlan: any; // PlantingPlan type from shared
}

export class GardenProfileResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string;

  @ApiProperty({ example: 'u9i8o7p6-q5w4-3e2r-1t0y-9u8i7o6p5q4w' })
  userId: string;

  @ApiProperty({ example: '90210' })
  zipCode: string;

  @ApiProperty({ example: 'medium' })
  gardenSize: string;

  @ApiProperty({ example: 6 })
  sunlightHours: number;

  @ApiProperty({ example: 'beginner' })
  experienceLevel: string;

  @ApiProperty({ example: ['grow vegetables', 'attract pollinators'] })
  goals: string[];

  @ApiPropertyOptional({ description: 'Full planting plan object' })
  plantingPlan: any | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class DiagnosePlantDto {
  @ApiProperty({ 
    description: 'Description of plant issue or question',
    example: 'My tomato plant leaves are turning yellow'
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({ 
    description: 'Base64 encoded image or URL',
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...'
  })
  @IsOptional()
  @IsString()
  image?: string;
}

export class DiagnosisResponseDto {
  @ApiProperty({ 
    description: 'Unique diagnosis ID',
    example: 'd1a2g3n4-o5s6-7i8s-9abc-def123456789'
  })
  diagnosisId: string;

  @ApiProperty({ 
    description: 'AI-generated diagnosis and recommendations'
  })
  diagnosis: any;
}

export class DiagnosisListItemDto {
  @ApiProperty({ example: 'd1a2g3n4-o5s6-7i8s-9abc-def123456789' })
  id: string;

  @ApiProperty({ example: 'My tomato plant leaves are turning yellow' })
  description: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  imageUrl?: string;

  @ApiProperty({ description: 'Diagnosis result object' })
  diagnosis: any;

  @ApiProperty()
  createdAt: Date;
}

// ========== Journal DTOs ==========

export class CreateJournalEntryDto {
  @ApiProperty({ 
    description: 'Garden profile ID',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
  })
  @IsUUID()
  gardenId: string;

  @ApiProperty({ 
    description: 'Entry date',
    example: '2024-03-15T10:30:00Z'
  })
  @IsDateString()
  date: Date;

  @ApiProperty({ 
    description: 'Journal entry notes',
    example: 'Planted tomatoes in the north bed. Watered all plants.'
  })
  @IsString()
  notes: string;

  @ApiPropertyOptional({ 
    description: 'Photo URL or base64 encoded image',
    example: 'https://example.com/garden-photo.jpg'
  })
  @IsOptional()
  @IsString()
  photoUrl?: string;
}

export class UpdateJournalEntryDto {
  @ApiPropertyOptional({ 
    description: 'Updated entry date',
    example: '2024-03-15T10:30:00Z'
  })
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiPropertyOptional({ 
    description: 'Updated notes',
    example: 'Planted tomatoes and peppers. Watered all plants thoroughly.'
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ 
    description: 'Updated photo URL',
    example: 'https://example.com/updated-photo.jpg'
  })
  @IsOptional()
  @IsString()
  photoUrl?: string;
}

export class JournalEntryResponseDto {
  @ApiProperty({ example: 'j1o2u3r4-n5a6-7l8e-9ntry-abc123456789' })
  id: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  gardenId: string;

  @ApiProperty({ example: '2024-03-15T10:30:00Z' })
  date: Date;

  @ApiProperty({ example: 'Planted tomatoes in the north bed. Watered all plants.' })
  notes: string;

  @ApiPropertyOptional({ example: 'https://example.com/garden-photo.jpg' })
  photoUrl?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class DeleteResponseDto {
  @ApiProperty({ 
    description: 'Success message',
    example: 'Journal entry deleted successfully'
  })
  message: string;
}