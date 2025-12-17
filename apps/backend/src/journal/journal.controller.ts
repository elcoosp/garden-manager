import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { JournalEntryEntity, GardenProfileEntity } from '../database/entities';
import {
  CreateJournalEntryDto,
  UpdateJournalEntryDto,
  JournalEntryResponseDto,
  DeleteResponseDto,
} from '../garden/garden-journal.dto';

@ApiTags('Journal')
@ApiBearerAuth()
@Controller('journal')
@UseGuards(AuthGuard('jwt'))
export class JournalController {
  constructor(
    @InjectRepository(JournalEntryEntity)
    private readonly journalRepository: Repository<JournalEntryEntity>,
    @InjectRepository(GardenProfileEntity)
    private readonly gardenRepository: Repository<GardenProfileEntity>,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create journal entry',
    description: 'Create a new journal entry for a garden',
  })
  @ApiBody({ type: CreateJournalEntryDto })
  @ApiCreatedResponse({
    description: 'Journal entry created successfully',
    type: JournalEntryResponseDto,
  })
  @ApiForbiddenResponse({ description: 'Garden not found or access denied' })
  async createEntry(
    @Request() req,
    @Body() dto: CreateJournalEntryDto,
  ): Promise<JournalEntryResponseDto> {
    // Verify the garden belongs to the user
    const garden = await this.gardenRepository.findOne({
      where: { id: dto.gardenId, userId: req.user.id },
    });

    if (!garden) {
      throw new ForbiddenException('Garden not found or access denied');
    }

    const entry = this.journalRepository.create({
      gardenId: dto.gardenId,
      date: dto.date,
      notes: dto.notes,
      photoUrl: dto.photoUrl,
    });

    await this.journalRepository.save(entry);

    return entry;
  }

  @Get('garden/:gardenId')
  @ApiOperation({
    summary: 'Get journal entries by garden',
    description: 'Retrieve all journal entries for a specific garden',
  })
  @ApiParam({ name: 'gardenId', description: 'Garden ID' })
  @ApiOkResponse({
    description: 'List of journal entries',
    type: [JournalEntryResponseDto],
  })
  @ApiForbiddenResponse({ description: 'Garden not found or access denied' })
  async getEntriesByGarden(
    @Request() req,
    @Param('gardenId') gardenId: string,
  ): Promise<JournalEntryResponseDto[]> {
    // Verify the garden belongs to the user
    const garden = await this.gardenRepository.findOne({
      where: { id: gardenId, userId: req.user.id },
    });

    if (!garden) {
      throw new ForbiddenException('Garden not found or access denied');
    }

    const entries = await this.journalRepository.find({
      where: { gardenId },
      order: { date: 'DESC' },
    });

    return entries;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get journal entry by ID',
    description: 'Retrieve a specific journal entry',
  })
  @ApiParam({ name: 'id', description: 'Journal entry ID' })
  @ApiOkResponse({
    description: 'Journal entry details',
    type: JournalEntryResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Journal entry not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  async getEntry(
    @Request() req,
    @Param('id') id: string,
  ): Promise<JournalEntryResponseDto> {
    const entry = await this.journalRepository.findOne({
      where: { id },
      relations: ['garden'],
    });

    if (!entry) {
      throw new NotFoundException('Journal entry not found');
    }

    // Verify the entry belongs to a garden owned by the user
    const garden = await this.gardenRepository.findOne({
      where: { id: entry.gardenId, userId: req.user.id },
    });

    if (!garden) {
      throw new ForbiddenException('Access denied');
    }

    return entry;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update journal entry',
    description: 'Update an existing journal entry',
  })
  @ApiParam({ name: 'id', description: 'Journal entry ID' })
  @ApiBody({ type: UpdateJournalEntryDto })
  @ApiOkResponse({
    description: 'Journal entry updated successfully',
    type: JournalEntryResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Journal entry not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  async updateEntry(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateJournalEntryDto,
  ): Promise<JournalEntryResponseDto> {
    const entry = await this.journalRepository.findOne({
      where: { id },
    });

    if (!entry) {
      throw new NotFoundException('Journal entry not found');
    }

    // Verify the entry belongs to a garden owned by the user
    const garden = await this.gardenRepository.findOne({
      where: { id: entry.gardenId, userId: req.user.id },
    });

    if (!garden) {
      throw new ForbiddenException('Access denied');
    }

    // Update fields
    if (dto.date !== undefined) entry.date = dto.date;
    if (dto.notes !== undefined) entry.notes = dto.notes;
    if (dto.photoUrl !== undefined) entry.photoUrl = dto.photoUrl;

    await this.journalRepository.save(entry);

    return entry;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete journal entry',
    description: 'Delete a journal entry',
  })
  @ApiParam({ name: 'id', description: 'Journal entry ID' })
  @ApiOkResponse({
    description: 'Journal entry deleted successfully',
    type: DeleteResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Journal entry not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  async deleteEntry(
    @Request() req,
    @Param('id') id: string,
  ): Promise<DeleteResponseDto> {
    const entry = await this.journalRepository.findOne({
      where: { id },
    });

    if (!entry) {
      throw new NotFoundException('Journal entry not found');
    }

    // Verify the entry belongs to a garden owned by the user
    const garden = await this.gardenRepository.findOne({
      where: { id: entry.gardenId, userId: req.user.id },
    });

    if (!garden) {
      throw new ForbiddenException('Access denied');
    }

    await this.journalRepository.remove(entry);

    return { message: 'Journal entry deleted successfully' };
  }
}