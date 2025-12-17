import { PlantRecommendation, MonthlyTask, PlantingPlan, GardenProfile } from '@garden-manager/shared';

export const samplePlants: PlantRecommendation[] = [
  {
    name: 'Tomato',
    type: 'vegetable',
    plantingSeason: ['Spring', 'Summer'],
    companionPlants: ['Basil', 'Marigold', 'Carrots'],
    careInstructions: {
      water: 'Regular, deep watering',
      sun: 'Full sun (6+ hours)',
      spacing: '24-36 inches apart',
    },
  },
  {
    name: 'Basil',
    type: 'herb',
    plantingSeason: ['Spring', 'Summer'],
    companionPlants: ['Tomato', 'Pepper', 'Oregano'],
    careInstructions: {
      water: 'Keep soil moist',
      sun: 'Full sun to partial shade',
      spacing: '12-18 inches apart',
    },
  },
  {
    name: 'Lavender',
    type: 'flower',
    plantingSeason: ['Spring', 'Fall'],
    companionPlants: ['Rose', 'Sage', 'Thyme'],
    careInstructions: {
      water: 'Light, infrequent watering',
      sun: 'Full sun',
      spacing: '24-36 inches apart',
    },
  },
];

export const sampleMonthlyTasks: MonthlyTask[] = [
  {
    month: 'March',
    tasks: [
      'Start seeds indoors',
      'Prepare garden beds',
      'Test soil pH',
      'Order seeds and supplies',
    ],
  },
  {
    month: 'April',
    tasks: [
      'Direct sow cool weather crops',
      'Transplant seedlings',
      'Apply compost',
      'Install trellises',
    ],
  },
  {
    month: 'May',
    tasks: [
      'Plant warm weather crops',
      'Mulch garden beds',
      'Set up irrigation',
      'Monitor for pests',
    ],
  },
];

export const samplePlantingPlan: PlantingPlan = {
  season: 'Spring',
  recommendations: samplePlants,
  plantingCalendar: sampleMonthlyTasks,
};

export const sampleGardenProfile: GardenProfile = {
  id: '1',
  userId: 'user123',
  zipCode: '90210',
  gardenSize: 'medium',
  sunlightHours: 7,
  experienceLevel: 'intermediate',
  goals: ['Vegetable Production', 'Herb Garden', 'Pollinator Friendly'],
};

export const allSeasons = ['Spring', 'Summer', 'Fall', 'Winter'];