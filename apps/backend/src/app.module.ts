import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { GardenController } from './garden/garden.controller';
import { JournalController } from './journal/journal.controller';
import { OllamaService } from './ai/ollama.service';
import { 
  UserEntity, 
  GardenProfileEntity, 
  JournalEntryEntity,
  PlantDiagnosisEntity,
} from './database/entities';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // Database configuration
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.DATABASE_URL || 'garden-manager.db',
      entities: [
        UserEntity,
        GardenProfileEntity,
        JournalEntryEntity,
        PlantDiagnosisEntity,
      ],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV === 'development',
    }),
    
    // Register entities for dependency injection
    TypeOrmModule.forFeature([
      UserEntity,
      GardenProfileEntity,
      JournalEntryEntity,
      PlantDiagnosisEntity,
    ]),
    
    // Authentication modules
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [
    AppController, 
    AuthController,
    GardenController,
    JournalController,
  ],
  providers: [
    AppService, 
    AuthService, 
    JwtStrategy,
    OllamaService,
  ],
})
export class AppModule {}