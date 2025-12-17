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
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { JournalEntryEntity, GardenProfileEntity } from '../database/entities';

interface CreateJournalEntryDto {
  gardenId: string;
  date: Date;
  notes: string;
  photoUrl?: string;
}

interface UpdateJournalEntryDto {
  date?: Date;
  notes?: string;
  photoUrl?: string;
}

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
  async createEntry(
    @Request() req,
    @Body() dto: CreateJournalEntryDto,
  ) {
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
  async getEntriesByGarden(
    @Request() req,
    @Param('gardenId') gardenId: string,
  ) {
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
  async getEntry(@Request() req, @Param('id') id: string) {
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
  async updateEntry(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateJournalEntryDto,
  ) {
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
  async deleteEntry(@Request() req, @Param('id') id: string) {
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