import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  resetToken?: string;

  @Column({ nullable: true })
  resetTokenExpiry?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => GardenProfileEntity, (garden) => garden.user)
  gardens: GardenProfileEntity[];
}

@Entity('garden_profiles')
export class GardenProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  zipCode: string;

  @Column()
  gardenSize: string; // 'small' | 'medium' | 'large'

  @Column('int')
  sunlightHours: number;

  @Column()
  experienceLevel: string; // 'beginner' | 'intermediate' | 'expert'

  @Column('simple-array')
  goals: string[];

  @Column('text', { nullable: true })
  plantingPlan?: string; // JSON string of PlantingPlan

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.gardens)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => JournalEntryEntity, (entry) => entry.garden)
  journalEntries: JournalEntryEntity[];
}

@Entity('journal_entries')
export class JournalEntryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gardenId: string;

  @Column('datetime')
  date: Date;

  @Column('text')
  notes: string;

  @Column({ nullable: true })
  photoUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => GardenProfileEntity, (garden) => garden.journalEntries)
  @JoinColumn({ name: 'gardenId' })
  garden: GardenProfileEntity;
}

@Entity('plant_diagnoses')
export class PlantDiagnosisEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column('text')
  diagnosis: string; // JSON string of diagnosis result

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}